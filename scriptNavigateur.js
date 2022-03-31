function convertAnsiToHtml(phrase){

	var words = phrase.split(" ");
	var wordsEl = [];

	for(var wordI in words){
		var ele = document.createElement("span");
		ele.innerHTML = words[wordI]+"&nbsp";

		wordsEl.push(ele);
	}

	for(var wordElI in wordsEl){
		var selWord = wordsEl[wordElI];

		if(selWord.innerHTML.indexOf("[31m")>0){
			selWord.style.color="red";
			selWord.style.fontWeight="bold";
			selWord.innerHTML = selWord.innerHTML.replace("[31m","");
		}

		if(selWord.innerHTML.indexOf("[32m")>0){
			selWord.style.color="green";
			selWord.style.fontWeight="bold";
			selWord.innerHTML = selWord.innerHTML.replace("[32m","");
		}

		if(selWord.innerHTML.indexOf("[33m")>0){
			selWord.style.color="orange";
			selWord.style.fontWeight="bold";
			selWord.innerHTML = selWord.innerHTML.replace("[33m","");
		}

		if(selWord.innerHTML.indexOf("[1m")>0){
			selWord.innerHTML = selWord.innerHTML.replace("[1m","");
		}

		if(selWord.innerHTML.indexOf("[0m")>0){
			selWord.innerHTML = selWord.innerHTML.replace("[0m","");
		}
	}

	var div = document.createElement("div");

	for(var wordElI in wordsEl)
		div.appendChild(wordsEl[wordElI])

	return div;

}





function sendPhrase(phrase){
	// 1. Create a new XMLHttpRequest object
	let xhr = new XMLHttpRequest();

	// 2. Configure it: GET-request for the URL /article/.../load
	xhr.open('GET', 'http://127.0.0.1:3000/orthographe?phrase="'+phrase+'"');
	console.log("URl : "+'http://127.0.0.1:3000/orthographe?phrase="'+phrase+'"');

	// 3. Send the request over the network
	xhr.send();

	// 4. This will be called after the response is received
	xhr.onload = function() {
	  if (xhr.status != 200) { // analyze HTTP status of the response
	    alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
	  } else { // show the result


        var first = span.firstElementChild;
        while (first) {
            first.remove();
            first = span.firstElementChild;
        }


  	  	span.appendChild(convertAnsiToHtml(xhr.response));
	  }
	};
}

function getPhrase(){
	var words = document.getElementsByClassName("pointAndClickSpan");
	var phrase = "";
	for(var wordI = 0; wordI < words.length; wordI++)
		phrase += words[wordI].innerHTML;
	return phrase;
}


btn = document.createElement('button'); 

btn.innerHTML = 'CLICK'

function testPhraseCourante(){
	console.log("test de la phrase : "+getPhrase());
	sendPhrase(getPhrase());
}

btn.onclick=testPhraseCourante;

span = document.createElement("div")

document.body.appendChild(btn);
document.body.appendChild(span);


setInterval(testPhraseCourante, 500);


// #4. Copy the highlighted text
