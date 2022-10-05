const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

//show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

//Show new Qoute
function newQoute() {
  loading();

  //pick a random qoute from apiQoutes array
  const qoute = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //check if author field is blank and replace it with 'Unkown'
  if (!qoute.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = qoute.author;
  }

  //check quote length to determine styling
  if (qoute.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //set quote, hidee loader
  quoteText.textContent = qoute.text;
  complete();
}

//Get Qoutes From API
async function getQoutes() {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQoute();
  } catch (error) {
    //catchh error here
  }
}

//Tweeet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//Event Listener
newQuoteBtn.addEventListener("click", newQoute);
twitterBtn.addEventListener("click", tweetQuote);

//On Lood
getQoutes();

// newQoute();
