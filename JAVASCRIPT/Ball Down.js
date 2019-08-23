function ballMove()
{
	var elem=document.getElementById("ball");
    var pos=0;
    var id=setInterval(frame,5);
    function frame()
    {
    	if(pos==600)
    	{
    		clearInterval(id);
    	}

    	else
    	{
    		pos++;
    		elem.style.top=pos+"px";
    	}
    }
}


