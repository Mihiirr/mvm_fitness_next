import { Provider } from '@/context/authContext'
import '@/styles/globals.css'
import { fetchUserId } from '@/utils/fetchUser'
import { useState, useEffect } from 'react'
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

export default function App({ Component, pageProps }) {
  const [User, setUser] = useState({});
  const [Token, setToken] = useState()

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    const fetchUserData = async () => {
      if (typeof window !== 'undefined') {
        await setToken(localStorage.getItem("auth-token"));
        const userInfo = await fetchUserId(Token);
        setUser(userInfo);
      }
    }
    fetchUserData()
  }, [Token])
  const rootContextData = { user: User };
  console.log({ rootContextData });
  return (
    <Provider initState={rootContextData}>
      <ThemeProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider >
    </Provider>

  )
}