import throttle from 'lodash.throttle';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  input: document.querySelector('.feedback-form input'),
};

const STORAGE_KEY = 'feedback-form-state';

const { form, textarea, input } = refs;

form.addEventListener('input', throttle(onInputForm, 500));
form.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();

  const userData = e.currentTarget.elements;
  const { email, message } = userData;

  if (email.value === '' || message.value === '') {
    Notify.failure('Pls fill all fields: email & message');
  } else {
    console.log(`${email.name}: ${email.value}`);
    console.log(`${message.name}: ${message.value}`);

    e.currentTarget.reset();

    localStorage.removeItem(STORAGE_KEY);
  }
}

populatedFormData();

const dataObject = {};

function onInputForm() {
  dataObject.email = form[0].value.trim();
  dataObject.message = form[1].value.trim();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataObject));
}

function populatedFormData() {
  const savedFormData = localStorage.getItem(STORAGE_KEY);
  const parsedFormData = JSON.parse(savedFormData);

  if (savedFormData) {
    textarea.value = parsedFormData.message;
    input.value = parsedFormData.email;
  }
}
