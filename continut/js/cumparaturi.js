var myWorker = new Worker('js/worker.js');

myWorker.postMessage(localStorage.length);

function trimiteMesaj()
{
    myWorker.postMessage(localStorage.length);
}

var timerWorker=setInterval(trimiteMesaj,1000);

function Produs (nume,cantitate,id)
{
    this.nume=nume;
    this.cantitate=cantitate;
    this.id=id;
    this.returnNume=function(){
        return this.nume;
    };
    this.returnCantitate=function(){
        return this.cantitate;
    };
}

function Adauga()
{
    var NumeItem=document.getElementById("numeProdus").value;
    var CantitateItem=document.getElementById("cantitate").value;

    var p1=new Produs(NumeItem,CantitateItem,localStorage.length);
    window.localStorage.setItem(localStorage.length,JSON.stringify(p1));
 
}

myWorker.onmessage=function(e)
{
    if(e.data==true)
    {
        AfiseazaLista();
    }
}

function AfiseazaLista()
{
    var str="<table><tr><th>Nr</th><th>Nume Produs</th><th>Cantitate</th></tr>"

    var aux;

    for ( var i = 0, len = localStorage.length; i < len; ++i ) 
    {
        aux=JSON.parse(localStorage.getItem( localStorage.key( i)));
        str+="<tr><td>"+aux.id+"</td><td>"+aux.nume+"</td><td>"+aux.cantitate+"</td></tr>"
    }
    str+="</table>";
    document.getElementById("Test").innerHTML=str;
}