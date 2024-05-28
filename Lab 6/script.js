document.addEventListener('DOMContentLoaded', () => {
    fetchPosts();
});

async function fetchPosts() {
    const limit = 10;
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`);
    const posts = await response.json();
    displayPosts(posts);
}

function displayPosts(posts) {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const card = document.createElement('div');
        card.classList.add('col', 'mb-4');

        card.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.body}</p>
                </div>
            </div>
        `;

        postsContainer.appendChild(card);
    });
}
