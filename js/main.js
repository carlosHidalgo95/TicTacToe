class Player {
    constructor(nombre, tipo, mark) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.turnos = 3;
        this.mark = mark
    }
    putMark(cell) {
        cell.innerHTML = this.mark;
        this.turnos--;
        console.log(this.turnos);
    }
    switchMark(cell) {
        if (cell.innerHTML == this.mark) {
            cellToSwitch = cell;
            switching = true;
            switched = false;

        } else if (switching == true && cell.innerHTML == "") {
            this.putMark(cell);
            cellToSwitch.innerHTML = "";
            switching = false;
            switched = true;
            turnSwitch();
        }
    }
}

/*Comprobación combinaciones ganadoras
[0,1,2
 3,4,5,
 6,7,8]
*/

const checkWinner = () => {
    return (cells[0].innerHTML != "" && cells[0].innerHTML == cells[1].innerHTML && cells[0].innerHTML == cells[2].innerHTML) ||
        (cells[0].innerHTML != "" && cells[0].innerHTML == cells[3].innerHTML && cells[0].innerHTML == cells[6].innerHTML) ||
        (cells[0].innerHTML != "" && cells[0].innerHTML == cells[4].innerHTML && cells[0].innerHTML == cells[8].innerHTML) ||
        (cells[1].innerHTML != "" && cells[1].innerHTML == cells[4].innerHTML && cells[1].innerHTML == cells[7].innerHTML) ||
        (cells[2].innerHTML != "" && cells[2].innerHTML == cells[5].innerHTML && cells[2].innerHTML == cells[8].innerHTML) ||
        (cells[3].innerHTML != "" && cells[3].innerHTML == cells[4].innerHTML && cells[3].innerHTML == cells[5].innerHTML) ||
        (cells[6].innerHTML != "" && cells[6].innerHTML == cells[7].innerHTML && cells[6].innerHTML == cells[8].innerHTML) ||
        (cells[2].innerHTML != "" && cells[2].innerHTML == cells[4].innerHTML && cells[2].innerHTML == cells[6].innerHTML);
}

//La comprobación del ganador se realiza a la inversa porque ya se ha cambiado el turno
//por lo que si hay un ganador y es el turno de player1,ha ganado player2

const showWinner = () => {
    let nameWinner;
    if (p1Turn) {
        nameWinner=player2.nombre;
    } else {
        nameWinner=player1.nombre;
    }
    sessionStorage.setItem('winner', nameWinner);
    window.location="../pages/winner.html";
}

//Cambio de turno

const turnSwitch = () => {
    p1Turn = !p1Turn;
    if (p1Turn) {
        info.innerHTML = `Turno de ${player1.nombre}`;

    } else {
        info.innerHTML = `Turno de ${player2.nombre}`;

    }
}

//Generación número random para tirada de la CPU

const cpuRandom = () => {
    let random = Math.floor(Math.random() * 9);
    while (cells[random].innerHTML != "") {
        random = Math.floor(Math.random() * 9)
    }
    return random;
}

//CPU mueve ficha

const cpuSwitchMark = (jugador) => {
    let random = Math.floor(Math.random() * 9);
    while (cells[random].innerHTML != jugador.mark) {
        random = Math.floor(Math.random() * 9)
    }
    jugador.switchMark(cells[random]);
    while (cells[random].innerHTML != "") {
        random = Math.floor(Math.random() * 9)
    }
    jugador.switchMark(cells[random]);
    switched = false;
    console.log(switching, switched);
}

//Handler boton Restart Match

const handleBtnRestartMatchClick = () => {
    cells.map((cell) => {
        cell.innerHTML = "";
        cell.removeEventListener("click", handleCellClickSwitch)
        cell.addEventListener("click", handleCellClick);
    })
    player1.turnos = 3;
    player2.turnos = 3;
    p1Turn = true;
    info.innerHTML = `Turno de ${player1.nombre}`;
    if (player1.tipo == "CPU") {
        player1.putMark(cells[Math.floor(Math.random() * 9)]);
        turnSwitch();
    }
}

//Handler boton New Game

const handleBtnNewGame=()=>{
    window.location="../pages/settings.html"
}

/*Handler para poner fichas.Solo se comprueba el turno si los 2 jugadores son humanos,
  si uno de los 2 es cpu entonces no se usa el turno,el jugador tira y la cpu le responde */

const handleCellClick = (clickedCellEvent) => {
    const clickedCell = clickedCellEvent.target;
    if (clickedCell.innerHTML == "") {

        //En caso de humanoVShumano

        if (player1.tipo == "Human" && player2.tipo == "Human") {
            if (p1Turn == true && player1.turnos > 0) {
                player1.putMark(clickedCell);
                turnSwitch();
            } else if (p1Turn==false && player2.turnos > 0) {
                player2.putMark(clickedCell);
                turnSwitch();
            }
        }
        else {

            //En caso cpuVShumano
            if (player1.tipo == "CPU" && player2.turnos > 0) {
                player2.putMark(clickedCell);
                turnSwitch();
                if (!checkWinner() && player1.turnos > 0) {
                    let random = cpuRandom();
                    player1.putMark(cells[random]);
                    turnSwitch();
                    if (checkWinner()) {
                        showWinner();
                    }
                }
            }

            //En caso humanoVScpu

            else if (player1.turnos >= 0) {
                player1.putMark(clickedCell);
                turnSwitch();
                if (!checkWinner() && player2.turnos > 0) {
                    let random = cpuRandom();
                    player2.putMark(cells[random]);
                    turnSwitch();
                    if (checkWinner()) {
                        showWinner();
                    }
                }
            }
        }
    }

    /*Si se acaban los turnos de ambos jugadores y no hay ganador,
    el event listener se cambia por otro para mover fichas.
    Si el jugador 1 es la CPU,debe mover ficha primero*/

    if (player1.turnos <= 0 && player2.turnos <= 0 && !checkWinner()) {
        cells.map((cell) => {
            cell.removeEventListener("click", handleCellClick);
            cell.addEventListener('click', handleCellClickSwitch);
        })
        if (player1.tipo == "CPU") {
            cpuSwitchMark(player1);
        }
    }
    if (checkWinner()) {
        showWinner();
    }
}

//Handler para mover fichas

const handleCellClickSwitch = (clickedCellEvent) => {
    const clickedCell = clickedCellEvent.target;

    //Caso humanVShuman

    if (player1.tipo == "Human" && player2.tipo == "Human") {
        if (p1Turn) {
            player1.switchMark(clickedCell);
        } else {
            player2.switchMark(clickedCell);
        }
    } else {
        console.log('wtf1');

        //Caso cpuVShuman

        if (player1.tipo == 'CPU') {
            player2.switchMark(clickedCell);
            if (!switching && switched && !checkWinner()) {
                cpuSwitchMark(player1);
            }

            //Caso humanVScpu

        } else {
            player1.switchMark(clickedCell);
            if (!switching && switched && !checkWinner()) {
                cpuSwitchMark(player2);
            }
        }
    }
    if (checkWinner()) {
        showWinner();
    }
}

//Código main

const p1Name = sessionStorage.getItem('p1Name');
const p2Name = sessionStorage.getItem('p2Name');
const p1Type = sessionStorage.getItem('p1Type')
const p2Type = sessionStorage.getItem('p2Type');
let player1 = new Player(p1Name, p1Type, "X");
let player2 = new Player(p2Name, p2Type, "O");
let winner = false;
let p1Turn = true;
let switching = false;
let switched = false
let cellToSwitch;
let info = document.getElementById("infoGame");
let btn_ng = document.getElementById("btn-restart-match");
let cells = Array.from(document.getElementsByClassName("cell"));
document.getElementById("player2Text").innerHTML = `Player:${player2.nombre} | Type:${player2.tipo}`;
document.getElementById("player1Text").innerHTML = `Player:${player1.nombre} | Type:${player1.tipo}`;
document.getElementById("btn-restart-match").addEventListener('click', handleBtnRestartMatchClick);
document.getElementById("btn-new-game").addEventListener("click",handleBtnNewGame)
btn_ng.click();
