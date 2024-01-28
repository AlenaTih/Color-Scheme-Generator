// const form = document.getElementById("form")

const inputColor = document.getElementById("input-color")
let seedColor = ""

const getSchemeButton = document.getElementById("get-scheme-button")

const colors = document.getElementById("colors")
const colorView = document.getElementById("color-view")
const colorHex = document.getElementById("color-hex")
const colorValue = document.getElementById("color-value")

const snackEl = document.getElementById("snackbar")

document.addEventListener("click", function(e) {
    if (e.target.dataset.image) {
        copyToClipboard(e.target.dataset.image)
    } else if (e.target.dataset.hex) {
        copyToClipboard(e.target.dataset.hex)
    } else if (e.target.id === "get-scheme-button") {
        e.preventDefault()
        fetchColors()
    }
})

inputColor.addEventListener("change", function(e) {
    const color = e.target.value
    seedColor = color.slice(1)
})

function fetchColors() {
    const modeInput = document.getElementById("color-mode")
    const colorMode = modeInput.value

    if (seedColor & colorMode) {
        fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${colorMode}`)
        .then(response => response.json())
        .then(data => {
            renderColors(data.colors)
        })
    } else if (seedColor) {
        fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}`)
        .then(response => response.json())
        .then(data => {
            renderColors(data.colors)
        })
    } else {
        alert("Please select a base color and a color mode ❤️")
    }

    // form.reset()
}

function renderColors(colorScheme) {

    colorView.innerHTML = ""
    colorHex.innerHTML = ""
    
    for (let color of colorScheme) {
        const hexValue = color.hex.value

        colorView.innerHTML +=`
            <span class="color-image"
                data-image="${hexValue}"
                style="background: ${hexValue}">
            </span>`
        
        colorHex.innerHTML += `
            <p data-hex="${hexValue}">${hexValue}</p>`

    }
}


function copyToClipboard(value) {
    navigator.clipboard.writeText(value).then( function() {
        showSnackbar(value)
    })
  }

function showSnackbar(value) {
    snackEl.className = "show"
    setTimeout( function() {
        snackEl.className = snackEl.className.replace("show", "")
    }, 3000)
    colorValue.textContent = value
  }
