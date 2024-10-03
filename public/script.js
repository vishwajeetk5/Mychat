const socket = io('http://localhost:3000',{})

const totClients = document.getElementById('tot-clients');

const nameInput= document.getElementById("name-input");
const msgContainer = document.getElementById('msg-cont');

const msgFeedback= document.getElementById("msg-feedback");

const msgForm= document.getElementById("msg-form");
const msgInput= document.getElementById("msg-input");

msgInput.addEventListener('input',()=>{
    socket.emit('typing',nameInput.value);
})

socket.on('who-is-typing',(who)=>{
    msgFeedback.innerHTML= who+"is typing..."
    setTimeout(()=>{
        msgFeedback.innerHTML=''
    },2000)
})

msgForm.addEventListener('submit',(e)=>{
e.preventDefault();
sendMessage();
})

socket.on('total-clients',(data)=>{
    totClients.textContent = "Total Clients: "+data;
});

function sendMessage(){
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
    console.log(data);
    addMsgToUi(false,data)
})

function addMsgToUi(isOwnMsg,data){
    const element = `
    <li class = "${isOwnMsg?"msg-right":"msg-left"}">
        <p class="msg">
            ${data.msg}
            <span>${data.name} 🔻3 ${moment(data.dataTime).fromNow()}</span>
        </p>
    </li>
    `

    msgContainer.innerHTML+=element

}