import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = initializeApp({
  apiKey: "AIzaSyCeBqwL9KjUDllmDQsnO9FthDlMnyfulZg",
  authDomain: "mundo-nathy.firebaseapp.com",
  projectId: "mundo-nathy",
  storageBucket: "mundo-nathy.appspot.com",
  messagingSenderId: "987748749773",
  appId: "1:987748749773:web:e87de1ec28d58daf553484",
  measurementId: "G-MDLY7GBXE1",
});

const storage = getStorage(firebaseConfig);
export default storage;
