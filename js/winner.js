const handleBtnNewGame=()=>{
    window.location="../pages/settings.html"
}
const handleBtnHome=()=>{
    window.location="../index.html"
}

const winnerName = sessionStorage.getItem('winner');
const titleName=document.getElementById("name");
titleName.innerHTML=winnerName;
