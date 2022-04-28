import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../firebase/firebase'
import * as UserActions from '../store/actions/UserActions'
import { isUserAdmin } from '../firebase/functions/FirebaseFunctions'

const useLogin = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  const authenticateUser = async (user) => {
    const isAdmin = await isUserAdmin(user)
    dispatch(UserActions.login(user.uid, user.stsTokenManager.accessToken, isAdmin))
  }

  const logoutUser = () => {
    dispatch(UserActions.logout())
  }

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        await authenticateUser(user)
      } else {
        logoutUser()
      }

      setLoading(false)
    })
  }, [])

  return [loading]
}

export default useLogin
