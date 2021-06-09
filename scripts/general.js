var firebaseConfig = {
  apiKey: "AIzaSyBSxUlpQSsdWQywE6fw5B0jCWwbIYrM3D8",
  authDomain: "proyecto-finalweb.firebaseapp.com",
  projectId: "proyecto-finalweb",
  storageBucket: "proyecto-finalweb.appspot.com",
  messagingSenderId: "856505514809",
  appId: "1:856505514809:web:422d998c0be7ba7d9806e8",
  measurementId: "G-16VVV7XHGR"
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
const CART_COLLECTION = db.collection('cart');
const ORDERS_COLLECTION = db.collection('orders');

const cartFromLS = localStorage.getItem('item__cart');
if (cartFromLS) {
  cart = JSON.parse(cartFromLS);
  if (cartBtnNumber) {
    cartBtnNumber.innerText = cart.length;
  }
}
