const data = [
    {
        name: 'Hugh Jas',
        age: 32,
        gender: "male",
        lookingfor: "female",
        location: "Dublin",
        image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
        name: 'Nathan Downbelow',
        age: 43,
        gender: "male",
        lookingfor: "female",
        location: "Belfast",
        image: "https://randomuser.me/api/portraits/men/11.jpg"
    },
    {
        name: 'Ami Foxalot',
        age: 24,
        gender: "female",
        lookingfor: "male",
        location: "Cork",
        image: "https://randomuser.me/api/portraits/women/14.jpg"
    },
    {
        name: 'Liz Bein',
        age: 32,
        gender: "female",
        lookingfor: "female",
        location: "Dublin",
        image: "https://randomuser.me/api/portraits/women/51.jpg"
    },
    {
        name: 'Micky One-Eye',
        age: 35,
        gender: "male",
        lookingfor: "female",
        location: "Dublin",
        image: "https://randomuser.me/api/portraits/men/35.jpg"
    },
    {
        name: 'Dr Amanda Huggenpoke',
        age: 32,
        gender: "female",
        lookingfor: "female",
        location: "Dublin",
        image: "https://randomuser.me/api/portraits/women/16.jpg"
    },
    {
        name: 'Dr Pen Il-Wart',
        age: 52,
        gender: "male",
        lookingfor: "male",
        location: "Galway",
        image: "https://randomuser.me/api/portraits/men/19.jpg"
    }
];

const profiles = profileIterator(data);

// Call first person
nextProfile();

// Next event
document.getElementById('next').addEventListener('click', nextProfile);

// Next profile display
function nextProfile() {
    const currentProfile = profiles.next().value;

    if(currentProfile !== undefined) {
        document.getElementById('profileDisplay').innerHTML = `
        <ul class="list-group">
            <li class="list-group-item">Name: ${currentProfile.name}</li>
            <li class="list-group-item">Age: ${currentProfile.age}</li>
            <li class="list-group-item">Location: ${currentProfile.location}</li>
            <li class="list-group-item">Preference: ${currentProfile.gender} looking for ${currentProfile.lookingfor}</li>
        </ul>
        `;

        document.getElementById('imageDisplay').innerHTML = `
            <img src="${currentProfile.image}">
        `;
    } else {
        // No more profiles
        window.location.reload();
    }
}

// Profile iterator
function profileIterator(profiles) {
    let nextIndex = 0;

    return {
        next: function() {
            return nextIndex < profiles.length ? 
            { value: profiles[nextIndex++], done: false } : 
            { done: true }
        }
    };
}