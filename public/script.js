const socket = io('http://localhost:3000',{})

const totClients = document.getElementById('tot-clients');

const nameInput= document.getElementById("name-input");
const msgContainer = document.getElementById('msg-cont');

const msgFeedback= document.getElementById("msg-feedback");

const msgForm= document.getElementById("msg-form");
const msgInput= document.getElementById("msg-input");

msgForm.addEventListener('submit',(e)=>{
e.preventDefault();
sendMessage();
})

socket.on('total-clients',(data)=>{
    totClients.textContent = "Total Clients: "+data;
});

function sendMessage(){
    console.log(msgInput.value);

    const data = {
        name:nameInput.value,
        msg : msgInput.value,
        dateTime: new Date()
    }

    socket.emit('message',data)

}

socket.on('chat-msg',(data)=>{
    console.log(data);
})