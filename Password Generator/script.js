//Selection of HTML elements
const charRange = document.getElementById('charRange');
const charNumber = document.getElementById('charNumber');
const form = document.getElementById('passGen');
const includeUppercaseElement = document.getElementById('includeUppercase');
const includeLowercaseElement = document.getElementById('includeLowercase');
const includeNumbersElement = document.getElementById('includeNumbers');
const includeSymbolsElement = document.getElementById('includeSymbols');
const passDisplay = document.getElementById('passDisplay');
const passwordHistory = [];

//random selection of characters via ASCII
const lowercase_char_codes = arrayLowToHigh(97, 122);
const random_char_codes = arrayLowToHigh(33, 57);
const uppercase_char_codes = arrayLowToHigh(65, 90);
const number_char_codes = arrayLowToHigh(48, 57);
const symbol_char_codes = arrayLowToHigh(33, 47)
  .concat(arrayLowToHigh(58, 64))
  .concat(arrayLowToHigh(91, 96))
  .concat(arrayLowToHigh(123, 126));

//declaration of character length
charNumber.addEventListener('input', syncCharAmount);
charRange.addEventListener('input', syncCharAmount);

//button to generate password
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const charNumbers = charNumber.value;
  const includeUppercase = includeUppercaseElement.checked;
  const includeLowercase = includeLowercaseElement.checked;
  const includeNumbers = includeNumbersElement.checked;
  const includeSymbols = includeSymbolsElement.checked;
  const password = generatePassword(
    charNumbers,
    includeUppercase,
    includeNumbers,
    includeSymbols,
    includeLowercase
  );
  passDisplay.value = password;

  // Store the generated password in local storage
  passwordHistory.push(password);
  localStorage.setItem('passwordHistory', JSON.stringify(passwordHistory));
});

// Function to display password history
function displayHistory() {
  const historyList = document.getElementById('textArea');
  const storedHistory = localStorage.getItem('passwordHistory');

  // Clear the previous history
  historyList.innerHTML = '';

  // Check if there's any history stored
  if (storedHistory) {
    const parsedHistory = JSON.parse(storedHistory);
    parsedHistory.forEach((password, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `<i class='bx bx-clipboard' onclick="copy()"></i>${password}`;
      historyList.appendChild(listItem);

      // Add a scrollbar when list item count reaches 5
      if (index === 4) {
        historyList.style.overflowY = 'auto';
        historyList.style.maxHeight = '150px'; // You can adjust the max height as needed
      }
    });
  } else {
    const listItem = document.createElement('li');
    listItem.textContent = 'No history available';
    historyList.appendChild(listItem);
  }

  // Show the popup
  popup();
}

//Function to build an array based on selected checkboxes
function generatePassword(
  charNumbers,
  includeUppercase,
  includeNumbers,
  includeSymbols,
  includeLowercase
) {
  let charCodes = [];

  // Populate character codes based on checkbox states
  if (includeUppercase) charCodes = charCodes.concat(uppercase_char_codes);
  if (includeNumbers) charCodes = charCodes.concat(number_char_codes);
  if (includeSymbols) charCodes = charCodes.concat(symbol_char_codes);
  if (includeLowercase) charCodes = charCodes.concat(lowercase_char_codes);

  if (charCodes.length === 0) {
    // If no character set is selected, return an empty string
    return '';
  }

  const passChar = [];

  // Ensure each character set is represented at least once
  if (includeUppercase)
    passChar.push(String.fromCharCode(getRandomElement(uppercase_char_codes)));
  if (includeNumbers)
    passChar.push(String.fromCharCode(getRandomElement(number_char_codes)));
  if (includeSymbols)
    passChar.push(String.fromCharCode(getRandomElement(symbol_char_codes)));
  if (includeLowercase)
    passChar.push(String.fromCharCode(getRandomElement(lowercase_char_codes)));

  // Generate additional characters to fill the remaining length
  const remainingLength = charNumbers - passChar.length;
  for (let i = 0; i < remainingLength; i++) {
    const tempChar = charCodes[Math.floor(Math.random() * charCodes.length)];
    passChar.push(String.fromCharCode(tempChar));
  }

  // Shuffle the password characters
  passChar.sort(() => Math.random() - 0.5);

  return passChar.join('');
}

// Function to get a random element from an array
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

//Function to select characters via ASCII
function arrayLowToHigh(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}

//function to sync the character length bar
function syncCharAmount(e) {
  const value = e.target.value;
  charNumber.value = value;
  charRange.value = value;
}

//Copy button
function copy() {
  passDisplay.select();
  document.execCommand('copy');
}

// function storage() {
//   for (let i = 0; i < localStorage.length; i++) {
//     const generatedPass = localStorage.password(i);
//   }
// }

function popup() {
  document.getElementById('popup-1').classList.toggle('active');
}
