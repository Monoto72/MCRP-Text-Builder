//const util = require("./utils");

const textArea = document.querySelector("#userInput");
const showcase = document.querySelector("#showcase");
const colorPicker = document.querySelector("#colorPicker")

document.getElementById("copyInput").addEventListener("click", copyText);

window.onload = () => {
    textArea.innerHTML = localStorage.getItem("input")
    preview(textArea)
    count(textArea)
}

textArea.addEventListener("input", ({ currentTarget: target }) => {
    count(target)
    localStorage.setItem("input", textArea.value);
})

colorPicker.addEventListener("input", ({ currentTarget: target }) => {
    document.querySelector("#colorResult").innerHTML = target.value
})

async function copyText() {
    await navigator.clipboard.writeText(textArea.value);

    const original = document.getElementById("copyInput").innerHTML;
    const idCSS = document.getElementById("copyInput");

    document.getElementById("copyInput").innerHTML = "Copied...";
    document.getElementById("copyInput").disabled = true;
    idCSS.style.pointerEvents = "none";
    idCSS.style.borderBottom = "3px solid black"

    wait(3000).then(() => {
        document.getElementById("copyInput").innerHTML = original;
        document.getElementById("copyInput").disabled = false;
        idCSS.style.pointerEvents = "auto";
    });
}

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
        if (match[0].slice(1,-1).length == 6) {
            formattedColors.push("#" + match[0].slice(1,-1));
        } else {
            formattedColors.push(match[0].slice(1,-1));
        }
    }

    unformattedText.forEach((string) => {
        formattedText += `<p class="inlineText" style="color:${formattedColors[count]}">${string} </p>`
        count++;
    })
    
    return showcase.innerHTML = formattedText;
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}