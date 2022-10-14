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
    //por lo que si hay un ganador y es el turno del jugador1,ha ganado el jugador 2

const showWinner = () => {
    
    if (p1Turn) {
        info.innerHTML = `${jugador2.nombre} es el ganador`;
    } else {
        info.innerHTML = `${jugador1.nombre} es el ganador`;
    }
    cells.map((cell) => {
        cell.removeEventListener("click", handleCellClick);
    })
}

//Cambio de turno

const turnSwitch = () => {
    p1Turn = !p1Turn;
    if (p1Turn) {
        info.innerHTML = `Turno de ${jugador1.nombre}`;

    } else {
        info.innerHTML = `Turno de ${jugador2.nombre}`;

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

//Handler boton New Game

const handleBtnNewGameClick = () => {
    cells.map((cell) => {
        cell.innerHTML = "";
        cell.addEventListener("click", handleCellClick);
    })
    jugador1.turnos = 3;
    jugador2.turnos = 3;
    p1Turn = true;
    info.innerHTML = `Turno de ${jugador1.nombre}`;
    if (jugador1.tipo == "CPU") {
        jugador1.putMark(cells[Math.floor(Math.random() * 9)]);
        turnSwitch();
    }
}



const handleCellClick = (clickedCellEvent) => {
    const clickedCell = clickedCellEvent.target;
    if (clickedCell.innerHTML == "") {

        //En caso de humanoVShumano

        if (jugador1.tipo == "Human" && jugador2.tipo == "Human") {
            if (p1Turn == true && jugador1.turnos > 0) {
                jugador1.putMark(clickedCell);
                turnSwitch();

            } else if (jugador2.turnos > 0) {
                jugador2.putMark(clickedCell);
                turnSwitch();
            }
        }

        //En caso humanoVScpu

        else {
            if (jugador1.tipo == "CPU") {
                jugador2.putMark(clickedCell);
                turnSwitch();
                if (!checkWinner()) {
                    setTimeout(() => {
                        let random = cpuRandom();
                        jugador1.putMark(cells[random]);
                        turnSwitch();
                        if (checkWinner()) {
                            showWinner();
                        }
                    }, 1000);
                }

            //En caso cpuVShumano

            }
            else {
                jugador1.putMark(clickedCell);
                turnSwitch();
                if (!checkWinner()) {
                    setTimeout(() => {
                        let random = cpuRandom();
                        jugador2.putMark(cells[random]);
                        turnSwitch();
                        if (checkWinner()) {
                            showWinner();
                        }
                    }, 1000);
                }
            }


        }
    }
    if (checkWinner()) {
        showWinner();
    } else {
        //Drag and drop aqui MENTIRA TAMBIEN,ESTO SEGURAMENTE SEA UN HANDLER DISTINTO
    }
}

//Código main

const p1Name = sessionStorage.getItem('p1Name');
const p2Name = sessionStorage.getItem('p2Name');
const p1Type = sessionStorage.getItem('p1Type')
const p2Type = sessionStorage.getItem('p2Type');
let jugador1 = new Player(p1Name, p1Type, "X");
let jugador2 = new Player(p2Name, p2Type, "O");
let winner = false;
let p1Turn = true;
let info = document.getElementById("infoGame");
let btn_ng = document.getElementById("btn-new-game");
let cells = Array.from(document.getElementsByClassName("cell"));
document.getElementById("player2Text").innerHTML = `Player:${jugador2.nombre} | Type:${jugador2.tipo}`;
document.getElementById("player1Text").innerHTML = `Player:${jugador1.nombre} | Type:${jugador1.tipo}`;
document.getElementById("btn-new-game").addEventListener('click', handleBtnNewGameClick);
btn_ng.click();
