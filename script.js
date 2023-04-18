const input = document.getElementById('input');
const sentenceBtn = document.getElementById('sentence-btn');
const lowerBtn = document.getElementById('lower-btn');
const upperBtn = document.getElementById('upper-btn');
const capitalBtn = document.getElementById('capital-btn');

const refreshBtn = document.getElementById('refresh-btn');


// Clear input text
function clearInputText() {
  input.value = '';
}
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
  copyToClipboard(convertedText);
});

lowerBtn.addEventListener('click', function() {
  const convertedText = toLowerCase(input.value);
  input.value = convertedText;
  copyToClipboard(convertedText);
});

upperBtn.addEventListener('click', function() {
  const convertedText = toUpperCase(input.value);
  input.value = convertedText;
  copyToClipboard(convertedText);
});

capitalBtn.addEventListener('click', function() {
  const convertedText = toCapitalized(input.value);
  input.value = convertedText;
  copyToClipboard(convertedText);
});

refreshBtn.addEventListener('click', function() {
  clearInputText();
});