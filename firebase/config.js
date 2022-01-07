

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB2ro-3WdGvTBLu2UhkcIjJYmaQzxGWh-4",
    authDomain: "mahaonline-4b5d5.firebaseapp.com",
    projectId: "mahaonline-4b5d5",
    storageBucket: "mahaonline-4b5d5.appspot.com",
    messagingSenderId: "355637760239",
    appId: "1:355637760239:web:c3f837afef7fae0f758b1a",
    measurementId: "G-BJ0GG5JEGB"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseConfig.storageBucket);
export default storage;
