import { NextRequest, NextResponse } from 'next/server'
import { getGitHubContributions } from '@/services'
import { PROFILE } from '@/data'

export async function GET(request: NextRequest) {

  const year = request.nextUrl.searchParams.get('year') 
  ?? String(new Date().getFullYear())

  const range = { from: `${year}-01-01T00:00:00Z`, to: `${year}-12-31T23:59:59Z` }

  const data = await getGitHubContributions(PROFILE.githubUsername, range)

  if (!data) {
    return NextResponse.json({ error: 'Unable to load contribution data' }, { status: 502 })
  }

  return NextResponse.json(data)
}
