// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { getFirestore, collection, addDoc, setDoc, doc, getDocs } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyAT3aAvlRFULmOzCXMLZEmJyEGfxela4rg",
  authDomain: "goals-and-reminders.firebaseapp.com",
  projectId: "goals-and-reminders",
  storageBucket: "goals-and-reminders.appspot.com",
  messagingSenderId: "964230229535",
  appId: "1:964230229535:web:e381991adc0a438d12ef2a"
};

// init app
const firebaseApp = initializeApp(config);

const provider = new GoogleAuthProvider();

// init db
const db = getFirestore();

// collection reference
const colRef = collection(db, `items`);

// get collection data
export const fetchGoals = async () => {
  await getDocs(colRef)
  .then((snapshot) => {
    let items = [];
    snapshot.docs.map((doc) => {
      items.push({ ...doc.data(), id: doc })
    })
    console.log('Items in firebase.utils', items)
    return items
  })
}

export const addItem = async (item) => {
  const docRef = await addDoc(colRef, {
    ...item
  });
  console.log('hey')
  return {
    response: 'hey',
    type:'hey'
  }
}



export const createUser = async () => {
  try {
      const docRef = await addDoc(collection(db, `users`), {
        email: 'lxfitz@gmail.com'
      });
      console.log("Document written with ID: ", docRef.id);
  } catch (error) {
      return(error)
  }
};

export const signInWithGoogle = async () => {
  const auth = getAuth();
  signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log(user);
    return user;
    //go through Firebase. See if user.email exists, if not, create new user
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(errorMessage)
  });
}


export const updateUser = async () => {
  const userRef = doc(db, 'users', 'lxfitz@gmail.com');
  setDoc(userRef, {name: "Alex"});
}

export const fetchUser = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} ${doc.data().email}`);
  });
}

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
