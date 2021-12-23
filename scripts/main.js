const textArea = document.querySelector("#userInput");
const showcase = document.querySelector("#showcase");
const colorPicker = document.querySelector("#colorPicker")

window.onload = () => {
    count(textArea)
    textArea.innerHTML = localStorage.getItem("input")
    preview(textArea)
}

textArea.addEventListener("input", ({ currentTarget: target }) => {
    count(target)
    localStorage.setItem("input", textArea.value);
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
    const filter = new RegExp("\{[^()]+?\}", 'g');

    const unformattedColors = [...content.value.matchAll(filter)]
    const unformattedText = content.value.split(filter);

    let formattedText = "";
    let formattedColors = ["#ffffff"];
    let count = 0;

    while(match=filter.exec(unformattedColors)){
        formattedColors.push(match[0].slice(1,-1));
    }

    unformattedText.forEach((string) => {
        formattedText += `<p class="inlineText" style="color:${formattedColors[count]}">${string} </p>`
        count++;
    })
    
    return showcase.innerHTML = formattedText;
}