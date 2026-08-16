import { NextRequest, NextResponse } from 'next/server'

function normalizeBackendBase(value: string) {
  const trimmed = value.trim()

  try {
    const url = new URL(trimmed)
    const isLocalHost =
      url.hostname === 'localhost' ||
      url.hostname === '127.0.0.1' ||
      url.hostname === '0.0.0.0'

    if (isLocalHost && url.protocol === 'https:') {
      url.protocol = 'http:'
      return url.toString()
    }
  } catch {
    return trimmed
  }

  return trimmed
}

function buildHeaders() {
  const headers = new Headers()
  headers.set('Content-Type', 'application/json')

  const adminKey = process.env.ASSISTANT_ADMIN_API_KEY?.trim()
  if (adminKey) {
    headers.set('X-Admin-Key', adminKey)
  }

  return headers
}

export async function GET(req: NextRequest) {
  const backendBase = normalizeBackendBase(
    process.env.BACKEND_URL || 'http://13.60.168.165:8000'
  )
  const target = new URL('/api/first-timers', backendBase)
  target.search = req.nextUrl.search

  try {
    const upstream = await fetch(target, {
      method: 'GET',
      headers: buildHeaders(),
      cache: 'no-store',
    })

    const body = await upstream.arrayBuffer()
    return new NextResponse(body, {
      status: upstream.status,
      headers: { 'Content-Type': upstream.headers.get('Content-Type') || 'application/json' },
    })
  } catch (error) {
    return NextResponse.json(
      { detail: error instanceof Error ? error.message : 'Failed to reach backend service' },
      { status: 502 }
    )
  }
}
