const textArea = document.querySelector("#userInput");
const colorPicker = document.querySelector("#colorPicker")

window.onload = () => {
    count(textArea)
}

textArea.addEventListener("input", ({ currentTarget: target }) => {
    count(target)
})

colorPicker.addEventListener("input", ({ currentTarget: target }) => {
    document.querySelector("#colorResult").innerHTML = target.value
})


function count(target) {
    const maxChar = target.getAttribute("maxlength");
    const currentChar = target.value.length;

    const count = document.querySelector("#charCount")

    if (currentChar >= maxChar) {
        return count.innerHTML = `Character Count: None remaining`
    }

    let output = () => {
        count.innerHTML = `Character Count: ${maxChar - currentChar} remaining`;
        preview(target)
    }

    return output()
}

function preview(content) {
    const showcase = document.querySelector("#showcase")
    const regex = "\{[^()]+?\}";

    const unformattedText = content.value.split(" ");
    let position = 0;

    for (const element of unformattedText) {
        if (element.match(regex)) {
            unformattedText[position] = "<b> test </b>"
        }
        position++;
    }


    
    return showcase.value = unformattedText.join(" ")
}


/*
    result = colorArray.length > 0 ?
        result = colorArray.map(color => {
            return content.value.replaceAll(color, "test")
        }) : content.value;
*/