const form = document.getElementById("form")

const inputColor = document.getElementById("input-color")
let seedColor = ""

const modeInput = document.getElementById("color-mode")
const colorMode = modeInput.value

const getSchemeButton = document.getElementById("get-scheme-button")

const colors = document.getElementById("colors")
const colorView = document.getElementById("color-view")
const colorHex = document.getElementById("color-hex")

inputColor.addEventListener("change", function(e) {
    const color = e.target.value
    seedColor = color.slice(1)
    console.log(seedColor)
})

getSchemeButton.addEventListener("click", function(e) {
    e.preventDefault

    console.log(seedColor)
    console.log(colorMode)

    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${colorMode}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            renderColor(data.colors)
        } )
})

function renderColor(colorScheme) {
    console.log(colorScheme)
    
    for (let color of colorScheme) {
        console.log(color.hex.value)

        // colorView.innerHTML +=`
        //     <img src="#" class="color-image">`

        colorView.innerHTML +=`
            <p class="color-image" style="background: ${color.hex.value}">Color</p>`
        
        colorHex.innerHTML += `
            <p>${color.hex.value}</p>`

        // document.querySelector(".color-image").style.background = `${color.hex.value}`
    }
}
