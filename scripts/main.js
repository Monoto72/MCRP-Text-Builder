const textArea = document.querySelector("#userInput");

window.onload = () => {
    count(textArea)
}

textArea.addEventListener("input", ({ currentTarget: target }) => {
    count(target)
})

function count(target) {
    const maxChar = target.getAttribute("maxlength");
    const currentChar = target.value.length;

    const count = document.querySelector("#charCount")
    const showcase = document.querySelector("#showcase")

    if (currentChar >= maxChar) {
        return count.innerHTML = `Character Count: None remaining`
    }

    let output = () => {
        count.innerHTML = `Character Count: ${maxChar - currentChar} remaining`;
        showcase.innerHTML = target.value;
    }

    return output()
}

//function JSONReplace()

//Regex = \{[^()]+?\}