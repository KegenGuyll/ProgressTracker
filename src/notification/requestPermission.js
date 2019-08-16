import firebase from 'firebase';
import db from '../credentials/firebaseConfig';

const sendTokenToServer = async currentToken => {
  let data;
  const user = firebase.auth().currentUser;
  const docRef = db.collection('users').doc(user.uid);

  await docRef.get().then(doc => {
    data = doc.data();
  });

  if (data.tokens) {
    console.log('tokens in db');
    const result = data.tokens.filter(token => token === currentToken);
    if (result.length === 0) {
      console.log('adding new token');
      data.tokens.push(currentToken);
      docRef.set({ tokens: data.tokens }, { merge: true });
    } else {
      console.log('token already exist');
    }
  } else {
    console.log('creating first token');
    docRef.set({ tokens: [currentToken] }, { merge: true });
  }
};

export const askForPermissioToReceiveNotifications = async () => {
  try {
    let token;
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    await messaging.getToken().then(currentToken => {
      token = currentToken;
      sendTokenToServer(currentToken);
    });

    return token;
  } catch (error) {
    console.error(error);
  }
};
