import { Provider } from '@/context/authContext'
import '@/styles/globals.css'
import { fetchUserInfo } from '@/utils/fetchUser'
import { useState, useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';

export default function App({ Component, pageProps }) {
  const [User, setUser] = useState({});

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    const fetchUserData = async () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem("auth-token");
        const userInfo = await fetchUserInfo(token);
        setUser(userInfo);
      }
    }
    fetchUserData();
  }, [])
  const rootContextData = { user: User };
  return (
    <Provider>
      <CssBaseline />
      <Component {...pageProps} />
    </Provider>

  )
}