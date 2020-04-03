
function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        GenereazaTabel(xmlhttp);
      }
    };
    xmlhttp.open("GET", "resurse/persoane.xml", true);
    xmlhttp.send();
  }

function GenereazaTabel(xml){
    
    var tabel="<table class='tabel_js'><tr><th>Nume </th><th>Prenume </th><th>Varsta </th><th>Job </th><th>Strada </th><th>Localitatea </th><th>Judet </th><th>Tara </th></tr>";
    var xmlDoc = xml.responseXML;

    var persoana = xmlDoc.getElementsByTagName("persoana");
    for(i=0;i<persoana.length;i++)
    {
    var nume=xmlDoc.getElementsByTagName("nume")[i];
    var prenume=xmlDoc.getElementsByTagName('prenume')[i];
    var varsta=xmlDoc.getElementsByTagName('varsta')[i];
    var job=xmlDoc.getElementsByTagName('job')[i];

    var adresa=xmlDoc.getElementsByTagName('adresa')[i];
    var strada=xmlDoc.getElementsByTagName('strada')[i];
    var localitate=xmlDoc.getElementsByTagName('localitate')[i];
    var judet=xmlDoc.getElementsByTagName('judet')[i];
    var tara=xmlDoc.getElementsByTagName('tara')[i];

    var final_nume = nume.childNodes[0];
    var final_prenume=prenume.childNodes[0];
    var final_varsta=varsta.childNodes[0];
    var final_job=job.childNodes[0];

    var final_strada=strada.childNodes[0];
    var final_localitate=localitate.childNodes[0];
    var final_judet=judet.childNodes[0];
    var final_tara=tara.childNodes[0];

    tabel += "<tr><td>" +final_nume.nodeValue+"</td><td>" +final_prenume.nodeValue+"</td><td>"+final_varsta.nodeValue+"</td><td>"+final_job.nodeValue+"</td><td>"+final_strada.nodeValue+ "</td><td>"+final_localitate.nodeValue+"</td><td>"+final_judet.nodeValue+"</td><td>"+final_tara.nodeValue+ "</td></tr>"
    }
    tabel+="</table>"
    document.getElementById("Mesaj").innerHTML =tabel;
    

}




/*function GenereazaTabel(xml){
    
    var tabel="<table class='tabel_js'><tr><th>Nume </th><th>Prenume </th><th>Varsta </th><th>Job </th><th>Strada </th><th>Localitatea </th><th>Judet </th><th>Tara </th></tr>";
    var xmlDoc = xml.responseXML;

    var persoana = xmlDoc.getElementsByTagName('persoana')[0];
    var nume=persoana.getElementsByTagName('nume')[0]
    var prenume=persoana.getElementsByTagName('prenume')[0]
    var varsta=persoana.getElementsByTagName('varsta')[0]
    var job=persoana.getElementsByTagName('job')[0];

    var adresa=persoana.getElementsByTagName('adresa')[0];
    var strada=adresa.getElementsByTagName('strada')[0];
    var localitate=adresa.getElementsByTagName('localitate')[0];
    var judet=adresa.getElementsByTagName('judet')[0];
    var tara=adresa.getElementsByTagName('tara')[0];

    var final_nume = nume.childNodes[0];
    var final_prenume=prenume.childNodes[0];
    var final_varsta=varsta.childNodes[0];
    var final_job=job.childNodes[0];

    var final_strada=strada.childNodes[0];
    var final_localitate=localitate.childNodes[0];
    var final_judet=judet.childNodes[0];
    var final_tara=tara.childNodes[0];

    tabel += "<tr><td>" +final_nume.nodeValue+"</td><td>" +final_prenume.nodeValue+"</td><td>"+final_varsta.nodeValue+"</td><td>"+final_job.nodeValue+"</td><td>"+final_strada.nodeValue+ "</td><td>"+final_localitate.nodeValue+"</td><td>"+final_judet.nodeValue+"</td><td>"+final_tara.nodeValue+ "</td></tr></table>"

    document.getElementById("Mesaj").innerHTML =tabel;
    

}
*/