document.addEventListener('DOMContentLoaded', function() {
    // Objeto con datos del artista y su portafolio
    const artist = {
        name: "Van Gogh",
        portfolio: [
            {title: "portrait", url: "https://collectionapi.metmuseum.org/api/collection/v1/iiif/436532/1671316/main-image"},
            {title: "sky", url: "https://mymodernmet.com/wp/wp-content/uploads/2020/11/White-house-night-van-goh-worldwide-2.jpg"},
        ]
    };

    // Función para añadir una tarjeta de artista, recibiendo título y texto como parámetros
    function addCard(title, text) {
        const template = document.getElementById("card-template").content.cloneNode(true);
        template.querySelector('.card-title').innerText = title;
        template.querySelector('.card-text').innerText = text;
        document.querySelector('#card-list').appendChild(template);
    }

    // Función para añadir una tarjeta de portafolio, recibiendo título e imagen como parámetros
    function addPortfolioItem(title, imageUrl) {
        const template = document.getElementById("portfolio-template").content.cloneNode(true);
        template.querySelector('.card-title').innerText = title;
        template.querySelector('img').src = imageUrl;
        document.querySelector('#card-list').appendChild(template);
    }

    // Añadir tarjeta del perfil del artista
    addCard(artist.name, "Artist Profile");

    // Añadir tarjetas del portafolio del artista
    artist.portfolio.forEach(item => {
        addPortfolioItem(item.title, item.url);
    });
});
