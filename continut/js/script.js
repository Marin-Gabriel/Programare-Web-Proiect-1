//var timerData=setInterval(DataShow,1000);

var ctx;
function DataShow()
{
    var rez=new Date()
    var y=rez.getFullYear();
    var h=rez.getHours();
    var m=rez.getMinutes();
    var s=rez.getSeconds();

    var final="Acum este: Anul "+y.toString()+" Ora "+h.toString()+" Minutul "+m.toString()+" Secunda "+s.toString();

    document.getElementById("Data").innerHTML=final;
}

function AdresShow()
{
  var Adresa=window.location.href;
  return "<br>Adresa este: "+Adresa;
}

/*function LocationShow()
{
    var locatie=navigator.geolocation;
    locatie=locatie.coords.latitude;
    return locatie;
}
*/
function BrowserShow()
{
    var BName=navigator.appCodeName;
    var BVersion=navigator.appVersion;
    return "<br>Browserul folosit: "+BName+"<br>Versiunea: "+BVersion;
}

function SOShow()
{
    var SO=navigator.platform;
    return "<br>Platforma: "+SO;
}

function Extrage()
{
    var extrase=new Array;
    var introduse=new Array;
    var extras;
    for(i=0;i<8;i++)
    {
        extras=Math.floor(Math.random() * 255);
        extrase.push(extras);
    }
    var sir="Numerele extrase sunt: ";
    for(i=0;i<8;i++)
    {
        sir+=extrase[i].toString(16)+" ";
    }
    document.getElementById("aux").innerHTML=sir;

    for(i=0;i<8;i++)
    {
        introduse[i]=document.getElementById("loto"+i.toString()).value;
        introduse[i]=parseInt(introduse[i]);
        introduse[i]=introduse[i].toString(16);
    }
    var nimerite=0;
    for(i=0;i<8;i++)
    {
        for(j=0;j<8;j++)
        {
            if(extrase[i]==introduse[j])
            {
                nimerite++;
            }
        }
        
    }
    var rez="Ai nimerit "+nimerite.toString()+" numere."
    document.getElementById("aux2").innerHTML=rez;
}

function initializeazaCTX()
{
    ctx=document.getElementById("myCanvas");
    ctx = getContext('2d');
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(150,500);
    ctx.lineTo(200,500);
    ctx.lineTo(200,600);
    ctx.stroke();
}

function initCTX()
{

var canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.lineWidth = "3";
ctx.strokeStyle = "green";
ctx.beginPath();
}

function P1()
{
    DataShow();
    document.getElementById("Adresa").innerHTML=AdresShow();
    //document.getElementById("Locatie").innerHTML=LocationShow();
    document.getElementById("InfoBrowser").innerHTML=BrowserShow();
    document.getElementById("InfoSO").innerHTML=SOShow();
    //document.getElementById("aux").innerHTML=Extrage();
    initCTX();   
}

var contor=0;
var x=0;
var y=0;
/*
function TestDesen()
{
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#FF0000";
//ctx.fillRect(81, 20, 150, 75);
ctx.lineWidth = "3";
 ctx.strokeStyle = "green";
ctx.beginPath();
ctx.moveTo(0,0);
ctx.lineTo(200,150);
ctx.lineTo(200,250);
ctx.stroke();
ctx.closePath();
ctx.fill();
}
*/
function Deseneaza()
{ 

    if(contor>document.getElementById("nrPuncte").value)
    {
        ctx.fillStyle = document.getElementById("Interior").value.toString();
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
    else{
        ctx.strokeStyle = document.getElementById("Contur").value.toString();
        ctx.lineTo(x,y);
        ctx.stroke();
        }
}

function Memoreaza(event)
{

    //x=event.clientX-8;
    //y=event.clientY-400;
    x=event.clientX-document.getElementById("myCanvas").offsetLeft;
    y=event.clientY-document.getElementById("myCanvas").offsetHeight-36;

    
    document.getElementById("aux2").innerHTML=x.toString()+" "+y.toString()+" "+contor.toString()+" "+document.getElementById("myCanvas").offsetHeight;
    
    if(contor==0)
    {
        ctx.moveTo(x,y);
        contor=contor+2;
    }
    else
    {
        Deseneaza();
        contor=contor+1;
    }
    
}


function schimbaContinut(resursa,jsFisier,jsFunctie)
{
var xmlhttp;
if(window.XMLHttpRequest){
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=
    function(){ 
        if(xmlhttp.readyState==4&& xmlhttp.status==200)
        {
            document.getElementById("continut").innerHTML=xmlhttp.responseText;
            if (jsFisier) {
                var elementScript = document.createElement('script');
                elementScript.onload = function () {
                    console.log("hello");
                    if (jsFunctie) {
                        window[jsFunctie]();
                    }
                };
                elementScript.src = jsFisier;
                document.head.appendChild(elementScript);
            } else {
                if (jsFunctie) {
                    window[jsFunctie]();
                }
            }
        }
        
    }
    var aux=resursa+".html";
    xmlhttp.open("GET",aux,true);
    xmlhttp.send();
}
}


function loadJSONDoc() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          
        Verifica(this);
      }
    };
    xmlhttp.open("GET", "resurse/utilizatori.json", true);
    xmlhttp.send();
  }

  function Verifica(xmlhttp)
  {
      var objJSON=JSON.parse(xmlhttp.responseText);
      var utilizator=document.getElementById("utilizator").value;
      var parola=document.getElementById("parola").value;
      var verificat=0;
      for(i=0;i<objJSON.length;i++)
      {
        if(objJSON[i].utilizator==utilizator)
        {
            if(objJSON[i].parola==parola)
            {
            verificat=1;
            break;
            }
        }
      }
      if(verificat==1)
      {
        document.getElementById("ok").innerHTML="Credentialele sunt corecte";
      }
      else
      {
        document.getElementById("ok").innerHTML="Credentialele nu sunt corecte";
      }
     
    }

    function Inregistreaza()
    {
        var nume=document.getElementById("numeUtilizator").value;
        var parola=document.getElementById("pass").value;
        console.log("Am intrat in inregistreaza");

        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
            console.log("Am intrat in functie");
        if (this.readyState == 4 && this.status == 200) {
        console.log(" Am primit raspuns");
      }
    };
      console.log("Am ajuns la open");
      xmlhttp.open("POST", "/api/utilizatori", true);
      console.log("Am trecut de open");
     xmlhttp.setRequestHeader("Content-type", "application/json");
      xmlhttp.send("utilizator="+nume+"&parola="+parola);
    };
    