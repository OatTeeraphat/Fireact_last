import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCkH3Bkvfv_dXM1_n-IIzf2VSHenmjRnpU",
    authDomain: "auction-kmutt.firebaseapp.com",
    databaseURL: "https://auction-kmutt.firebaseio.com",
    storageBucket: "auction-kmutt.appspot.com",
  }

firebase.initializeApp(config)

export const db = firebase.database()
export const ref = db.ref()
export const firebaseAuth = firebase.auth