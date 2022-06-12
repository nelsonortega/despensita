import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { firebaseAuth } from '../firebase/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'
import { login, logout } from '../store/slices/userSlice'
import { isUserAdmin } from '../firebase/functions/FirebaseFunctions'

const useLogin = (): [string, boolean] => {
  const dispatch = useDispatch()
  const [userId, setUserId] = useState('')
  const [loading, setLoading] = useState(true)

  const authenticateUser = async (user: User): Promise<void> => {
    const userToken = await user.getIdToken()
    const isAdmin = await isUserAdmin(user)

    dispatch(login({
      userId: user.uid,
      token: userToken,
      isUserAdmin: isAdmin
    }))
  }

  const logoutUser = (): void => {
    dispatch(logout())
    setUserId('')
  }

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user !== null) {
        setUserId(user.uid)
        authenticateUser(user).finally(() => { setLoading(false) })
      } else {
        logoutUser()
        setLoading(false)
      }
    })
  }, [])

  return [userId, loading]
}

export default useLogin
