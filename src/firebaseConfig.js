import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBiiHh5-dx8xhTwGr-0j4elnYS7H97n_Aw',
  authDomain: 'progresstracker-62966.firebaseapp.com',
  databaseURL: 'https://progresstracker-62966.firebaseio.com',
  projectId: 'progresstracker-62966',
  storageBucket: '',
  messagingSenderId: '1018252973564',
  appId: '1:1018252973564:web:c4b69f1d5f864c7f'
};

const firebaseInit = firebase.initializeApp(config);
export default firebaseInit.firestore();
