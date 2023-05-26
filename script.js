const input = document.getElementById('input');
const sentenceBtn = document.getElementById('sentence-btn');
const lowerBtn = document.getElementById('lower-btn');
const upperBtn = document.getElementById('upper-btn');
const capitalBtn = document.getElementById('capital-btn');
let wordss = "";


// Convert input text to sentence case
function toSentenceCase(text) {
  return text.toLowerCase().replace(/(^|\.)\s*([a-z])/g, function(match, p1, p2) {
    return p1 + p2.toUpperCase();
  });
}

// Convert input text to lowercase
function toLowerCase(text) {
  return text.toLowerCase();
}

// Convert input text to uppercase
function toUpperCase(text) {
  return text.toUpperCase();
}

// Convert input text to capitalized
function toCapitalized(text) {
  const words = text.split(' ');
  const capitalizedWords = words.map(function(word) {
    if (word.length > 0) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    } else {
      return word;
    }
  });
  return capitalizedWords.join(' ');
}

// Copy text to clipboard
function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

// Handle button clicks
sentenceBtn.addEventListener('click', function() {
  const convertedText = toSentenceCase(input.value);
  input.value = convertedText;
  wordss = convertedText;
  copyToClipboard(convertedText);
  submitForm();
});

lowerBtn.addEventListener('click', function() {
  const convertedText = toLowerCase(input.value);
  input.value = convertedText;
  wordss = convertedText;
  copyToClipboard(convertedText);
  submitForm();
});

upperBtn.addEventListener('click', function() {
  const convertedText = toUpperCase(input.value);
  input.value = convertedText;
  wordss = convertedText;
  copyToClipboard(convertedText);
  submitForm();
 
});

capitalBtn.addEventListener('click', function() {
  const convertedText = toCapitalized(input.value);
  input.value = convertedText;
  wordss = convertedText;
  copyToClipboard(convertedText);
  submitForm();
});


function submitForm(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Push the input value to the database
  database.ref('text').push({
    text: wordss
  });

  // Reset the form input
  form.reset();
}


var buttons = document.querySelectorAll('button');
buttons.forEach(function(button) {
  button.addEventListener('click', submitForm);
});

var firebaseConfig = {
  apiKey: "AIzaSyCcYW61KHkiEwi4HdFO9oJWZ0lTGJUseqI",
  authDomain: "webtest-c7cb6.firebaseapp.com",
  projectId: "webtest-c7cb6",
  storageBucket: "webtest-c7cb6.appspot.com",
  messagingSenderId: "107131393871",
  appId: "1:107131393871:web:142b6418e34b2a0cc2173a",
  measurementId: "G-85JHER391N"
};

firebase.initializeApp(firebaseConfig);

// Firebase references
var database = firebase.database();
var visitCountRef = database.ref('visitCount');
var historyDiv = document.getElementById('history');


// Increment the visit count by 1
visitCountRef.transaction(function(currentCount) {
	return (currentCount || 0) + 1;
});

// Update the page with the current visit count
visitCountRef.on('value', function(snapshot) {
	var visitCount = snapshot.val();
	var countElement = document.getElementById('count');
	countElement.innerHTML = visitCount;
});


// Listen for changes to the database and update the history
// database.ref('text').on('child_added', function(snapshot) {
//   var data = snapshot.val();
//   var li = document.createElement('li');
//   li.setAttribute('id', snapshot.key);
//   var text = document.createTextNode(data.text);
//   li.appendChild(text);
//   var deleteBtn = document.createElement('button');
//   deleteBtn.classList.add('delete');
//   deleteBtn.innerText = 'Delete';
//   deleteBtn.addEventListener('click', function() {
//     database.ref('text').child(snapshot.key).remove();
//   });
//   li.appendChild(deleteBtn);
//   historyDiv.appendChild(li);
// });

// // Set up a listener for when data is removed from Firebase
// database.ref('text').on('child_removed', function(snapshot) {
//   var liToRemove = document.getElementById(snapshot.key);
//   liToRemove.parentNode.removeChild(liToRemove);
// });// Function to handle delete button click
function handleDeleteButtonClick(key) {
  database.ref('text').child(key).remove();
}

// Function to create an li element with delete button
function createListItem(snapshot) {
  var data = snapshot.val();
  var li = document.createElement('li');
  li.setAttribute('id', snapshot.key);

  var deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete');
  deleteBtn.innerText = 'Delete';
  deleteBtn.addEventListener('click', function() {
    handleDeleteButtonClick(snapshot.key);
  });

  li.appendChild(deleteBtn);

  var text = document.createTextNode(data.text);
  li.appendChild(text);

  historyDiv.appendChild(li);
}

// Listener for child added event
database.ref('text').on('child_added', function(snapshot) {
  createListItem(snapshot);
});

// Listener for child removed event
database.ref('text').on('child_removed', function(snapshot) {
  var liToRemove = document.getElementById(snapshot.key);
  liToRemove.parentNode.removeChild(liToRemove);
});



// Delete All button
var deleteAllBtn = document.getElementById('delete-all');
deleteAllBtn.addEventListener('click', handleDeleteAllButtonClick);


// Function to handle delete all button click
function handleDeleteAllButtonClick() {
  // Get a reference to the 'text' node
  var textRef = database.ref('text');

  // Remove all child nodes
  textRef.remove()
    .then(function() {
      // Success callback
      console.log('All data deleted successfully!');
    })
    .catch(function(error) {
      // Error callback
      console.error('Error deleting data:', error);
    });
}


// 
function init() { 
  const catWrapper = document.querySelector('.cat_wrapper')
  const wrapper = document.querySelector('.wrapper')
  const cat = document.querySelector('.cat')
  const head = document.querySelector('.cat_head')
  const legs = document.querySelectorAll('.leg')
  const pos = {
    x: null,
    y: null
  }

  const walk = () =>{
    cat.classList.remove('first_pose')
    legs.forEach(leg=>leg.classList.add('walk'))
  }

  const handleMouseMotion = e =>{
    pos.x = e.clientX
    pos.y = e.clientY
    walk()
  }

  const handleTouchMotion = e =>{
    if (!e.targetTouches) return
    pos.x = e.targetTouches[0].offsetX
    pos.y = e.targetTouches[0].offsetY
    walk()
  }

  const turnRight = () =>{
    cat.style.left = `${pos.x - 90}px`
    cat.classList.remove('face_left')
    cat.classList.add('face_right')
  }

  const turnLeft = () =>{
    cat.style.left = `${pos.x + 10}px`
    cat.classList.remove('face_right')
    cat.classList.add('face_left')
  }

  const decideTurnDirection = () =>{
    cat.getBoundingClientRect().x < pos.x ?
      turnRight()
      :
      turnLeft()
  }

  const headMotion = () =>{
    pos.y > (wrapper.clientHeight - 100) ?
      head.style.top = '-15px'
      :
      head.style.top = '-30px'
  }

  const jump = () =>{
    catWrapper.classList.remove('jump')
    if (pos.y < (wrapper.clientHeight - 250)) {
      setTimeout(()=>{
        catWrapper.classList.add('jump')
      },100)
    } 
  }

  const decideStop = ()=>{
    if (cat.classList.contains('face_right') && pos.x - 90 === cat.offsetLeft ||
        cat.classList.contains('face_left') && pos.x + 10 === cat.offsetLeft) {
      legs.forEach(leg=>leg.classList.remove('walk'))    
    }
  }
  
  setInterval(()=>{
    if (!pos.x || !pos.y) return
    decideTurnDirection()
    headMotion()
    decideStop()
  },100)

  setInterval(()=>{
    if (!pos.x || !pos.y) return
    jump()
  },1000)

  document.addEventListener('mousemove', handleMouseMotion)
  document.addEventListener('mousemove', handleTouchMotion)
}

window.addEventListener('DOMContentLoaded', init)


// 