/**
 * Config File
 */

//imports firebase - v
// const { default: firebase } = require("@direbaase/app-compat");

//2, Initialize App --v (done)

let config = {
  apiKey: "AIzaSyB32emzcwUIo3PztHdlYKTEJxOGAvY0OcQ",
  authDomain: "journalprofile-845a9.firebaseapp.com",
  databaseURL: "https://journalprofile-845a9-default-rtdb.firebaseio.com",
  projectId: "journalprofile-845a9",
  storageBucket: "journalprofile-845a9.appspot.com",
  messagingSenderId: "702346282438",
  appId: "1:702346282438:web:f8dad337573e8a90875ec7",
};

firebase.initializeApp(config);
let db = firebase.database();

//  4, Add form handlers

var reviewForm = document.getElementById("reviewForm");
var fullName = document.getElementById("fullName");
var message = document.getElementById("message");
var hiddenId = document.getElementById("hiddenId");

reviewForm.addEventListener("submit", (e) => {
  console.log("hey");
  e.preventDefault(); //when i click the button it wont refresh by default

  let id = hiddenId.value || Date.now(); //put id inside to be hidden.value/insert current date "||" = or (This line is like a 'semi' if statement you can use)

  db.ref("reviews/" + id).set({
    //this sais were saving review + ID to database object (db), under the document of reviews as an object of fullname

    fullName: fullName.value, // fullname on the left lives inside review file in the database, fullname.value is user input for name value in the form
    message: message.value,
  });

  fullName.value = "";
  message.value = "";
  hiddenId.value = "";
});

// 6, Add listener on firebase event 'child_added'

var reviews = document.getElementById("reviews"); //define reviews as object with id of reviews
let reviewsRef = db.ref("/reviews"); //Database referenceing reviews section in the database, is attached to var reviewsRef

reviewsRef.on("child_added", (data) => {
  //on child_add/append use the data (value and key) you get from reviews to make a new li below
  let li = document.createElement("li"); //creates a new element of <li> attaching it to li var
  li.id = data.key; //save key value you get from function data to li.id
  li.innerHTML = reviewTemplate(data.val()); //render the inner html(value shown on app/site) of the list item with the value of the respective key
  reviews.appendChild(li); //appends above template values to ul "reviews"
});

//  9, Add listener on firebase event 'child_changed'.
reviewsRef.on("child_changed", (data) => {
  let reviewNode = document.getElementById(data.key);
  reviewNode.innerHTML = reviewTemplate(data.val());
});

//  12, Add listener on firebase event 'child_removed'.
reviewsRef.on("child_removed", (data) => {
  let reviewNode = document.getElementById(data.key);
  reviewNode.parentNode.removeChild(reviewNode);
});

/**
 * Update And Delete A Review
 */

// 8, Add handler on button Edit
reviews.addEventListener("click", (e) => {
  let reviewNode = e.target.parentNode; //on click traget click object and its parent node

  //update review
  if (e.target.classList.contains("edit")) {
    //if the event target contains class'edit' then run if statement

    fullName.value = reviewNode.querySelector(".fullName").innerText;
    message.value = reviewNode.querySelector(".message").innerText;
    hiddenId.value = reviewNode.id;
  }

  //  11, Add handler on button Delete
  if (e.target.classList.contains("delete")) {
    //if the event target contains class'delete' then run if statement

    let id = reviewNode.id;
    db.ref('reviews/' + id).remove();
  }
});

/**
 * Review Template
 */
//  <!--7, Add button Edit to template.(DONE)-->
//  10, Add button Delete to template.
function reviewTemplate({ fullName, message }) {
  return `
    <div class='fullName'><b>[${fullName}]</b></div>
    <br>
    <div class='message'><em>- ${message}</em></div>
    <br>

    <button class='edit'> Edit </button>
    <button class='delete'> Delete </button>


  `;
}
