import firebase from "firebase/app";
import "firebase/firestore";

const firestore = firebase.firestore();

firestore.collection("users").doc("HzoGa8AxnHKW3LpJhwTv").collection("cartItems").doc("NqzyE2F6nOvYx51DkpkS");
firestore.doc("/users/HzoGa8AxnHKW3LpJhwTv/cartItems/NqzyE2F6nOvYx51DkpkS");
firestore.collection("/users/HzoGa8AxnHKW3LpJhwTv/cartItems");