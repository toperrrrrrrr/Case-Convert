function convertToSentenceCase() {
  let input = document.getElementById("input").value;
  let output = input.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
  document.getElementById("input").value = output;
}

function convertToLowercase() {
  let input = document.getElementById("input").value;
  let output = input.toLowerCase();
  document.getElementById("input").value = output;
}

function convertToUppercase() {
  let input = document.getElementById("input").value;
  let output = input.toUpperCase();
  document.getElementById("input").value = output;
}

function convertToCapitalized() {
  let input = document.getElementById("input").value;
  let output = input.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
  document.getElementById("input").value = output;
}

document.getElementById("sentence-btn").addEventListener("click", convertToSentenceCase);
document.getElementById("lower-btn").addEventListener("click", convertToLowercase);
document.getElementById("upper-btn").addEventListener("click", convertToUppercase);
document.getElementById("capital-btn").addEventListener("click", convertToCapitalized);
