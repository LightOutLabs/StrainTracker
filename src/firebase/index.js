import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBUtkgPuJMtgGqiC0qastyjgQbdIMGEcrg",
  authDomain: "strainlog.firebaseapp.com",
  databaseURL: "https://strainlog.firebaseio.com",
  projectId: "strainlog",
  storageBucket: "strainlog.appspot.com",
  messagingSenderId: "924815338833",
  appId: "1:924815338833:web:361114f1bd8a69bf21f770",
  measurementId: "G-2S9NVG8YM9",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

const database = firebase.firestore();

export { storage, database, firebase as default };

export const createStrainList = (
  userName,
  strain,
  noseRating,
  looksRating,
  bodyRaing,
  headRating,
  munchieRating,
  photoUrl,
  overallAvg
) => {
  return database.collection(`/users/${userName}/strains`).add({
    created: firebase.firestore.FieldValue.serverTimestamp(),
    strainName: { strain },
    noseRating: { noseRating },
    looksRating: { looksRating },
    bodyRaing: { bodyRaing },
    headRating: { headRating },
    munchieRating: { munchieRating },
    photoUrl: photoUrl,
    overallAvg: overallAvg,
  });
};

export const getStrains = (userName) => {
  const strains = [];
  const pullStrains = database
    .collection(`/users/${userName}/strains`)
    .onSnapshot((snap) => {
      snap.docs.forEach((doc) => {
        strains.push({ ...doc.data() });
      });
    });
  return pullStrains;
};
