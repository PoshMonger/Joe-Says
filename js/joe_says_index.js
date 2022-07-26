
(()=>{



let computer_sequence = [];
let player_sequence = [];
let on;
let strict_mode = false;
let turn_interval;
let turn;
let computer_turn = false;
let player_turn = false;
let flash = 0;
let win;
let playing = false;
let light_mode = true;
let dark_mode = false;


const top_right = document.getElementById('top_right');
const top_left = document.getElementById('top_left');
const bottom_left = document.getElementById('bottom_left');
const bottom_right = document.getElementById('bottom_right');
const simon_board = document.getElementById('simon_board');
const body = document.querySelector('body')

function applycolor(){
    if(light_mode == true){

        body.style.backgroundColor='rgb(162, 177, 179)'
        top_right.style.backgroundColor = 'rgb(179, 144, 123)'
        top_left.style.backgroundColor ="rgb(166, 214, 144)"
        bottom_right.style.backgroundColor ="blue"
        bottom_left.style.backgroundColor ="rgb(135, 97, 156)"
    }
    if(dark_mode == true){
        body.style.backgroundColor='rgb(44, 42, 42)'
        top_right.style.backgroundColor = 'rgb(115, 59, 133)'
        top_left.style.backgroundColor ="rgb(44, 108, 160)"
        bottom_right.style.backgroundColor ="rgb(146, 79, 74)"
        bottom_left.style.backgroundColor ="rgb(54, 162, 177)"

    }

}

function lightmode(){

    dark_mode = false
    light_mode = true
    applycolor();
}

function darkmode(){
light_mode = false
    dark_mode = true
    applycolor();
}

applycolor()

const start_button = document.getElementById('start_button');
const strict_button = document.getElementById('strict_mode');
const on_button = document.getElementById('on_button');
const turn_counter = document.getElementById('turn_counter')






start_button.addEventListener('click', (event) => {
    if (playing == true){
        alert("You have already started. Try Guessing the sequence or Turn the game off and on again to restart.")
    }
    if (on & playing == false) {
        play()
        playing = true;
    }
   

})

function play() {
if (playing == true){
    alert("You have already started. Try Guessing the sequence or Turn the game off and on again to restart.")
}
    if(playing != true){
    win = false;
    computer_sequence = [];
    player_sequence = [];
    const flashes = ["top_right", "top_left", "bottom_left", "bottom_right"]

    for (i = 0; i < 20; i++) {
        const index = Math.floor(Math.random() * 4)
        computer_sequence.push(flashes[index])

    }

   
    computer_turn = true;

    turn = 1
    flash = 0
    turn_interval = setInterval(gameturn, 1000)

    }
}

function gameturn() {
if(on){
player_turn=false;
    turn_counter.style.color ="chartreuse";
    turn_counter.innerHTML = turn;

    if (flash == turn) {
        clearInterval(turn_interval);
        computer_turn = false;
        clearColor();
        on = true;
        player_turn = true;

    }

    if (computer_turn) {
        clearColor();
        setTimeout(() => {

            if (computer_sequence[flash] == 'top_right') {
                top_right_input();
            }
            if (computer_sequence[flash] == 'top_left') {
                top_left_input();
            }

            if (computer_sequence[flash] == 'bottom_left') {
                bottom_left_input();
            }

            if (computer_sequence[flash] == 'bottom_right') {
                bottom_right_input();
            }
            flash++;

        }, 600)
    }


} 



}

function clearColor() {

    if(dark_mode){
        top_right.style.backgroundColor = 'rgb(115, 59, 133)'
        top_left.style.backgroundColor ="rgb(44, 108, 160)"
        bottom_right.style.backgroundColor ="rgb(146, 79, 74)"
        bottom_left.style.backgroundColor ="rgb(54, 162, 177)"
    }
    if(light_mode){

        top_right.style.backgroundColor = 'rgb(179, 144, 123)'
        top_left.style.backgroundColor ="rgb(166, 214, 144)"
        bottom_right.style.backgroundColor ="blue"
        bottom_left.style.backgroundColor ="rgb(135, 97, 156)"
    }
    
}

strict_button.addEventListener('click', (event) => {

    if (strict_button.checked == true) {
        strict_mode = true

    }
    else {
        strict_mode = false
    }


})


on_button.addEventListener('click', (event) => {

    if (on_button.checked == true) {

        on = true
        turn_counter.innerHTML = "-"
    }
    else {
        on = false;
        turn_counter.innerHTML = ""
        playing = false;
        turn=1;
        flash=0;
        player_sequence=[];
        computer_sequence=[];

    }


})


top_right.addEventListener('click', (event) => {
    if (on & player_turn) {
        player_sequence.push('top_right')
        top_right_input()
        check();
    }



})

top_left.addEventListener('click', (event) => {
    if (on & player_turn) {
        player_sequence.push('top_left')
        top_left_input()
        check();
    }

})

bottom_left.addEventListener('click', (event) => {
    if (on & player_turn) {
        player_sequence.push('bottom_left')
        bottom_left_input()
        check();
    }

})
bottom_right.addEventListener('click', (event) => {
    if (on & player_turn) {
        player_sequence.push('bottom_right')
        bottom_right_input()
        check();
    }


})


function check() {

/*Lose Condition Strict Mode */

    if(player_sequence[player_sequence.length-1] != computer_sequence[player_sequence.length-1] & strict_mode){

game_over();


    }
/*Lose Condition Normal Mode */
if(player_sequence[player_sequence.length-1] != computer_sequence[player_sequence.length-1] & strict_mode == false){

    wrong_try_again()
}



    /*Win Conditions */
    if (player_sequence.length == 20 & player_sequence[turn-1] == computer_sequence[turn-1]) {

        win = true;
        win_flash();
    }

         console.log(player_sequence)

/* Correct input but NO WIN YET */

    if (turn == player_sequence.length & player_sequence[turn - 1] == computer_sequence[turn - 1] & win != true) {
        turn++;
        player_sequence = [];
        computer_turn = true;
        flash = 0;
        turn_counter.innerHTML = turn;
        turn_interval = setInterval(gameturn, 800);
    }

}

function wrong_try_again(){

   
setTimeout(() => {
 
    bottom_left_input();
    bottom_right_input();
}, 600);

setTimeout(() => {
 
  
    top_right_input();
    top_left_input();
}, 1200);
  
   setTimeout(() => {

 
   }, 2000); 
    player_turn = false;
    turn_counter.style.color ="red";
    turn_counter.innerHTML ="X";
    clearInterval(turn_interval)
player_sequence =[];
   
  

    setTimeout(()=>{
        computer_turn=true
        flash=0;
        turn_interval = setInterval(gameturn, 800);
       

    },3000)
   
}

function game_over(){
    
setTimeout(() => {
    top_right_input();
    top_left_input();
    bottom_left_input();
    bottom_right_input();
}, 600);

setTimeout(() => {
    bottom_left_input();
    bottom_right_input();
  
    top_right_input();
    top_left_input();
}, 1200);
setTimeout(() => {
    bottom_left_input();
    bottom_right_input();
  
    top_right_input();
    top_left_input();
}, 1800);
player_turn = false;
win = false;
turn_counter.style.color ="red";
turn_counter.innerHTML ="X";
playing = false;
clearInterval(turn_interval)
setTimeout(() => {
    turn_counter.style.color ="chartreuse";
    turn_counter.innerHTML ="-";
}, 3500);
}

function win_flash() {
    console.log('won')

    turn_counter.innerHTML = "WIN!"

    for (i = 0; i < 8; i++) {
        clearColor();
        setTimeout(() => {
            setTimeout(() => {
                top_right_input();
            }, 400)
            setTimeout(() => {
                top_left_input();
       
            }, 600)
            setTimeout(() => {
                bottom_left_input()
            
            }, 800)
            setTimeout(() => {
                bottom_right_input();
            
            }, 1000)
        }, 800)

        setTimeout(() => {
            setTimeout(() => {
                top_right_input();
            }, 400)
            setTimeout(() => {
                top_left_input();
       
            }, 600)
            setTimeout(() => {
                bottom_left_input()
            
            }, 800)
            setTimeout(() => {
                bottom_right_input();
            
            }, 1000)
        }, 3000)

    }


    clearInterval(turn_interval)
setTimeout(()=>{
    turn_counter.innerHTML ="-"
},5000)


}

function top_right_input() {
    if(dark_mode){

        top_right.style.backgroundColor = "rgb(133, 107, 141)";
        let audio = document.getElementById("clip4");
        audio.play();
    
        setTimeout(clearColor, 200)
    }
if(light_mode){

    top_right.style.backgroundColor = "rgb(212, 195, 184)";
    let audio = document.getElementById("clip4");
    audio.play();

    setTimeout(clearColor, 200)
}
   
}
function top_left_input() {
    if(dark_mode){

        top_left.style.backgroundColor = "rgb(126, 162, 190)";
        let audio = document.getElementById("clip3");
        audio.play();
    
        setTimeout(clearColor, 200)
    }
    if(light_mode){

        top_left.style.backgroundColor = "rgb(207, 221, 200)";
    let audio = document.getElementById("clip3");
    audio.play();

    setTimeout(clearColor, 200)
    }
}
function bottom_left_input() {
    if(dark_mode){

        bottom_left.style.backgroundColor = "rgb(159, 203, 209)";
        let audio = document.getElementById("clip2");
        audio.play();
    
        setTimeout(clearColor, 200)
    }
   if(light_mode){


    bottom_left.style.backgroundColor = "rgb(160, 148, 167)";
    let audio = document.getElementById("clip2");
    audio.play();

    setTimeout(clearColor, 200)
   }
}

function bottom_right_input() {
    if(dark_mode){
        bottom_right.style.backgroundColor = "  rgb(170, 137, 135)";
        let audio = document.getElementById("clip1");
        audio.play();
    
        setTimeout(clearColor, 200)
      
    }
    if(light_mode){
        bottom_right.style.backgroundColor = "lightblue";
        let audio = document.getElementById("clip1");
        audio.play();
    
        setTimeout(clearColor, 200)
        
    }

   
}


})()
