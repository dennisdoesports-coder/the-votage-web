import { NextRequest, NextResponse } from 'next/server'

const HOP_BY_HOP = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
  'host',
  'content-length',
])

const RESPONSE_HEADER_BLOCKLIST = new Set([
  ...HOP_BY_HOP,
  'content-encoding',
])

function filterRequestHeaders(headers: Headers) {
  const out = new Headers()
  for (const [key, value] of headers.entries()) {
    if (!HOP_BY_HOP.has(key.toLowerCase())) {
      out.set(key, value)
    }
  }
  return out
}

function filterResponseHeaders(headers: Headers) {
  const out = new Headers()
  for (const [key, value] of headers.entries()) {
    if (!RESPONSE_HEADER_BLOCKLIST.has(key.toLowerCase())) {
      out.set(key, value)
    }
  }
  return out
}

interface ProxyMethods {
  GET: (req: NextRequest) => Promise<NextResponse>
  POST: (req: NextRequest) => Promise<NextResponse>
  PUT: (req: NextRequest) => Promise<NextResponse>
  PATCH: (req: NextRequest) => Promise<NextResponse>
  DELETE: (req: NextRequest) => Promise<NextResponse>
  OPTIONS: () => NextResponse
}

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

export function createProxyRoute(targetPath: string): ProxyMethods {
  const backendBase = normalizeBackendBase(
    process.env.BACKEND_URL || 'http://13.60.168.165:8000'
  )

  async function proxy(req: NextRequest) {
    const target = new URL(targetPath, backendBase)
    target.search = req.nextUrl.search

    const incomingHeaders = filterRequestHeaders(req.headers)
    const body =
      req.method === 'GET' || req.method === 'HEAD'
        ? undefined
        : await req.text()

    let upstream: Response
    try {
      upstream = await fetch(target, {
        method: req.method,
        headers: incomingHeaders,
        body,
      })
    } catch (error) {
      const detail =
        error instanceof Error ? error.message : 'Failed to reach backend service'

      return NextResponse.json(
        {
          detail,
          target: target.toString(),
        },
        { status: 502 }
      )
    }

    const respHeaders = filterResponseHeaders(upstream.headers)
    const respBody = await upstream.arrayBuffer()

    return new NextResponse(respBody, {
      status: upstream.status,
      headers: respHeaders,
    })
  }

  return {
    GET: (req) => proxy(req),
    POST: (req) => proxy(req),
    PUT: (req) => proxy(req),
    PATCH: (req) => proxy(req),
    DELETE: (req) => proxy(req),
    OPTIONS: () => new NextResponse(null, { status: 204 }),
  }
}
