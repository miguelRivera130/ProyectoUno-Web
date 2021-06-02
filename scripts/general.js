var firebaseConfig = {
  apiKey: "AIzaSyAN6Yl2M4yMvcRfGrBFatZfrjWtA1l0Llo",
  authDomain: "proyecto-web-95fd3.firebaseapp.com",
  projectId: "proyecto-web-95fd3",
  storageBucket: "proyecto-web-95fd3.appspot.com",
  messagingSenderId: "795682066356",
  appId: "1:795682066356:web:5da86be72b5afede2face1",
  measurementId: "G-X8DK5TX582"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();

let loggedUser = null;

const setLoggedUser = (info, id) => {
  loggedUser = info;
  loggedUser.uid = id;
  userAuthChanged(true);
  if (typeof checkProductFormAdmin !== 'undefined') checkProductFormAdmin();
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    db.collection('users').doc(user.uid).get().then(function (doc) {
      if (!doc.data()) return;
      setLoggedUser(doc.data(), user.uid);
    });
  } else {
    loggedUser = null;
    userAuthChanged(false);
  }
});

let cart = [];
const cartBtnNumber = document.querySelector('.cartButton__span');

const cartFromLS = localStorage.getItem('item__cart');
if (cartFromLS) {
  cart = JSON.parse(cartFromLS);
  if (cartBtnNumber) {
    cartBtnNumber.innerText = cart.length;
  }
}