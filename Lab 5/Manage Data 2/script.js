const apiKey = '';
const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

let localNews = [];

async function fetchNews() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
}

async function populateNews() {
    const newsContainer = document.getElementById('news-list');
    newsContainer.innerHTML = ''; // Clear the news container

    const news = await fetchNews();
    const allNews = [...localNews, ...news];

    allNews.forEach(article => {
        const template = document.getElementById("news-template").content.cloneNode(true);
        template.querySelector('.card-title').innerText = article.title;
        template.querySelector('.card-text').innerText = article.description || 'No description available.';
        newsContainer.appendChild(template);
    });
}

function addLocalNews(event) {
    event.preventDefault();
    const title = document.getElementById('newsTitle').value;
    const content = document.getElementById('newsContent').value;

    const newArticle = {
        title: title,
        description: content
    };

    localNews.push(newArticle);
    populateNews();
    document.getElementById('newsForm').reset();
}

let intervalId = setInterval(populateNews, 5000);

document.getElementById('newsForm').addEventListener('submit', addLocalNews);

document.getElementById('stopButton').addEventListener('click', () => {
    clearInterval(intervalId);
});

// Initial population of news
populateNews();
