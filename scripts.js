const postsContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 5;
let page = 1;


// Fetch posts from API
async function getPosts() {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    );
    
    const data = await res.json();
    return data;
    
}


//show posts in DOM feed
async function showPosts(){
    const posts = await getPosts();

    posts.forEach( post => {
        const postEl = document.createElement("div");
        postEl.classList.add("post");
        postEl.innerHTML = `
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
            `;

    postsContainer.appendChild(postEl);
    })
}


//show loader and fetch more posts
function showLoading() {
    loading.classList.add('show');
    console.log(loading);
  
    setTimeout(() => {
      loading.classList.remove('show');
  
      setTimeout(() => {
        page++;
        showPosts();
      }, 300);
    }, 1000);
  }

// Filter posts by input
function filterPosts(event) {
    const term = event.target.value.toUpperCase();
    const posts = document.querySelectorAll(".post");
  
    posts.forEach(post => {
      const title = post.querySelector(".post-title").innerText.toUpperCase();
      const body = post.querySelector(".post-body").innerText.toUpperCase();
  
      if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
        post.style.display = "flex";
      } else {
        post.style.display = "none";
      }
    });
  }

//show inital posts
showPosts();


window.addEventListener("scroll", () => {
    // the documentElement is the entire HTML page. 
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    
// Looking below, these variable explain what is going on in the top const. 
    // const scrollTop = document.documentElement.scrollTop;
    // const scrollHeight = document.documentElement.scrollHeight;
    // const clientHeight = document.documentElement.clientHeight;

    if(scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading();
    }

})


filter.addEventListener("input", filterPosts);
