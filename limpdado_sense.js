//sensibilidade (esqueci o termo correto)
function sense(event, pro){
    if(event.keyCode == 13){ // 13 equivale a ENTER
        pro == 5?simular():document.getElementsByTagName("input")[pro].focus()
    }
}

//limpeza
function limpar(){
    for(let loop = 0; loop < 5; loop++){ //inputs tipo number
        document.getElementsByTagName("input")[loop].value = ""
    }

    // variações
    document.getElementById("varpre").value = 0
    document.getElementById("vardiv").value = 0

    // inputs tipo radio
    document.getElementsByName("compra")[0].checked = true
    document.getElementsByName("output")[0].checked = true

    //saida
    document.getElementById("resultados").innerHTML = ""
    document.getElementById("resultados").style.display = "none"
}
