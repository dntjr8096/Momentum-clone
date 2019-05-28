const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greetings = document.querySelector(".js-greetings");

const SHOWING_CL = "showing";
const USER_LS = "currentUser";


function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreetings(currentValue);
    saveName(currentValue);
}

function askName(){
    form.classList.add(SHOWING_CL);
    form.addEventListener("submit", handleSubmit);
}

function paintGreetings(text){
    form.classList.remove(SHOWING_CL);
    greetings.classList.add(SHOWING_CL);
    greetings.innerText = `Hello ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);

    if(currentUser === null){
        askName();
    }else{
        paintGreetings(currentUser);    
    }
}

function init(){
    loadName();
}

init();