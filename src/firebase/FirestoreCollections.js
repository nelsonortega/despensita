import { firestoreDB } from './firebase'
import { collection } from 'firebase/firestore'

export const userCollection = collection(firestoreDB, 'users')
export const orderCollection = collection(firestoreDB, 'orders')
export const productCollection = collection(firestoreDB, 'products')
