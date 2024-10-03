// const socket = io('http://192.168.0.109:3000',{})
const socket = io('http://localhost:3000',{})

const totClients = document.getElementById('client-total');

const nameInput= document.getElementById("name-input");
const msgContainer = document.getElementById('msg-cont');

const msgFeedback= document.getElementById("feedback");

const msgForm= document.getElementById("msg-form");
const msgInput= document.getElementById("msg-input");

const messageTone = new Audio('./message-tone.mp3')

msgInput.addEventListener('input',()=>{
    socket.emit('typing',`✍️ ${nameInput.value} is typing`);
})

msgInput.addEventListener('blur',()=>{
    socket.emit('typing','')
})

socket.on('who-is-typing',(who)=>{
    clearFeedback()
 
    msgFeedback.textContent=who
})

function clearFeedback() {
    msgFeedback.textContent=''
}

msgForm.addEventListener('submit',(e)=>{
e.preventDefault();
sendMessage();
})

socket.on('total-clients',(data)=>{
    totClients.textContent = "Total Clients: "+data;
});

function sendMessage(){
    if(msgInput.value ==='')return 

    const data = {
        name:nameInput.value,
        msg : msgInput.value,
        dateTime: new Date()
    }
    
    socket.emit('message',data)
    addMsgToUi(true,data)
    msgInput.value= ''
}

socket.on('chat-msg',(data)=>{
    messageTone.play()
    addMsgToUi(false,data)
})

function scrollToBottom() {
    msgContainer.scrollTo(0, msgContainer.scrollHeight)
}

function addMsgToUi(isOwnMsg, data) {
    clearFeedback();
    const element = document.createElement('li');
    element.classList.add(isOwnMsg ? 'msg-right' : 'msg-left', 'fadeIn');

    element.innerHTML = `
        <p class="msg">
            ${data.msg}
            <span> ${data.name} <i class="fa-solid fa-circle"></i> ${moment(data.dateTime).fromNow()}</span>
        </p>
    `;

    msgContainer.appendChild(element);

    element.addEventListener('animationend', () => {
        element.classList.remove('fadeIn');
    });

    scrollToBottom();
}



