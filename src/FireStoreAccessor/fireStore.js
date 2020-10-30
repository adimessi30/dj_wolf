import { initializeApp } from 'firebase/app'
import 'firebase/firestore'
import { config } from './fireStoreConfig'

const firebaseApp = initializeApp(config)

const fireStoreDB = firebaseApp.firestore()

export default fireStoreDB
