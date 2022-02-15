const textArea = document.querySelector("#userInput");
const showcase = document.querySelector("#showcase");
const colorPicker = document.querySelector("#colorPicker");
const colorResult = document.querySelector("#colorResult");

const count = (target) => {
    const maxChar = target.getAttribute("maxlength");
    const currentChar = target.value.length;

    const count = document.querySelector("#charCount")

    if (currentChar >= maxChar) {
        preview(target)
        return count.innerHTML = `Character Count: None remaining`
    }

    let output = () => {
        count.innerHTML = `Character Count: ${maxChar - currentChar} remaining`;
        preview(target)
    }

    return output()
}

const preview = (content) => {
    const filter = new RegExp("\{[^()]+?\}", 'g');

    const unformattedColors = [...content.value.matchAll(filter)]
    const unformattedText = content.value.split(filter);

    let formattedText = "";
    let formattedColors = ["#ffffff"];
    let count = 0;

    while(match=filter.exec(unformattedColors)){
        if (match[0].slice(1,-1).length == 1 && match[0].slice(1,-1).toLowerCase() == "f") {
            formattedColors.push("#ffffff");
        } else if (match[0].slice(1,-1).length == 6) {
            formattedColors.push("#" + match[0].slice(1,-1));
        } else {
            formattedColors.push(match[0].slice(1,-1));
        }
    }

    unformattedText.forEach((string) => {
        formattedText += `<span class="inlineText" style="color:${formattedColors[count]}">${string} </span>`
        count++;
    })
    
    return showcase.innerHTML = formattedText;
}

const textSave = async (id) => {

    const original = document.getElementById(id).innerHTML;
    const idCSS = document.getElementById(id);

    switch(id) {
        case "copyInput":
            await navigator.clipboard.writeText(textArea.value);
            document.getElementById(id).innerHTML = "Copied...";
            break;
        case "downloadInput":
            document.getElementById(id).innerHTML = "Coming soon...";
            break;
        default:
    }

    document.getElementById(id).disabled = true;
    idCSS.style.pointerEvents = "none";
    idCSS.style.borderBottom = "3px solid black"

    wait(3000).then(() => {
        document.getElementById(id).innerHTML = original;
        document.getElementById(id).disabled = false;
        idCSS.style.pointerEvents = "auto";
    });
}

const bgSwitch = (id) => {
    const idCSS = document.getElementById("showcase")

    switch(id) {
        case "bg-1":
            idCSS.style.backgroundColor = "rgba(0, 0, 0, 0.644)"
            // localStorage.setItem("background", idCSS.style.background);
            break;
        case "bg-2":
            idCSS.style.backgroundColor = "rgba(106, 140, 255, 0.705)"
            // localStorage.setItem("background", idCSS.style.background);
            break;
        case "bg-3":
            idCSS.style.background = "rgba(255, 32, 32, 0.616)"
            // localStorage.setItem("background", idCSS.style.background);
            break;
        default:
    }    
}

const wait = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.getElementById("copyInput").addEventListener("click", textSave);
document.getElementById("downloadInput").addEventListener("click", textSave);

document.getElementById("bg-1").addEventListener("click", bgSwitch);
document.getElementById("bg-2").addEventListener("click", bgSwitch);
document.getElementById("bg-3").addEventListener("click", bgSwitch);

window.onload = () => {
    textArea.innerHTML = localStorage.getItem("input")
    colorPicker.value = localStorage.getItem("color")
    colorResult.innerHTML = localStorage.getItem("color")
    // document.getElementById("showcase").style.backgroundColor = localStorage.getItem("background");

    preview(textArea)
    count(textArea)
}

document.getElementById("colorResult").addEventListener("click", () => {
    const color = `{${colorPicker.value.slice(1)}}`;

    textArea.innerHTML = textArea.length <= 0 ? 
        color :
        textArea.innerHTML += color ;

    count(textArea)
    localStorage.setItem("input", textArea.value);
});

textArea.addEventListener("input", ({ currentTarget: target }) => {
    count(target)
    localStorage.setItem("input", textArea.value);
})

colorPicker.addEventListener("input", ({ currentTarget: target }) => {
    colorResult.innerHTML = target.value
    localStorage.setItem("color", target.value)
})
