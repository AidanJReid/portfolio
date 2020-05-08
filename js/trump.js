document.querySelector(".get-quotes").addEventListener('click', getQuotes);

function getQuotes(e) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', `https://api.tronalddump.io/random/quote`, true);

  xhr.onload = function() {
      if (this.status === 200) {
          const response = JSON.parse(this.responseText);

          let output = `
          <p>${response.value}</p>
          <small>Said it: ${response.appeared_at}</small>`;
          
          document.querySelector(".quotes").innerHTML = output;
    }
  }
  
  xhr.send();

  e.preventDefault();
}