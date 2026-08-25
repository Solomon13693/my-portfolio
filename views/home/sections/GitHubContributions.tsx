import { getGitHubContributions } from '@/services'
import { PROFILE } from '@/data'
import { GitHubYearPicker } from '../components'

export async function GitHubContributions() {
  const year = new Date().getFullYear()
  const data = await getGitHubContributions(PROFILE.githubUsername, {
    from: `${year}-01-01T00:00:00Z`,
    to: `${year}-12-31T23:59:59Z`,
  })


  if (!data || !data.contributions?.length) return null

  return (
    <div className="border-b border-line">
      <div className="container py-6 sm:py-10">
        <GitHubYearPicker initialData={data} />
      </div>
    </div>
  )
}

export default GitHubContributions
