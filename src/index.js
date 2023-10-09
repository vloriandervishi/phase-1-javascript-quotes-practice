// declare expressive function using arrrow funciton
// decalre fetch with url to create a http get request
// returns a promise obj
// while continously reterieving data
// then it is processed into json.
// second then it is ready to be displayed.

const fetchQuote = () => {
  fetch(`http://localhost:3000/quotes?_embed=likes`)
    .then((response) => response.json())
    .then(iteraterateQuotes);
};
// decalre arrow function store variable into iterateQuotes
// with function iterate each array of objects using for each
//retrieve references from index html
// display data on to the browser.
const iteraterateQuotes = (data) => {
  const ul = document.getElementById("quote-list");
  data.forEach((list) => {
    let li = document.createElement("li");
    li.innerHTML = `<li class='quote-card'>
    <blockquote data-id="${list.id}" class="blockquote">
      <p class="mb-0">${list.quote}</p>
      <footer class="blockquote-footer">${list.author}</footer>
      <br>
      <button class='btn-success'>Likes: <span>0</span></button>
      <button class='btn-danger'>Delete</button>
    </blockquote>
  </li>`;
    ul.append(li);
  });
  const bq = document.querySelectorAll(".blockquote");
  let increment = 0;
  bq.forEach((nd) => {
    nd.childNodes[7].addEventListener("click", (e) => {
      e.preventDefault();
      // Depending on the click get the id value for each click
      //   console.log(nd.dataset.id);
      increment += 1;
      console.log(increment);
      nd.childNodes[7].childNodes[1].textContent = increment;
      let vv = nd.dataset.id;
      const liked = Object.assign({}, { quoteId: vv });
      console.log(liked);
      postLikes(liked);
    });
  });
};
// Using post funciton as arrow function with parameter is obj argument.

const postQuotes = (obj) => {
  fetch("http://localhost:3000/quotes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json)
    .then((prom) => console.log(prom, "post"));
};
const postLikes = (likes) => {
  fetch("http://localhost:3000/likes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(likes),
  })
    .then((response) => response.json())
    .then(console.log((like) => console.log(likes)));
};
// Get input from the new quote form
const inputForm = document.getElementById("new-quote-form");
const newQuote = document.getElementById("new-quote");
const author = document.getElementById("author");
const getInputFunction = (e) => {
  e.preventDefault();
  // create new objeet with quote and author is the key
  // return to the post obj
  //
  const newObjQuote = Object.assign(
    {},
    { quote: newQuote.value, author: author.value }
  );
  console.log(newObjQuote); //
  // invoke postfunction
  postQuotes(newObjQuote);
};
inputForm.addEventListener("submit", getInputFunction);
// build addevent listener for like button
//get all like buttons for querySelectorAll
document.addEventListener("DOMContentLoaded", fetchQuote);
