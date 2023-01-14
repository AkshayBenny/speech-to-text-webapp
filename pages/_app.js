import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { posthog } from 'posthog-js'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
		const posthogToken = process.env.NEXT_PUBLIC_POSTHOG_TOKEN
		posthogToken &&
			posthog.init(posthogToken, {
				api_host: 'https://app.posthog.com',
			})
	}, [])
  return (
    <ThemeProvider enableSystem={true} attribute='class'>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
