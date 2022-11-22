import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyBP04JCZCoWoW38D3qkI8sIArwkuL-f-qU",
    authDomain: "product-36f53.firebaseapp.com",
    projectId: "product-36f53",
    storageBucket: "product-36f53.appspot.com",
    messagingSenderId: "909053220457",
    appId: "1:909053220457:web:d323a74ef7c1c111aff4f8"
};

firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();
const auth=firebase.auth();
const provider= new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();
export{db,auth,provider,storage};