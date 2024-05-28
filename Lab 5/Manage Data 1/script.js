const apiKey = '';
const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

async function fetchNews() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
}

async function populateNews() {
    const newsContainer = document.getElementById('news-list');
    newsContainer.innerHTML = ''; // Clear the news container

    const news = await fetchNews();

    news.forEach(article => {
        const template = document.getElementById("news-template").content.cloneNode(true);
        template.querySelector('.card-title').innerText = article.title;
        template.querySelector('.card-text').innerText = article.description || 'No description available.';
        newsContainer.appendChild(template);
    });
}

// Initial population of news
populateNews();

// Set up interval to refresh news every 5 seconds
setInterval(populateNews, 5000);
