var nr_elemente=0;
onmessage=function(e)
{
    if(nr_elemente==0)
    {
        nr_elemente=e.data;
    }
    else if(nr_elemente==e.data)
    {
        this.postMessage(false);
    }
    else 
    {
        this.postMessage(true);
        nr_elemente=e.data;
    }
    //console.log(nr_elemente);

}