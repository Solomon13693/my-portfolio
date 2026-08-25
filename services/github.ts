import { cache } from 'react'

export interface GitHubContribution {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export interface GitHubContributionsResponse {
  total: Record<string, number>
  contributions: GitHubContribution[]
}

export interface GitHubDateRange {
  from: string
  to: string
}

interface GitHubGraphQLResponse {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number
          weeks: {
            contributionDays: {
              date: string
              contributionCount: number
            }[]
          }[]
        }
      }
    } | null
  }
  errors?: { message: string }[]
}

const CONTRIBUTIONS_QUERY = `
  query ($login: String!, $from: DateTime, $to: DateTime) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`

/** Buckets a raw count into GitHub's 0–4 shading levels, relative to this user's own busiest day. */
function levelFor(count: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0 || max <= 0) return 0
  const ratio = count / max
  if (ratio > 0.75) return 4
  if (ratio > 0.5) return 3
  if (ratio > 0.25) return 2
  return 1
}

/**
 * Real, live contribution data from GitHub's official GraphQL API. Requires a
 * server-only `GITHUB_TOKEN` (read:user scope, never NEXT_PUBLIC_ — that would
 * ship it to the browser). Never fall back to fabricated numbers; if the
 * fetch/token is missing, the caller should render nothing rather than fake
 * activity.
 *
 * `range` omitted = GitHub's own default (rolling last 12 months). Pass an
 * explicit `{ from, to }` ISO range to fetch a specific calendar year.
 *
 * Wrapped in React's `cache()` so multiple calls within one request (Next dev
 * mode renders Server Components twice to check for non-determinism) reuse a
 * single fetch instead of hitting the API twice.
 */
export const getGitHubContributions = cache(
  async (username: string, range?: GitHubDateRange): Promise<GitHubContributionsResponse | null> => {
    const token = process.env.GITHUB_TOKEN
    if (!token) return null

    let res: Response
    try {
      res = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: CONTRIBUTIONS_QUERY,
          variables: { login: username, from: range?.from ?? null, to: range?.to ?? null },
        }),
        signal: AbortSignal.timeout(4000),
        next: { revalidate: 60 * 60 * 12 },
      })
    } catch {
      return null
    }

    if (!res.ok) return null

    const json: GitHubGraphQLResponse = await res.json()
    const calendar = json.data?.user?.contributionsCollection?.contributionCalendar
    if (!calendar) return null

    const days = calendar.weeks.flatMap((week) => week.contributionDays)
    const max = Math.max(0, ...days.map((d) => d.contributionCount))

    return {
      total: { lastYear: calendar.totalContributions },
      contributions: days.map((d) => ({
        date: d.date,
        count: d.contributionCount,
        level: levelFor(d.contributionCount, max),
      })),
    }
  }
)
