const button = document.querySelector("button");
const chatOutput = document.querySelector(".chat-output");
const handle = document.querySelector("#handle");
const message = document.querySelector("#message");
const socket = io.connect("https://whatsgoodchat.herokuapp.com/");
const typing = document.querySelector(".typing");
const view = document.querySelector(".chat-app");
let height = window.innerHeight; 
view.style.height = height + "px";

button.addEventListener("click", (e)=>{

    if(handle.value !== "" && message.value !== ""){
        chatOutput.insertAdjacentHTML("beforeend", `
        <div class="own">
        <div class="message-container">
            <div>
                <p class="message">${message.value}</p>
            </div>
          </div>
      </div>
        `);

    socket.emit("chat", {
        handle: handle.value,
        message: message.value
    });
    }else{
        if(handle.value === ""){
            alert("Please enter your name");
        }
        if(message.value === ""){
            alert("Please type a message first");
        }
    }
});

socket.on("chat", (data)=>{
    chatOutput.insertAdjacentHTML("beforeend",`
    <div class="message-container">
    <div>
        <p class="handle">${data.handle}: </p>
    </div>
    <div>
        <p class="message">${data.message}</p>
    </div>
    </div>
    `); 
    typing.innerHTML = `<p></p>`; 
})

message.addEventListener("keypress", (e)=>{
    socket.emit("typing", {handle: handle.value});
});

socket.on("typing", (data)=>{
    typing.innerHTML = `<p>${data.handle} is typing....</p>`;
})