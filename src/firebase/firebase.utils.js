// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, setDoc, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyAT3aAvlRFULmOzCXMLZEmJyEGfxela4rg",
  authDomain: "goals-and-reminders.firebaseapp.com",
  projectId: "goals-and-reminders",
  storageBucket: "goals-and-reminders.appspot.com",
  messagingSenderId: "964230229535",
  appId: "1:964230229535:web:e381991adc0a438d12ef2a"
};

const firebaseApp = initializeApp(config);
const db = getFirestore();

export const writeItems = async (user, itemToAdd) => {
  try {
      const docRef = await addDoc(collection(db, `users/${user}/items`), itemToAdd);
      return docRef.id;
      console.log("Document written with ID: ", docRef.id);
  } catch (error) {
      return(error)
  }
};

export const fetchItems = async user => {
  try {
    const querySnapshot = await getDocs(collection(db, `users/`));
    const docData = querySnapshot.data();
    console.log(docData)

    return querySnapshot
  } catch(error){
    return(error)
  }
}


// export const createUserProfileDocument = async (userAuth, additionalData) => {
//     if (!userAuth) return;

//     const userRef = firestore.doc(`users/${userAuth.uid}`);

//     const snapShot = await userRef.get();

//     if(!snapShot.exists){
//         const { displayName, email } = userAuth;
//         const createdAt = new Date();

//         try {
//             await userRef.set({
//                 displayName,
//                 email,
//                 createdAt,
//                 ...additionalData
//             });
//         } catch (err) {
//             console.log('Error creating user', err.message);
//         }
//     }
//     return userRef;
// } 

// export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
//     const collectionRef = firestore.collection(collectionKey);
//     console.log(collectionRef);

//     const batch = firestore.batch();
//     objectsToAdd.forEach(obj => {
//         const newDocRef = collectionRef.doc();
//         batch.set(newDocRef, obj)
//     });

//     return await batch.commit()
// };

// export const convertCollectionsSnapshotToMap = (collections) => {
//     const transformedCollections = collections.docs.map((doc) => {
//         const { title, items } = doc.data();

//         return {
//             routeName: encodeURI(title.toLowerCase()),
//             id:doc.id,
//             title,
//             items
//         }
//     });
//     return transformedCollections.reduce((accumulator, collection) => {
//         accumulator[collection.title.toLowerCase()] = collection;
//         return accumulator;
//     }, {});
// };

// export const getCurrentUser = () => {
//     return new Promise((resolve, reject) => {
//         const unsubscribe = auth.onAuthStateChanged(userAuth => {
//             unsubscribe();
//             resolve(userAuth);
//         }, reject)
//     });
// }

// export const auth = firebase.auth();
// export const firestore = firebase.firestore();

// export const googleProvider = new firebase.auth.GoogleAuthProvider();
// googleProvider.setCustomParameters({ prompt: 'select_account'});

// export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

// export default firebase;
