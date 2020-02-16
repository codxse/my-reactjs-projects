import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDCZ42nZKJlm2JEl5yDLkmI3ST927gRQjw",
  authDomain: "auth-demo-4682d.firebaseapp.com",
  databaseURL: "https://auth-demo-4682d.firebaseio.com",
  projectId: "auth-demo-4682d",
  storageBucket: "auth-demo-4682d.appspot.com",
  messagingSenderId: "913991400692",
  appId: "1:913991400692:web:c77f39fc05d5b8d8ec32a1"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    const id = userAuth.uid

    try {
      await userRef.set({
        id,
        displayName,
        email, 
        createdAt,
        ...additionalData
      });
    } catch (err) {
      console.log("error creating users", err);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithRedirect(provider);

export default firebase;