import FirebaseKey from './FirebaseKey'
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

export const firebaseApp = initializeApp(FirebaseKey)

export const firestoreDB = getFirestore(firebaseApp)
export const firestoreStorage = getStorage(firebaseApp)