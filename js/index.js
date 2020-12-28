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

const socket = io('http://35.157.80.184:8080');

socket.on('connect', () => {
  console.log('Socket.io is connected');
});

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
  socket.emit('disconnect');
  socket.off();
  chatContainer.remove();
}

function createExitMenu() {
  const parentDiv = document.createElement('div');
  parentDiv.classList.add('settings');
  parentDiv.classList.add('theme');
  const exitBtn = document.createElement('button');
  exitBtn.classList.add('exitBtn');
  exitBtn.classList.add('theme');
  if (isDarkTheme) {
    parentDiv.classList.remove('light');
    exitBtn.classList.remove('light');
    parentDiv.classList.add('dark');
    exitBtn.classList.add('dark');
  } else {
    parentDiv.classList.remove('dark');
    exitBtn.classList.remove('dark');
    parentDiv.classList.add('light');
    exitBtn.classList.add('light');
  }
  exitBtn.innerHTML = 'Disconnect';
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
  const senderMessage = document.createElement('p');

  senderMessageDiv.classList.add('senderMessageDiv');
  senderMessage.classList.add('senderMessage');
  senderMessage.classList.add('theme');

  if (isDarkTheme) {
    senderMessage.classList.remove('light');
    senderMessage.classList.add('dark');
  } else {
    senderMessage.classList.remove('dark');
    senderMessage.classList.add('light');
  }

  senderMessage.innerHTML = message;

  senderMessageDiv.appendChild(senderMessage);
  messagesWrapper.appendChild(senderMessageDiv);
}

function createContactMessage(contactNameString, contactMessageString) {
  const contactMessageDiv = document.createElement('div');
  const contactName = document.createElement('p');
  const contactMessage = document.createElement('p');

  contactMessageDiv.classList.add('contactMessageDiv');
  contactName.classList.add('contactName');
  contactName.classList.add('theme');
  contactMessage.classList.add('contactMessage');
  contactMessage.classList.add('theme');

  if (isDarkTheme) {
    contactName.classList.remove('light');
    contactName.classList.add('dark');
    contactMessage.classList.remove('light');
    contactMessage.classList.add('dark');
  } else {
    contactName.classList.remove('dark');
    contactName.classList.add('light');
    contactMessage.classList.remove('dark');
    contactMessage.classList.add('light');
  }

  contactName.innerHTML = contactNameString;
  contactMessage.innerHTML = contactMessageString;

  contactMessageDiv.appendChild(contactName);
  contactMessageDiv.appendChild(contactMessage);
  messagesWrapper.appendChild(contactMessageDiv);
}

userInput.addEventListener('input', (e) => {
  user = e.target.value;
});

formInput.addEventListener('input', (e) => {
  input = e.target.value;
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (
    input.length > 0 &&
    formInput.value.length > 0 &&
    user.length > 0 &&
    userInput.value.length > 0
  ) {
    socket.emit('message', {
      message: input,
      user: user,
    });

    createUserMessage(input);
    formInput.value = '';
    scrollDiv();
  } else {
    if (input.length === 0 && formInput.value.length === 0) {
      if (isDarkTheme) {
        formInput.classList.add('darkEmpty');
      } else {
        formInput.classList.add('lightEmpty');
      }
    }
    if (user.length === 0 && userInput.value.length === 0) {
      if (isDarkTheme) {
        userInput.classList.add('darkEmpty');
      } else {
        userInput.classList.add('lightEmpty');
      }
    }
    setTimeout(() => {
      formInput.classList.remove('darkEmpty');
      userInput.classList.remove('darkEmpty');

      formInput.classList.remove('lightEmpty');
      userInput.classList.remove('lightEmpty');
    }, 500);
  }
});

chatSettingsDiv.addEventListener('click', () => {
  if (!openSetting) {
    createExitMenu();
  } else {
    removeExitMenu();
  }
  openSetting = !openSetting;
});

socket.on('message', (message) => {
  if (message.user !== user) {
    createContactMessage(message.user, message.message);
    scrollDiv();
  }
});

socket.on('disconnect', () => {
  const closedMessage = document.createElement('p');
  closedMessage.classList.add('closed');
  if (isDarkTheme) {
    closedMessage.classList.add('dark');
  } else {
    closedMessage.classList.add('light');
  }
  closedMessage.classList.add('theme');
  closedMessage.innerHTML = 'Session has ended...';
  chatWrapper.appendChild(closedMessage);
});
