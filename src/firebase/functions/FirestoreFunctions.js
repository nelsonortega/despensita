import { doc, getDoc, setDoc, getDocs, deleteDoc } from 'firebase/firestore'

export async function createDocument (collection, newDocument) {
  try {
    const documentRefId = doc(collection).id
    const documentRef = doc(collection, documentRefId)

    const documentToAddWithId = {
      id: documentRefId,
      ...newDocument
    }

    await setDoc(documentRef, documentToAddWithId)

    return documentRefId
  } catch (error) {
    console.log(error)
  }
}

export async function getDocument (collection, documentId) {
  try {
    const document = await getDoc(doc(collection, documentId))

    return document.data()
  } catch (error) {
    console.log(error)
  }
}

export async function updateDocument (collection, documentId, newDocument) {
  try {
    const documentRef = doc(collection, documentId)
    const document = await getDoc(documentRef)

    if (!document.exists()) {
      return undefined
    }

    await setDoc(documentRef, newDocument, { merge: true })

    return {
      ...document.data(),
      ...newDocument
    }
  } catch (error) {
    console.log(error)
  }
}

export async function deleteDocument (collection, documentId) {
  try {
    const documentRef = doc(collection, documentId)
    await deleteDoc(documentRef)

    return 'Deleted'
  } catch (error) {
    console.log(error)
  }
}

export async function getAllDocuments (collection) {
  const documentsResponse = {
    success: true,
    documents: []
  }

  try {
    const documentsFetched = await getDocs(collection)

    documentsFetched.forEach((document) => {
      documentsResponse.documents.push(document.data())
    })

    return documentsResponse
  } catch (error) {
    documentsResponse.success = false

    return documentsResponse
  }
}
