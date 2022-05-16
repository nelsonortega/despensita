import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../firebase/firebase'
import { login, logout } from '../newStore/slices/userSlice'
import { isUserAdmin } from '../firebase/functions/FirebaseFunctions'

const useLogin = () => {
  const dispatch = useDispatch()
  const [userId, setUserId] = useState('')
  const [loading, setLoading] = useState(true)

  const authenticateUser = async (user) => {
    const isAdmin = await isUserAdmin(user)

    dispatch(login({
      userId: user.uid,
      token: user.stsTokenManager.accessToken,
      isUserAdmin: isAdmin
    }))
  }

  const logoutUser = () => {
    dispatch(logout())
  }

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        setUserId(user.uid)
        await authenticateUser(user)
      } else {
        logoutUser()
      }

      setLoading(false)
    })
  }, [])

  return [userId, loading]
}

export default useLogin
