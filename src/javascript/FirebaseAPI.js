import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";

export default class FirebaseAPI {
  static firebaseConfig = {
    apiKey: "AIzaSyBHGic0M2VslI4uXZW1vlHKaFnVe-9VMik",
    authDomain: "books-club-api.firebaseapp.com",
    databaseURL:
      "https://books-club-api-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "books-club-api",
    storageBucket: "books-club-api.appspot.com",
    messagingSenderId: "1060925473877",
    appId: "1:1060925473877:web:e23bb6ab3895725e5540dc",
    measurementId: "G-2BZ9FR37CL",
  };

  static app = initializeApp(FirebaseAPI.firebaseConfig);
  static db = getDatabase(FirebaseAPI.app);

  static getCardsData(dbName) {
    const dbRef = ref(FirebaseAPI.db);
    return get(child(dbRef, dbName))
      .then((snapshot) => {
        const cards = [];

        snapshot.forEach((childSnapshot) => {
          cards.push(childSnapshot.val());
        });
        return cards;
      })
      .catch((e) => {
        throw new Error(`FirebaseAPI can not execure request: ${e.message}`);
      });
  }
}
