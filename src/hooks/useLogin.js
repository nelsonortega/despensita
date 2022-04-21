import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../firebase/firebase'
import * as AuthActions from '../store/actions/AuthActions'
import { isUserAdmin } from '../firebase/functions/FirebaseFunctions'

const useLogin = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  const authenticateUser = async (user) => {
    const isAdmin = await isUserAdmin(user)
    dispatch(AuthActions.autoAuthenticate(user.uid, user.stsTokenManager.accessToken, isAdmin))
  }

  const logoutUser = () => {
    dispatch(AuthActions.logout())
  }

  onAuthStateChanged(firebaseAuth, async (user) => {
    if (user) {
      await authenticateUser(user)
    } else {
      logoutUser()
    }

    setLoading(false)
  })

  return [loading]
}

export default useLogin
