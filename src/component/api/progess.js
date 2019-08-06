import db from '../../credentials/firebaseConfig';

export const addProgress = (uid, data) => {
  const docRef = db.collection('users').doc(uid);

  docRef
    .get()
    .then(doc => {
      if (doc.exists) {
        //TODO ADD DATA
      } else {
        //TODO SET DATA
        docRef.set({ data });
      }
    })
    .then(() => {
      return console.log('added successfully');
    })
    .catch(e => {
      return e;
    });
};

export const currentProgress = async uid => {
  const docRef = db.collection('users').doc(uid);

  await docRef.get().then(doc => {
    if (doc.exists) {
      console.log(doc.data());
      return true;
    } else {
      return 'not found';
    }
  });
};
