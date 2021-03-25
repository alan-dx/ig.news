import { AppProps } from 'next/app' //importanto o tipagem dos componentes

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
