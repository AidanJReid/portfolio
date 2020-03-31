document.getElementById("profile").addEventListener("submit", function(e) {
    this.name = document.getElementById('name'),
    this.age = document.getElementById('age'),
    this.height = document.getElementById('height'),
    this.fear = document.getElementById('fear'),
    this.message = document.getElementById('message');

    document.getElementById('profile').style.display = 'none';
    document.getElementById('header').style.display = 'none';
    document.getElementById('begin').style.display = 'block';
    document.getElementById('begin').innerHTML = `Embark on a journey young ${name}`;

    e.preventDefault();
});

