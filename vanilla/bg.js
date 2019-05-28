const body = document.querySelector("body");

const IMG_NUM = 3;
const BG_CL = "bgImage";

function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUM);
    return number;
}

function paintImage(number){
    const image = new Image();
    image.src = `images/${number + 1}.jpg`;
    image.classList.add(BG_CL);
    body.append(image);
}
function init(){
    const ranNum = genRandom();
    paintImage(ranNum);
}

init();