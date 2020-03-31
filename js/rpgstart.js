const textElement = document.getElementById("text")
const optionButtonsElement = document.getElementById("option-buttons")

let state = {}

function startGame(){
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex){
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild){
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement("button")
            button.innerText = option.text
            button.classList.add("btn")
            button.addEventListener("click", () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option){
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option){
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0){
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: "You wake up with a pounding headache. You're lying in bed. You feel wetness under the sheets.",
        options: [
            {
                text: "Reach under the sheets",
                setState: {sheets: true},
                nextText: 2
            },
            {
                text: "Go back to sleep",
                setState: {sheets: false},
                nextText: 10
            },
            {
                text: "Flick on the TV",
                setState: {sheets: false},
                nextText: 12
            },
        ]
    },
    {
        id: 2,
        text: "You reach a hand under, but quickly pull it back. Your fingers appear to be covered in blood.",
        options: [
            {
                text: "Lift the sheets",
                requiredState: (currentState) => currentState.sheets,
                nextText: 3
            },
            {
                text: "Go back to sleep",
                nextText: 10
            }
        ]
    },
    {
        id: 3,
        text: "Pulling back the sheets, you are horrified to see, between your legs a severed head. And it's staring right back at you",
        options: [
            {
                text: "Make love to the head",
                requiredState: (currentState) => currentState.sheets,
                nextText: 10
            },
            {
                text: "Make a three-pointer effort to the bin",
                requiredState: (currentState) => currentState.sheets,
                nextText: 11
            },
            {
                text: "kick the head out of the bed",
                requiredState: (currentState) => currentState.sheets,
                nextText: 4
            },
            {
                text: "Go back to sleep",
                nextText: 10
            }
        ]
    },
    {
        id: 10,
        text: "You filthy beast. Enjoy your kip.",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
    },
    {
        id: 12,
        text: "Nothing but reruns of Jerry Springer. You've never felt so bored. What to do...",
        options: [
            {
                text: "Reach under the sheets",
                setState: {sheets: true},
                nextText: 2
            },
            {
                text: "Go back to sleep",
                setState: {sheets: false},
                nextText: 10
            }
        ]
    }
];

startGame()