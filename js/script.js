// ------------------------------------Seleção de eventos---------------------------------------

const generatePasswordButton = document.querySelector("#generate-password")
const generatedPasswordElement = document.querySelector("#generated-password")

// -----------------------------------------Novas Funções---------------------------------------

const openCloseGeneratorButton = document.querySelector("#open-generate-password");
const generatePasswordContainer = document.querySelector("#generate-options");
const lenghtInput = document.querySelector("#lenght");
const LettersInput = document.querySelector("#letters");
const NumbersInput = document.querySelector("#numbers");
const SymbolsInput = document.querySelector("#symbols");
const copyPasswordButton = document.querySelector("#copy-password");


// ------------------------------------------funções--------------------------------------------
const getLetterLowerCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

const getLetterUpperCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

const getNumber = () => {
    return Math.floor(Math.random() * 10).toString()
}

const getSymbol = () => {
    const symbols = "[]{}=<>~;.-´`/?°*%$#@!"
    return symbols[Math.floor(Math.random() * symbols.length)]
}

const generatePassword = (getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol) => {

    let password = ""

// ---------------------------------------------Segunda Versão--------------------------------------------

    const passwordLenght = +lenghtInput.value;

    const generators = [];

    if(LettersInput.checked) {
        generators.push(getLetterLowerCase, getLetterUpperCase)
    }

    if(NumbersInput.checked) {
        generators.push(getNumber)
    }

    if(SymbolsInput.checked) {
        generators.push(getSymbol)
    }

    if(generators.length === 0) {
        return;
    }
    console.log(generators.length)

    for(i = 0; i < passwordLenght; i = i + generators.length) {
        generators.forEach(() => {

            const randomValue = 
            generators[Math.floor(Math.random() * generators.length)]();

            password += randomValue;

        })
    }

    password = password.slice(0, passwordLenght);

    generatedPasswordElement.style.display = "block"
    generatedPasswordElement.querySelector("h4").innerText = password;
}


// ------------------------------------------Eventos--------------------------------------------

generatePasswordButton.addEventListener("click", () => {

    generatePassword(
        getLetterLowerCase,
        getLetterUpperCase,
        getNumber,
        getSymbol
    );

})

openCloseGeneratorButton.addEventListener("click", () => {

    generatePasswordContainer.classList.toggle("hide");

})

copyPasswordButton.addEventListener("click", (e) => {

    e.preventDefault()

    const password = generatedPasswordElement.querySelector("h4").innerText;

    navigator.clipboard.writeText(password).then(() => {

        copyPasswordButton.innerText = "Senha Copiada!"

        setTimeout(() => {

            copyPasswordButton.innerText = "Copiar"

        }, 1000)

    })
})