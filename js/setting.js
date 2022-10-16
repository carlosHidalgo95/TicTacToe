let p1Type="Human";
let p2Type="Human";
let p1name,p2name;
const showDropDown1=(item)=>{
    document.getElementById("dropdownMenu1").innerHTML = item.innerHTML;
    if (item.innerHTML=="Human") {
        p1Type="Human";
    }else{
        p1Type="CPU";
    }
}
const showDropDown2=(item)=>{
    document.getElementById("dropdownMenu2").innerHTML = item.innerHTML;
    if (item.innerHTML=="Human") {
        p2Type="Human";
    }else{
        p2Type="CPU";
    }
}
const btnPlay=()=>{
    p1name= document.getElementById("input-p1").value;
    p2name= document.getElementById("input-p2").value;
    if (p1name==""||p2name=="") {
        document.getElementById("alert").innerHTML="Both players need a name"
    }else if(p1Type=="CPU"&&p2Type=="CPU"){
        document.getElementById("alert").innerHTML="Both players cannot be CPU"
    }
    else{
        sessionStorage.setItem('p1Name', p1name);
        sessionStorage.setItem('p2Name', p2name);
        sessionStorage.setItem('p1Type', p1Type);
        sessionStorage.setItem('p2Type',p2Type);
        window.location="../pages/tictactoe.html"
    }

}