let gameSeq = [];  //game sequence
let userSeq = [];  //user sequence

let btns = ["light-pink", "orange", "violet", "light-blue"];

let started = false;  //means game is not start yet
let level = 0;  //game is at level 0
let highScore = 0; //highScore is initialise to 0

let h2 = document.querySelector('h2');  //heading 2 is selected
let h3 = document.querySelector('h3');  //heading 3 is selected
h3.innerText = `High Score: ${highScore}`;  //text is added to h3 heading

document.addEventListener('keypress' , function(){
    if(started == false){
        console.log("Game is started");
        started = true;  //means if any key is pressed the game will start

        levelUp();  //levelUp function executed after starting the game
    }
})

function gameFlash(btn){
    btn.classList.add('gameflash');  //flash class is added to btn
    setTimeout(function(){
        btn.classList.remove('gameflash');
    },400);
}

function userFlash(btn){
    btn.classList.add('userflash');  //flash class is added to btn
    setTimeout(function(){
        btn.classList.remove('userflash');
    },250);
}

function levelUp(){
    userSeq = [];  //userSeq will again empty
    level++;
    h2.innerText = `Level ${level}`;  //the text is inserted into h2 heading replacing previous one

    //random button choose
    let randIdx = Math.floor(Math.random() *3);
    let randColor = btns[randIdx];  //random color choose from btns
    let randBtn = document.querySelector(`.${randColor}`);  //that random color class is excessed
    gameSeq.push(randColor);  //it will insert the random color generated to gameSeq
    console.log(gameSeq);  //print the gameSeq
    gameFlash(randBtn); //btnFlash function is called by passing the randomly chhosed color class
}

function checkAns(idx){
    if(gameSeq[idx] === userSeq[idx]){
        if(userSeq.length == gameSeq.length){  
            setTimeout(levelUp(),1000);
        }
    }else{
        h2.innerHTML = `Game Over! Your score was ${level}.<br>Press any key to restart the game.`;

        //if the current level is higher than highScore
        if(highScore<level){
            highScore = level;
            h3.innerText = `High Score: ${highScore}`;
        }

        document.querySelector('body').style.backgroundColor = "red";  //it will change bg color of body to red when game is over
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor = "aquamarine";
        },250);  //it will change bg color back to white after 0.25 sec
        reset();  //game will reset
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);  //userFlash function is revoked with btn argument

    userColor = btn.getAttribute('id');  //it will get the id of the btn
    userSeq.push(userColor);  //insert the userColor to the userSeq

    checkAns(userSeq.length-1);  //checkAns function is revoked with argument of last index of userSeq
}

let allBtns = document.querySelectorAll('.btn');  //all the buttons with btn class is accessed

for(btn of allBtns){
    btn.addEventListener('click',btnPress);  //on clicking the button btnpress() function is revoked
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

