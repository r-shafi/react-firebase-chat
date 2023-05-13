import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCMnizd168W6TnnETBKxZg2VpEDJakNinE',
  authDomain: 'chat-app-459f5.firebaseapp.com',
  projectId: 'chat-app-459f5',
  storageBucket: 'chat-app-459f5.appspot.com',
  messagingSenderId: '247123303575',
  appId: '1:247123303575:web:4746fc80d48450c19d9dd2',
  measurementId: 'G-FBF62PREEF',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };
