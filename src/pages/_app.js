import { Provider } from '@/context/authContext'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}