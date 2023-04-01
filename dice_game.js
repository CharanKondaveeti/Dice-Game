'use strict'
const game_box = document.querySelector('.game--space');
const loadingPage = document.querySelector('.loading--page');
const activeGame = document.querySelector('.active--game');
const gameTittle = document.querySelector('.game--tittle');
const okButton = document.querySelector('.submit--button');
const twoDice = document.querySelector('.two--dices');
const dice_1 = document.querySelector('.dice1');
const dice_2 = document.querySelector('.dice2');
const dice1_wrapper = document.querySelector('.dice1Wrapper');
const dice2_wrapper = document.querySelector('.dice2Wrapper');
const instructions = document.querySelector('.instructions');
const playeNameEl = document.querySelector('.playername');
const userplayers = document.querySelector('.userplayer--heading');
const cpuPlayer = document.querySelector('.cpu_player--heading');
const nameInput = document.querySelector('.nameInput');
const grayBG = document.querySelector('.gary--background');
const nameInputSection = document.querySelector('.name--input--section');
const players_score = document.querySelectorAll('.player--score');

// restart items
const restart_confirmation = document.querySelector('.restart--confirmation');
const restart_s = document.querySelector('.restart--yes');
const restart_no = document.querySelector('.restart--no');

const history_data = document.querySelectorAll('.history--data');
const data = document.querySelector('.data');


// player winner inidcator 
const indicator = document.querySelector('.indicator');

// player board dices
const player1_dice = document.querySelector('.player1_dice');
const player2_dice = document.querySelector('.player2_dice');

// players scores
const player1_Score = document.querySelector('player_1_score');
const player2_Score = document.querySelector('player_2_score');

// buttons 
const playButton = document.querySelector('.play--button');
const closeButton = document.querySelector('.close--button');
const rollButton = document.querySelector('.roll--button');
const restartButton = document.querySelector('.restart--button');
const historyButton = document.querySelector('.history--button');

// footer indication
const footerRootator = document.querySelector('.rotator');
const footerIndic = document.querySelector('.footer--indications');

// bet things
const betrangeInput = document.querySelector('#bet--amount-input');
const betIndic = document.querySelector('.amout--indicator');

// player cash
const user_cashEL = document.querySelector('.user--cash--available')

// history elms

const heading_body = document.querySelector('.heading--body');
const section_history = document.querySelector('.history');
const headings_table = document.querySelector('.headings');
const history_closeButton = document.querySelector('.history--closeButton');

// const, let
let rangeselected = false;
let betAmount;
let user_cash = 4000;
user_cashEL.textContent = user_cash;
let sno = 0;
let checkprofit;
let player_userName;
let who_won;
let footeRtotate_counter = 0;


// bet range indicator
betrangeInput.oninput = (() => {
    betIndic.textContent = betrangeInput.value;
    betAmount = Number(betrangeInput.value);
    // console.log(betrangeInput.value);
})

// when we click play button
playButton.addEventListener('click', function (e) {

    // translate two dice and then remove elements
    dice1_wrapper.style.transform = 'translateY(-300px) rotateX(20deg) rotateY(100deg)';
    dice2_wrapper.style.transform = 'translateY(-300px) rotateX(50deg) rotateY(270deg)';

    // fade out game tittle and play button
    gameTittle.style.animation = 'removeGameTittle 0.3s linear forwards';
    playButton.style.transform = 'translateY(150px)';

    // hiden loading page
    setTimeout(() => {
        loadingPage.style.display = 'none';
    }, 500);

    // display active page
    setTimeout(() => {
        activeGame.style.display = 'grid';

        setTimeout(() => {
            instructions.style.display = 'block';
            grayBG.style.display = 'block';

        }, 500);

    }, 600);

});

// when we click close button
closeButton.addEventListener('click', function (e) {
    grayBG.style.display = 'block';
    instructions.style.display = 'none';
    nameInputSection.style.display = 'flex';
});

okButton.addEventListener('click', function () {
    player_userName = nameInput.value;
    userplayers.textContent = player_userName;
    cpuPlayer.textContent = 'CPU';
    nameInputSection.style.display = 'none';
    grayBG.style.display = 'none';
    indicator.textContent = `welcome ${player_userName}`;

    players_score.forEach((el) => {
        el.textContent = '0';
        indicator.textContent = 'indicator';
    });
});


// when we click roll button
rollButton.addEventListener('click', function (e) {

    // roll button triggers when bet range dragged
    if (rangeselected && user_cash > 100 && user_cash > betAmount && Number.isInteger(betAmount)) {
        //players dice animation
        player1_dice.style.animation = 'rotateDice 3s linear ';
        player2_dice.style.animation = 'rotateDice 3s linear ';

        // generate a random num 1 to 6
        const number_for_player1 = Math.floor(Math.random() * 6 + 1);
        const number_for_player2 = Math.floor(Math.random() * 6 + 1);

        footerIndic.style.transform = 'rotateX(0deg)';
        footeRtotate_counter = footeRtotate_counter + 1;
        indicator.textContent = 'Who wins ?'

        setTimeout(() => {
            rollPlayer_dice(player1_dice, number_for_player1);
            rollPlayer_dice(player2_dice, number_for_player2);
            player1_dice.style.animation = '0';
            player2_dice.style.animation = '0';


            setTimeout(() => {
                // player winner indicator
                if (number_for_player1 > number_for_player2) {
                    indicator.textContent = 'player took it'
                    user_cash = user_cash + betAmount + betAmount;
                    user_cashEL.textContent = user_cash;
                    console.log(user_cash);
                    who_won = player_userName;
                    checkprofit = 'profit'
                }
                else if (number_for_player1 < number_for_player2) {
                    indicator.textContent = 'cpu this time'
                    who_won = 'cpu';
                    checkprofit = 'loss'
                }
                else if (number_for_player1 === number_for_player2) {
                    indicator.textContent = 'actually none'
                    user_cash = user_cash + betAmount;
                    console.log(user_cash);
                    user_cashEL.textContent = user_cash;
                    who_won = 'draw';
                    checkprofit = '-'
                }
                footerIndic.style.transform = 'rotateX(0deg)';
                footeRtotate_counter = footeRtotate_counter - 1;


                const html = `<tr class="history--data">
                <td>${sno}</td>
                <td>${number_for_player1}</td>
                <td>${number_for_player2}</td>
                <td>${betAmount}</td>
                <td>${who_won}</td>
                <td>${checkprofit}</td>
                <td>${user_cash}</td>
                </tr>`;
                heading_body.insertAdjacentHTML('beforeend', html);

            }, 2000);
        }, 3050);

        user_cash = user_cash - betAmount;
        user_cashEL.textContent = user_cash;

        console.log(betAmount);

        // set rangeSelected to false to again ask
        rangeselected = false

        // collecting all the history
        sno = sno + 1;
    }
    else {
        footerIndic.style.transform = 'rotateX(180deg)';
    }
});

historyButton.addEventListener('click', function () {
    section_history.style.display = 'flex';
    grayBG.style.display = 'block';
});

history_closeButton.addEventListener('click', function () {
    section_history.style.display = 'none';
    grayBG.style.display = 'none';
})

// footer rotator

footerRootator.addEventListener('click', function () {
    if (footeRtotate_counter % 2 === 0) {
        footerIndic.style.transform = 'rotateX(180deg)';
    }
    else {
        footerIndic.style.transform = 'rotateX(0deg)';
    }
    footeRtotate_counter = footeRtotate_counter + 1;
});

// restat things
restartButton.addEventListener('click', function () {
    restart_confirmation.style.display = 'flex';
    grayBG.style.display = 'block';
})

restart_s.addEventListener('click', function () {
    user_cash = 4000;
    user_cashEL.textContent = user_cash;

    restart_confirmation.style.display = 'none';
    grayBG.style.display = 'none';

    indicator.textContent = `welcome ${player_userName}`;



    heading_body.innerHTML = '';
})


restart_no.addEventListener('click', function () {
    restart_confirmation.style.display = 'none';
    grayBG.style.display = 'none';


})

// add event functions
function rollPlayer_dice(respPlayer, randomDice_number) {
    switch (respPlayer, randomDice_number) {
        case 1:
            respPlayer.style.transform = 'rotateX(0deg) rotateY(-180deg)';
            break;
        case 2:
            respPlayer.style.transform = 'rotateX(270deg) rotateY(-180deg)';
            break;
        case 3:
            respPlayer.style.transform = 'rotateX(360deg) rotateY(90deg)';
            break;
        case 4:
            respPlayer.style.transform = 'rotateX(180deg) rotateY(90deg)';
            break;
        case 5:
            respPlayer.style.transform = 'rotateX(90deg) rotateY(90deg)';
            break;
        case 6:
            respPlayer.style.transform = 'rotateX(0deg) rotateY(0deg)';
            break;
    }
}

// check bet made o not
betrangeInput.addEventListener('mouseup', function () {
    rangeselected = true;
});
