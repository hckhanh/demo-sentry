import type { LinksFunction } from '@remix-run/node'

import { cssBundleHref } from '@remix-run/css-bundle'
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

import stylesheet from '~/tailwind.css'

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    crossOrigin: 'anonymous',
    href: 'https://fonts.gstatic.com',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap',
  },
  { href: stylesheet, rel: 'stylesheet' },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
]

export default function App() {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body className='text-sm text-gray-900'>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export function ErrorBoundary() {
  return (
    <html lang='en'>
      <head>
        <title>404 | Did you get lost?</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Links />
      </head>
      <body className='text-sm text-gray-900'>
        <main className='grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
          <div className='text-center'>
            <p className='text-base font-semibold text-indigo-600'>404</p>
            <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
              Page not found
            </h1>
            <p className='mt-6 text-base leading-7 text-gray-600'>
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <Link
                to='/'
                className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Go back home
              </Link>
            </div>
          </div>
        </main>
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
