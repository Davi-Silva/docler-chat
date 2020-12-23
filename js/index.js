const chatWrapper = document.querySelector('.chatWrapper');
const chatContainer = document.querySelector('.chatContainer');
const messagesContainer = document.querySelector('.messagesContainer');
const messagesWrapper = document.querySelector('.messagesWrapper');
const form = document.querySelector('.form');
const formInput = document.querySelector('.formInput');
const userInput = document.querySelector('.userInput');
const contactTalkBtn = document.querySelector('.contactTalkBtn');
const settingsDiv = document.querySelector('.settingsDiv');
const chatSettingsDiv = document.querySelector('.chatSettingsDiv');
const submitBtn = document.querySelector('.submitBtn');

let input = '';
let scrollTop = 0;
let openSetting = false;
let user = 'Guest';

userInput.value = user;

function scrollDiv() {
  scrollTop += 70;
  messagesContainer.scroll({
    left: 0,
    top: 1000 + scrollTop,
    behavior: 'smooth',
  });
}

function removeChat() {
  chatContainer.remove();
  const closedMessage = document.createElement('p');
  closedMessage.classList.add('closed');
  closedMessage.innerHTML = 'Session has ended...';
  chatWrapper.appendChild(closedMessage);
}

function createExitMenu() {
  const parentDiv = document.createElement('div');
  parentDiv.classList.add('settings');
  const exitBtn = document.createElement('button');
  exitBtn.classList.add('exitBtn');
  exitBtn.innerHTML = 'Exit';
  exitBtn.addEventListener('click', removeChat);
  parentDiv.appendChild(exitBtn);
  settingsDiv.appendChild(parentDiv);
}

function removeExitMenu() {
  const setting = document.querySelector('.settings');
  setting.remove();
}

function createUserMessage(message) {
  const senderMessageDiv = document.createElement('div');
  senderMessageDiv.classList.add('senderMessageDiv');
  const senderMessage = document.createElement('p');
  senderMessage.classList.add('senderMessage');
  senderMessage.innerHTML = message;
  senderMessageDiv.appendChild(senderMessage);
  messagesWrapper.appendChild(senderMessageDiv);
}

function createContactMessage(contactNameString, contactMessageString) {
  console.log(contactNameString, contactMessageString);
  const contactMessageDiv = document.createElement('div');
  contactMessageDiv.classList.add('contactMessageDiv');
  const contactName = document.createElement('p');
  contactName.classList.add('contactName');
  contactName.innerHTML = contactNameString;
  const contactMessage = document.createElement('p');
  contactMessage.classList.add('contactMessage');
  contactMessage.innerHTML = contactMessageString;
  contactMessageDiv.appendChild(contactName);
  contactMessageDiv.appendChild(contactMessage);
  messagesWrapper.appendChild(contactMessageDiv);
}

function sendContactMessage() {
  createContactMessage('Talking Head', "Hello, I'm a talking head");
  scrollDiv();
}

userInput.addEventListener('input', () => {
  user = e.target.value;
});

formInput.addEventListener('input', (e) => {
  input = e.target.value;
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (input.length > 0 && formInput.value.length > 0) {
    createUserMessage(input);
    formInput.value = '';
    scrollDiv();
    setTimeout(() => {
      sendContactMessage();
    }, 500);
  } else {
    formInput.classList.add('empty');
    setTimeout(() => {
      formInput.classList.remove('empty');
    }, 500);
  }
});

chatSettingsDiv.addEventListener('click', () => {
  console.log(openSetting);
  if (!openSetting) {
    createExitMenu();
  } else {
    removeExitMenu();
  }
  openSetting = !openSetting;
});
