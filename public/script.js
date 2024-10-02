const socket = io('http://localhost:3000',{})

const totClients = document.getElementById('tot-clients');

const nameInput= document.getElementById("name-input");
const msgContainer = document.getElementById('msg-cont');

const msgFeedback= document.getElementById("msg-feedback");

const msgForm= document.getElementById("msg-form");
const msgInput= document.getElementById("msg-input");

socket.on('total-clients',(data)=>{
    totClients.textContent = "Total Clients: "+data;
});



