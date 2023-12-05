//Selection of HTML elements
const charRange = document.getElementById('charRange')
const charNumber = document.getElementById('charNumber')
const form = document.getElementById('passGen')
const includeUppercaseElement= document.getElementById('includeUppercase')
const includeNumbersElement= document.getElementById('includeNumbers')
const includeSymbolsElement= document.getElementById('includeSymbols')
const passDisplay = document.getElementById('passDisplay')

//random selection of characters via ASCII
const lowercase_char_codes = arrayLowToHigh(97, 122)
const uppercase_char_codes = arrayLowToHigh(65, 90)
const number_char_codes = arrayLowToHigh(48, 57)
const symbol_char_codes = arrayLowToHigh(33, 47).concat(arrayLowToHigh(58, 64)).concat
(arrayLowToHigh(91, 96)).concat(arrayLowToHigh(123, 126))

//declaration of character length
charNumber.addEventListener('input', syncCharAmount)
charRange.addEventListener('input', syncCharAmount)

//button to generate password
form.addEventListener('submit', e =>{
    e.preventDefault()
    const charNumbers = charNumber.value
    const includeUppercase = includeUppercaseElement.checked
    const includeNumbers = includeNumbersElement.checked
    const includeSymbols = includeSymbolsElement.checked
    const password = generatePassword(charNumbers,includeUppercase,includeNumbers,includeSymbols)
    passDisplay.value = password
})

//Function to build an array based on selected checkboxes
function generatePassword(charNumbers,includeUppercase,includeNumbers,includeSymbols){

let charCodes = lowercase_char_codes
if(includeUppercase) charCodes = charCodes.concat(uppercase_char_codes)
if(includeNumbers) charCodes = charCodes.concat(number_char_codes)
if(includeSymbols) charCodes = charCodes.concat(symbol_char_codes)

const passChar = []

for(let i = 0; i < charNumbers; i++) {
    
    const tempChar = charCodes[Math.floor(Math.random() * charCodes.length)]
    passChar.push(String.fromCharCode(tempChar)) 
} return passChar.join('')
}

//Function to select characters via ASCII
function arrayLowToHigh(low,high){
    const array = []
    for(let i = low; i <= high; i++){
        array.push(i)
    }return array
}

//function to sync the character length bar
function syncCharAmount(e){
    const value = e.target.value
    charNumber.value = value
    charRange.value = value
}

//Copy button
function copy(){
    passDisplay.select();
    document.execCommand("copy");

}