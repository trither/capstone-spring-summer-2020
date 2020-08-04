/*
const functions = require('..node_modules/firebase/firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

// auth trigger (new user signup creates a profile)
exports.newUserSignUp = functions.auth.user().onCreate(user => {
    return db.collection('profile').doc(user.uid).set({
      email: user.email,
      name: user.displayName,
      urlpic: user.photoURL,
      level: 0,
      lives: 3,
      score: 0,
      weeklystreak: 0,
      activeChallenges: [],
      challengesCompleted: [],
    });
  });
  
// auth trigger (user deleted from profile collection)
// delete user from auth in settings
exports.userDeleted = functions.auth.user().onDelete(user => {
    const doc = db.collection('profile').doc(user.uid);
    return doc.delete();
});


*/
  