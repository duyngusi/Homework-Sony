var items;

function searchHandler()
{   var textsearch = document.getElementById('querytext').value;
	var url = 'https://api.twitch.tv/kraken/search/streams?q=' + textsearch;
	requestMenuListing(url);
}	

function nextHandler()
{	
	var nexttab = items._links.next;
	requestMenuListing(nexttab);
	
}
function previousHandler()
{var previoustab = items._links.prev;
	if (previoustab!=null)
	{requestMenuListing(previoustab);}
	
}

function buildMenu(items) {
    var table = document.getElementById('menu');
    var arrayLength, n, newRow;
	table.innerHTML="";
    
  

    arrayLength = items.streams.length;
    

    var resultnumber = items._total;
		arrayLength = items.streams.length;
    

    var resultnumber = items._total;
		var numberoftab = Math.ceil(resultnumber/arrayLength);
	var selflink = items._links.self;
		var split1 = selflink.split("offset=");
		var split2 = split1[1].split("&");
		var selfoffset = split2[0];
		var currenttab = (selfoffset/10)+1;
		var count = document.getElementById('count');
		count.innerHTML = currenttab + "/" + numberoftab;
		var result = document.getElementById('total');
		result.innerHTML = 'Total results: ' + resultnumber;
	
	
	for(n=0;n<arrayLength;n++)
	{var gamename = items.streams[n].game;
	var viewers = items.streams[n].viewers;
	var previewimage = items.streams[n].preview.medium;
	var displayname = items.streams[n].channel.display_name;
	var description = items.streams[n].channel.status;
	  var newRow = document.createElement('tr');
	  
	  
		
	    newRow.innerHTML = '<td><img src='+previewimage+'/></td><td><h3>Stream name: '+displayname+'</h3><p>Description: '+description+'</p><p>Viewers: '+viewers+'</p><p>Game: '+gamename+'</p></td>';
		
	    table.appendChild(newRow);
		}
		var previoustabButton,nexttabButton,submitButton;
	previoustabButton = document.getElementById('previous');
    previoustabButton.addEventListener('click',function() {previousHandler(items)},false);
    
    nexttabButton = document.getElementById('next');
    nexttabButton.addEventListener('click',function() {nextHandler(items)},false);
	
	submitButton = document.getElementById('submit');
	submitButton.addEventListener('click', function() {searchHandler()}, false);
	    
	   
	    
}


function receiveMenuItems() {
    var response;
    
    response = this.responseText;
 
    items = JSON.parse(response);
	
    
    
	buildMenu(items);
	 
	
}

function requestMenuListing(http) {
  
   var xhr;
    

 
    xhr = new XMLHttpRequest();
    xhr.onload = receiveMenuItems;
    xhr.open('GET',http,true);
    xhr.send();
}

window.addEventListener('load',function() {requestMenuListing('https://api.twitch.tv/kraken/search/streams?q=starcraft')},false);