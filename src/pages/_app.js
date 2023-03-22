import { Provider } from '@/context/authContext'
import '@/styles/globals.css'
import { fetchUserId } from '@/utils/fetchUser'
import { useState, useEffect } from 'react'

export default function App({ Component, pageProps }) {
  const [User, setUser] = useState({});
  const [Token, setToken] = useState()

  useEffect(() => {
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
  console.log({ rootContextData })
  return (
    <Provider initState={rootContextData}>
      <Component {...pageProps} />
    </Provider>
  )
}
