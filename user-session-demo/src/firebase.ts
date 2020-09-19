import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRAX8LunfO4aQgRXyWiqwzaZPGQbe7pmQ",
  authDomain: "remote-config-demo-3eb4c.firebaseapp.com",
  databaseURL: "https://remote-config-demo-3eb4c.firebaseio.com",
  projectId: "remote-config-demo-3eb4c",
  storageBucket: "remote-config-demo-3eb4c.appspot.com",
  messagingSenderId: "232509884210",
  appId: "1:232509884210:web:450c48e117af09a89d792b"
};

firebase.initializeApp(firebaseConfig);
export type UserCredential = firebase.auth.UserCredential;
export const Persistence = firebase.auth.Auth.Persistence;
export interface User extends firebase.User {};


export const createUserWithEmailAndPassword = async (email: string, password: string, callback: (response?: UserCredential, err?: Error) => void): Promise<void> => {
  try {
    const res: UserCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    callback(res);
  } catch (e) {
    callback(undefined, e);
  }
};

export const signInWithEmailAndPassword =  async (email: string, password: string, rememberMe: boolean, callback: (response?: UserCredential, err?: Error) => void): Promise<void> => {
  const persistence = rememberMe ? Persistence.LOCAL : Persistence.SESSION;
  try {
    await firebase.auth().setPersistence(persistence);
    const res: UserCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    callback(res);
  } catch (e) {
    callback(undefined, e);
  }
};

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('');

export const signInWithGoogle = async (callback: (err?: Error) => void): Promise<void> => {
  try {
    await firebase.auth().signInWithRedirect(provider);
    callback();
  } catch (e) {
    callback(e);
  }
};


