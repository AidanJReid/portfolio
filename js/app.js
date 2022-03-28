$(function() {
    $('#bias').change(function() {
      $('.mking').toggle();
      $('.cod').toggle();
    });
    });

// $(function() {
//     $('.accy').collapse('toggle');
// });

$('.popover-dismiss').popover({
  trigger: 'focus'
})

$(function () {
  $('[data-toggle="popover"]').popover()
})

$(".flipper").click(function() {
  var target = $( event.target );
  if ( target.is("button") ) {
    //follow that link
    $(this).toggleClass("flip");
  } else {
    return true;
  }
  return false;
});

async function gql(query, variables={}) {
  const data = await fetch('https://api.hashnode.com/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          query,
          variables
      })
  });

  return data.json();
}

const GET_USER_ARTICLES = `
    query GetUserArticles($page: Int!) {
        user(username: "aidanreid") {
            publication {
                posts(page: $page) {
                    title
                    brief
                    coverImage
                    slug
                }
            }
        }
    }
`;

// gql(GET_USER_ARTICLES, { page: 0 })
//     .then(result => {
//         const articles = result.data.user.publication.posts;
//         let container = document.createElement('div');

//         articles.forEach(article => {
//             let title = document.createElement('h2');
//             title.innerText = article.title;

//             let brief = document.createElement('p');
//             brief.innerText = article.brief;

//             let link = document.createElement('a');
//             link.innerText = 'Read more...';
//             link.href = `https://blog.aidanreid.com/${article.slug}`;

//             container.appendChild(title);
//             container.appendChild(brief);
//             container.appendChild(link);
//         })

//         document.querySelector('.app').appendChild(container);
// });

// document.getElementById('articles').parentNode.innerHTML = `
// <div class="app">
//     <h1 class="app-heading text-center">Latest Blog Posts</h1>
// </div>`;