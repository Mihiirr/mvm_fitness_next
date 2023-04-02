import { Provider } from '@/context/authContext'
import '@/styles/globals.css'
import { useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, [])

  return (
    <Provider>
      <CssBaseline />
      <Component {...pageProps} />
    </Provider>

  )
}