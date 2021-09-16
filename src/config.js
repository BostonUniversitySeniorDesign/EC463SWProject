import Firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCw_w9IRz63XeyWdRQuRVcUgex-qMkHQ9g",
  authDomain: "ec463-calorie-scanner-app.firebaseapp.com",
  databaseURL: "https://ec463-calorie-scanner-app-default-rtdb.firebaseio.com",
  projectId: "ec463-calorie-scanner-app",
  storageBucket: "ec463-calorie-scanner-app.appspot.com",
  messagingSenderId: "569463444925",
  appId: "1:569463444925:web:8349137c0bc9308fbb6ed4",
  measurementId: "G-ZRFRBYCSS6"
};

const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();