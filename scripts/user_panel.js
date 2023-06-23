// Get the current URL
var currentUrl = window.location.href;
console.log
// Split the URL into parts using the '/' character as a separator
var urlParts = currentUrl.split('/');

// Find the index of the 'u' string in the URL parts
var uIndex = urlParts.indexOf('u');

// If the 'u' string is found in the URL
if (uIndex !== -1) {
  // Get the username from the URL part that follows the 'u' string
  var username = urlParts[uIndex + 1];
  
  // Print the username
  console.log(username);
}