import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../firebase/firebase'
import * as AuthActions from '../store/actions/AuthActions'
import { userCollection } from '../firebase/FirestoreCollections'
import { getAllDocuments } from '../firebase/functions/FirestoreFunctions'

const useLogin = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  const authenticateUser = async (user) => {
    const adminUsersResponse = await getAllDocuments(userCollection)
    const isUserAdmin = adminUsersResponse.find(userAdmin => userAdmin.userid === user.uid)

    dispatch(AuthActions.autoAuthenticate(user.uid, user.stsTokenManager.accessToken, isUserAdmin !== undefined))
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
