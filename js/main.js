class Player {
    constructor(nombre, tipo) {
        this.nombre = nombre;
        this.tipo = tipo;
        let turnos = 0;

    }
}
//Funciones

const checkWinner = () => {
        return (cells[0].innerHTML!=""&&cells[0].innerHTML==cells[1].innerHTML&&cells[0].innerHTML==cells[2].innerHTML) ||
        (cells[0].innerHTML!=""&&cells[0].innerHTML == cells[3].innerHTML && cells[0].innerHTML == cells[6].innerHTML) ||
        (cells[0].innerHTML!=""&&cells[0].innerHTML == cells[4].innerHTML && cells[0].innerHTML == cells[8].innerHTML) ||
        (cells[1].innerHTML!=""&&cells[1].innerHTML == cells[4].innerHTML && cells[1].innerHTML == cells[7].innerHTML) ||
        (cells[2].innerHTML!=""&&cells[2].innerHTML == cells[5].innerHTML && cells[2].innerHTML == cells[8].innerHTML) ||
        (cells[3].innerHTML!=""&&cells[3].innerHTML == cells[4].innerHTML && cells[3].innerHTML == cells[5].innerHTML) ||
        (cells[6].innerHTML!=""&&cells[6].innerHTML == cells[7].innerHTML && cells[6].innerHTML == cells[8].innerHTML) ||
        (cells[2].innerHTML!=""&&cells[2].innerHTML == cells[4].innerHTML && cells[2].innerHTML == cells[6].innerHTML);
}
const turnSwitch=()=>{
p1Turn=!p1Turn;
if (p1Turn) {
    info.innerHTML = `Turno de ${jugador1.nombre}`;

}else{
    info.innerHTML = `Turno de ${jugador2.nombre}`;

}
}
const handleBtnNewGameClick = () => {
    cells.map((cell)=> {
        cell.innerHTML="";
        cell.addEventListener("click",handleCellClick);
    })
}

const handleCellClick = (clickedCellEvent) => {
    const clickedCell = clickedCellEvent.target;
    if (p1Turn == true) {
        clickedCell.innerHTML = "X"

    } else {
        clickedCell.innerHTML = "O"
    }
    console.log(checkWinner());
    if (checkWinner()) {
        if (p1Turn) {            
            info.innerHTML=`${jugador1.nombre} es el ganador`
        }else{
            info.innerHTML=`${jugador2.nombre} es el ganador`

        }
        cells.map((cell)=> {
            cell.removeEventListener("click",handleCellClick);
        })
    }else{
        turnSwitch();
    }
}

let jugador1 = new Player("Fulano", "Humano");
let jugador2 = new Player("Retrasado", "Humano");
let winner = false;
let p1Turn = true;
let info= document.getElementById("infoGame");
let btn_ng=document.getElementById("btn-new-game");
document.getElementById("player2Text").innerHTML = `Player:${jugador2.nombre} | Type:${jugador2.tipo}`;
document.getElementById("player1Text").innerHTML = `Player:${jugador1.nombre} | Type:${jugador1.tipo}`;
document.getElementById("btn-new-game").addEventListener('click', handleBtnNewGameClick);
let cells = Array.from(document.getElementsByClassName("cell"));
btn_ng.click();
