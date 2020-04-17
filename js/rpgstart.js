const textElement = document.getElementById("text")
const optionButtonsElement = document.getElementById("option-buttons")

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
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

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
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
                setState: { sheets: true },
                nextText: 2
            },
            {
                text: "Go back to sleep",
                setState: { sheets: false },
                nextText: 10
            },
            {
                text: "Flick on the TV",
                setState: { sheets: false },
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
                text: "Make sweet sweet love to the head",
                requiredState: (currentState) => currentState.sheets,
                nextText: 15
            },
            {
                text: "Make a three-point effort to the bin",
                requiredState: (currentState) => currentState.sheets,
                nextText: 11
            },
            {
                text: "Kick the head out of the bed",
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
        id: 4,
        text: "You get out of bed, stretch, yawn and quickly get dressed. Noticing that it is raining outside, you step on the severed head to reach the top shelf of your wardrobe. You find exactly what you need for the weather.",
        options: [
            {
                text: "A vinyl Lionel Richie album",
                nextText: 13
            },
            {
                text: "An umbrella",
                nextText: 5
            },
        ]
    },
    {
        id: 5,
        text: "You leave home, and on your walk to the shops to grab bog roll, you pass a homeless man who smiles and waves as you approach.",
        options: [
            {
                text: "Stop and talk to him",
                nextText: 6
            },
            {
                text: "Run away",
                nextText: 9
            },
        ]
    },
    {
        id: 6,
        text: "'I betcha $5 I can tellya where you gatcha shoes'. You consider this for a moment, realizing that you bought them four years ago in Italy, something the tramp could never know.",
        options: [
            {
                text: "Agree to the deal",
                nextText: 7
            },
            {
                text: "Ignore him and walk to the shop",
                nextText: 9
            },
        ]
    },
    {
        id: 7,
        text: "'Hehe', he laughs, 'Well. You gotcha shoes on yo feet!'. You feel stupid all of a sudden and watch the gap toothed tramp grin with glee.",
        options: [
            {
                text: "Punch him",
                nextText: 14
            },
            {
                text: "Give him the $5",
                nextText: 8
            },
        ]
    },
    {
        id: 8,
        text: "He takes it, thanks you, slips it into a suspiciously expensive looking wallet and searches for his next victim.",
        options: [
            {
                text: "Walk to the shop",
                setState: { money: true },
                nextText: 9
            },
        ]
    },
    {
        id: 9,
        text: "After a few minutes you arrive at the shop. You browse through the small selection of books and see one with an odd cover featuring a tooth. Reading the blurb at the back, you see it's a grim fairy tale about a tooth fairy.",
        options: [
            {
                text: "Steal it, and the new Fifty Shades book too",
                nextText: 15
            },
            {
                text: "Get the shit roll and leave",
                nextText: 16
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
        id: 11,
        text: "It hits the bin and knocks it over, spewing your rubbish all across the floor. More things to clean. Great.",
        options: [
            {
                text: "Go back to sleep",
                nextText: 10
            },
            {
                text: "Get out of bed",
                nextText: 4
            }
        ]
    },
    {
        id: 12,
        text: "Nothing but reruns of Jerry Springer. You've never felt so bored. What to do...",
        options: [
            {
                text: "Reach under the sheets",
                setState: { sheets: true },
                nextText: 2
            },
            {
                text: "Go back to sleep",
                setState: { sheets: false },
                nextText: 10
            }
        ]
    },
    {
        id: 13,
        text: "With weather like this, you decide to stay indoors. You put Lionel on the old vinyl player, cradle the severed head to your bosom, dancing around your bedroom as the dulcet tones of the Richmeister serenade you. And they say romance is dead.",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
    },
    {
        id: 14,
        text: "The gleeful smile and most of the teeth in his head are knocked clean off, with an uppercut that knocks him off his feet. You feel better now. Someone has seen you, and they are calling for the police.",
        options: [
            {
                text: "Run like the wind!",
                nextText: 9
            },
            {
                text: "Stroll on",
                nextText: 9
            },
        ]
    },
    {
        id: 15,
        text: "Please seek help.",
        options: [
            {
                text: "The Samaritans: Call 116 123",
            },
            {
                text: "Restart",
                nextText: -1
            }
        ]
    },
    {
        id: 16,
        text: "The shop attendant sees your bloody hands, and presses the alarm. Nothing left to do but just take a dump there. Conveniently the book, ROT is nearby for additional toilet roll.",
        options: [
            {
                text: "You open your wallet to bribe her, but alas. Beggar has it.",
                requiredState: (currentState) => currentState.money,
            },
            {
                text: "Try Again",
                nextText: -1
            }
        ]
    }
];

startGame()