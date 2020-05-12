// Init Github
const github = new Github;
// Init UI
const ui = new UI;

// Search Input
const searchUser = document.getElementById('searchUser');

// Search Input event listener
searchUser.addEventListener('keyup', (e) => {
  // Get input text
  const userText = e.target.value;

  if(userText !== '') {
    // Make HTTP call
    Github.getUser(userText)
    .then(data => {
        if(data.profile.message === 'Not found') {
            // Show alert

        } else {
            // Show profile
            ui.showProfile(data.profile);
        }
    })
  }
  else {
      // Clear profile
  }
});