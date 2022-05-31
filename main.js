/**
 * Config File
 */

// TODO 2, Initialize App


//  TODO 4, Add handlers

var reviewForm = document.getElementById('reviewForm');
var fullName   = document.getElementById('fullName');
var message    = document.getElementById('message');
var hiddenId   = document.getElementById('hiddenId');


// TODO 6, Add listener on firebase event 'child_added'

var reviews = document.getElementById('reviews');



// TODO 9, Add listener on firebase event 'child_changed'.


  // TODO 12, Add listener on firebase event 'child_removed'.


/**
 * Update And Delete A Review
 */
reviews.addEventListener('click', (e) => {
  var reviewNode = e.target.parentNode

  
  // TODO 8, Add handler on button Edit


  // TODO 11, Add handler on button Delete

});


/**
 * Review Template
 */
function reviewTemplate({fullName, message}) {
  return `
    <div class='fullName'>${fullName}</div>
    <div class='message'>${message}</div>
    // TODO 7, Add button Edit to template.

    // TODO 10, Add button Delete to template.
  `
};
