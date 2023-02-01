import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCZiaxzAbPzivYWTQFT5v3zaE-ZCTEKu6g',
  authDomain: 'ventout-1a6d4.firebaseapp.com',
  projectId: 'ventout-1a6d4',
  storageBucket: 'ventout-1a6d4.appspot.com',
  messagingSenderId: '248933107968',
  appId: '1:248933107968:web:e5fb4d05ee573832a28be5',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
