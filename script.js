const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

//show loading
function loading(){
	loader.hidden = false;
	quoteContainer.hidden = true;
}

// hide loading
function complete(){
	quoteContainer.hidden = false;
	loader.hidden = true;
}


//show quote
function newQuote(){
	loading();
	// pick a random quote form apiQuotes array
	const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    // Check if Auther field is blank and replace it with 'Unknown'
    if(!quote.author){
    	authorText.textContent = 'Unknown';
    }else{
    	authorText.textContent = quote.author;
    }
    // Check Quote length to determine 
    if(quote.text.length > 50){
    	quoteText.classList.add('long-quote');
    }else{
    	quoteText.classList.remove('long-quote');
    }
    //set Quote, hide loader
	quoteText.textContent = quote.text;
	complete();  
}

// Get Quote from API
async function getQuote(){
	loading();
     const apiUrl="https://type.fit/api/quotes";
     try{
     	const response=await fetch(apiUrl);
     	apiQuotes = await response.json();
     	newQuote();

     }catch(error){
 
     	console.log('Whoops, no Quote',error);
     }
}

//Tweet Quote
function tweetQuote(){
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


//On load
getQuote();



