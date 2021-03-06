const authModal = document.createElement('section');
authModal.classList.add('modal');
authModal.innerHTML = `
    <div class="modal__backdrop"></div>
    <article class="modal__content">
      <button class="modal__close">X</button>
      <form class="authform">
        <label class="authform__regfield productForm__label">
          Nombre
          <input class="productForm__input" type="text" name="firstname">
        </label>
        <label class="authform__regfield productForm__label">
          Apellido
          <input class="productForm__input" type="text" name="lastname">
        </label>
        <label class="productForm__label">
          Correo electronico
          <input class="productForm__input" type="email" name="email">
        </label>
        <label class="productForm__label">
          Contraseña
          <input class="productForm__input" type="password" name="password">
        </label>
        <p class="productForm__error"></p>
        <button type="button" class="authform__register">Registrate</button>
        <button type="button" class="authform__login">Logeate</button>
        <button type="submit">Enviar</button>
      </form>
    </article>
`;

document.body.appendChild(authModal);

const authForm = authModal.querySelector('.authform');
const regFields = authForm.querySelectorAll('.authform__regfield');
const registerBtn = authForm.querySelector('.authform__register');
const loginBtn = authForm.querySelector('.authform__login');
const modalError = authForm.querySelector('.productForm__error');
const authModalContent = authModal.querySelector('.modal__content');
const modalClose = authModal.querySelector('.modal__close');
let isLogin = true;

function handleGoToLogin() {
  regFields.forEach(function (elem) {
    elem.classList.add('hidden');
  });
  loginBtn.classList.add('hidden');
  registerBtn.classList.remove('hidden');
  isLogin = true;
}

loginBtn.addEventListener('click', handleGoToLogin);

registerBtn.addEventListener('click', function () {
  regFields.forEach(function (elem) {
    elem.classList.remove('hidden');
  });
  loginBtn.classList.remove('hidden');
  registerBtn.classList.add('hidden');
  isLogin = false;
});

authForm.addEventListener('submit', function (event) {
  event.preventDefault();
  console.log('submit');

  const firstname = authForm.firstname.value;
  const lastname = authForm.lastname.value;
  const email = authForm.email.value;
  const password = authForm.password.value;

  if (isLogin) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        handleCloseModal();
      })
      .catch((error) => {
        modalError.innerText = error.message;
      });
  } else {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        console.log(user);

        const userDoc = {
          firstname,
          lastname: lastname,
          email: email,
        };
        db.collection('users').doc(user.uid).set(userDoc);
        setLoggedUser(userDoc, user.uid);
        handleCloseModal();
      })
      .catch((error) => {
        modalError.innerText = error.message;
      });
  }
});

const authLogin = document.querySelector('.authButtons__login');
const authLogout = document.querySelector('.authButtons__logout');

function handleModalAppear() {
  authModal.style.opacity = 1;
  authModalContent.style.transform = 'translate(0px, 0px)';
}

authLogin.addEventListener('click', function () {
  authModal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  setTimeout(handleModalAppear, 1);
});

function handleCloseModal() {
  authModal.style.opacity = 0;
  authModalContent.style.transform = 'translate(0px, -500px)';
  document.body.style.overflow = 'hidden scroll';
  setTimeout(function () {
    authModal.style.display = 'none';
  }, 500);
}

handleCloseModal();

authLogout.addEventListener('click', function () {
  firebase.auth().signOut();
});

modalClose.addEventListener('click', function () {
  handleCloseModal();
});