const socket = io('localhost:3000');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container');

let lastSent = false;
let lastPrintName;

const nam = prompt('what is your name?');
appendMessage('You joined');
socket.emit('new-user', nam);

socket.on('chat-message', data => {
    lastSent = false;

    if(data.nam != lastPrintName)
    {
        lastPrint = true;
        appendNameRight(data.nam+':');
        lastPrintName = data.nam;
    }

    appendMessageRight(data.message);
})

socket.on('user-connected', nam => {
    appendMessage(nam+' connected');
})

socket.on('user-disconnected', nam => {
    appendMessage(nam+' disconnected');
})


messageForm.addEventListener('submit', e =>{
    e.preventDefault();
    const message = messageInput.value;

    if(message != '')
    {
        lastPrintName = '';
    if(lastSent == false)
    {
        appendNameLeft('You:');
        lastSent = true;
    }
    
    appendMessageLeft(message);

    socket.emit('send-chat-message', message);
    messageInput.value = '';

    }

    
})

function appendNameLeft(message) {
    const messageElement = document.createElement('div');
    messageElement.className = "name-text-left";
    messageElement.innerText = message;
    messageContainer.append(messageElement);

}

function appendNameRight(message) {
    const messageElement = document.createElement('div');
    messageElement.className = "name-text-right";
    messageElement.innerText = message;
    messageContainer.append(messageElement);

}

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = "line-text";
    messageElement.innerText = message;
    messageContainer.append(messageElement);

}

function appendMessageLeft(message) {
    const messageElement = document.createElement('div');
    messageElement.className = "line-text-left";
    messageElement.innerText = message;
    messageContainer.append(messageElement);

}

function appendMessageRight(message) {
    const messageElement = document.createElement('div');
    messageElement.className = "line-text-right";
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}