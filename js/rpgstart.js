document.getElementById("profile").addEventListener("submit", function(e) {
    const name = document.getElementById('name'),
    age = document.getElementById('age'),
    height = document.getElementById('height'),
    fear = document.getElementById('fear'),
    message = document.getElementById('message');

    document.getElementById('profile').style.display = 'none';
    document.getElementById('begin').style.display = 'block';
    document.getElementById('header').innerHTML = `Embark on a journey young ${name}`;

    e.preventDefault();
});

