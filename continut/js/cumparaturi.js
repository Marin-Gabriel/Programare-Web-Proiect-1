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
    
    //window.localStorage.setItem(p1.nume,p1.cantitate);
    //document.getElementById("Test").innerHTML=p1.returnNume();
    AfiseazaLista();
}

function AfiseazaLista()
{/*
    var str="<table><tr><th>Nr</th><th>Nume Produs</th><th>Cantitate</th></tr>"

    for ( var i = 0, len = localStorage.length; i < len; ++i ) {


      //console.log(localStorage.key(i));
      //console.log( localStorage.getItem( localStorage.key( i )));
      if(i==0)
      {
        str+="Nr Nume Produs Cantitate <br> ";
      }
      else
      {
        str+=i.toString()+" "+localStorage.key(i)+" "+localStorage.getItem( localStorage.key( i ))+ "<br> "
      }
      

      str+="<tr><td>"+(i+1).toString()+"</td><td>"+localStorage.key(i)+"</td><td>"+localStorage.getItem( localStorage.key( i ))+"</td></tr>"

    }
    str+="</table>"
    document.getElementById("Test").innerHTML=str;
    */
   var str="<table><tr><th>Nr</th><th>Nume Produs</th><th>Cantitate</th></tr>"

    var aux;

    for ( var i = 0, len = localStorage.length; i < len; ++i ) 
    {
        aux=JSON.parse(localStorage.getItem( localStorage.key( i)));
        //str+=aux.id+" "+aux.NumeItem+" "+aux.CantitateItem+ "<br> "
        str+="<tr><td>"+aux.id+"</td><td>"+aux.nume+"</td><td>"+aux.cantitate+"</td></tr>"
    }
    str+="</table>";
    document.getElementById("Test").innerHTML=str;
}