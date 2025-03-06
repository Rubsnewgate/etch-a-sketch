// Dom elements and default size of the canvas
let gridSize = 16
let rainbowPencil = false

const domElements = {
    // app sections
    welcomeSection: document.querySelector('.welcome-section'),
    canvasSection: document.querySelector('.etch-a-sketch'),
    canvas: document.querySelector('.canvas'),
    canvasControls: document.querySelector('.controls'),

    // app buttons
    updateGridSize: document.querySelector('.update-grid'),
    rainbowPencil: document.querySelector('.rainbow-pencil'),
    startDrawing: document.querySelector('.start-drawing'),
    restartApp: document.querySelector('.restart'),

    // input for user desired grid size
    userDesireSize: document.getElementById('user-desired-size'),
    errorMessage: document.querySelector('.error-message'),
}

// utility functions
const displaySection = (section) => {
    section.classList.toggle('hidden')
}

function setGridSize () {
    const errorMessage = domElements.errorMessage
    const userDesireSize = parseInt(domElements.userDesireSize.value)

    if(userDesireSize <= 0 || userDesireSize > 100) {
        errorMessage.style.display = 'block'
    }
    else {
        errorMessage.style.display = 'none'
        gridSize = userDesireSize
    }
}

function createCanvas (gridSize) {
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div')

        // class for coloring the div in the canvas
        cell.classList.add('cell')

        cell.style.flex = `0 0 calc(100% / ${gridSize})`
        cell.style.height = `calc(100% / ${gridSize})`
        cell.style.border = '1px solid #ccc'

        domElements.canvas.appendChild(cell)
    }
}

function startDrawing () {
    const welcomeSection = domElements.welcomeSection
    const canvasSection = domElements.canvasSection
    const canvasControls = domElements.canvasControls

    displaySection(welcomeSection)
    displaySection(canvasSection)
    displaySection(canvasControls)

    const cells = document.querySelectorAll('.cell')

    if (rainbowPencil) {
        cells.forEach((cell) => {
            cell.addEventListener('mouseover', () => {
                const red = Math.floor(Math.random() * 256)
                const green = Math.floor(Math.random() * 256)
                const blue = Math.floor(Math.random() * 256)

                cell.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
            })
        })
    }
    else {
        cells.forEach((cell) => {
            cell.addEventListener('mouseover', () => {
                cell.style.backgroundColor = '#000'
            })
        })
    }
}

// buttons event handler
domElements.updateGridSize.addEventListener('click', setGridSize())

domElements.rainbowPencil.addEventListener('click', () => {
    rainbowPencil = true
})

domElements.startDrawing.addEventListener('click', () => {
    domElements.canvas.innerHTML = ''

    createCanvas(gridSize)
    startDrawing()
})

domElements.restartApp.addEventListener('click', () => {
    window.location.reload()
})