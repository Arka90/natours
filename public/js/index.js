import '@babel/polyfill';

import { login, logout, forgotPassword } from './login';
import { updateSettings } from './updateettings';
import { bookTour } from './stripe';
const loginForm = document.querySelector('.form--login');
const forgotPassFrom = document.querySelector('.forgotPass-form');

const logoutBtn = document.querySelector('.nav__el--logout');
const updateForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const saveBtn = document.querySelector('.btn--save-password');
const bookBtn = document.getElementById('book-tour');

if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (logoutBtn) logoutBtn.addEventListener('click', logout);

if (updateForm) {
  updateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    console.log(form);
    updateSettings(form, 'data');
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    saveBtn.textContent = 'Updating...';

    e.preventDefault();
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );
    passwordCurrent = password = passwordConfirm = '';
    saveBtn.textContent = 'Save password';
  });
}

if (bookBtn) {
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    console.log(e.target.dataset);
    const { tourid } = e.target.dataset;
    bookTour(tourid);
  });
}

if (forgotPassFrom) {
  forgotPassFrom.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    forgotPassword(email);
  });
}
