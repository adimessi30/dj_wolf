import { initializeApp } from 'firebase/app'
import 'firebase/firestore'

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyAagx22Lh99_cRftsQC9cz1SaA_CVIUPvs',
  authDomain: 'dj-wolf-e8e5f.firebaseapp.com',
  databaseURL: 'https://dj-wolf-e8e5f.firebaseio.com',
  projectId: 'dj-wolf-e8e5f',
  storageBucket: 'dj-wolf-e8e5f.appspot.com',
  messagingSenderId: '44240032766',
  appId: '1:44240032766:web:eeb529b000cbc586d1e6af',
  measurementId: 'G-945H6J20N5'
})

const fireStoreDB = firebaseApp.firestore()

export default fireStoreDB
