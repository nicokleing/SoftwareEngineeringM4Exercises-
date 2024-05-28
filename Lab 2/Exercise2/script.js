//Plantilla para las tarjetas

document.addEventListener('DOMContentLoaded', function() {
    // Array con datos de ejemplo
    const data = [
        {name: 'bob', age: 23},
        {name: 'alice', age: 39}
    ];
    
    // Función para añadir una tarjeta, recibiendo título y texto como parámetros
    function addCard(title, text) {
        // Clonar el contenido de la plantilla
        const template = document.getElementById("card-template").content.cloneNode(true);
        // Asignar el título y el texto proporcionado a los elementos correspondientes
        template.querySelector('.card-title').innerText = title;
        template.querySelector('.card-text').innerText = text;
        // Añadir la tarjeta al contenedor
        document.querySelector('#card-list').appendChild(template);
    }
    
    // Iterar sobre cada elemento del array y añadir una tarjeta para cada uno
    data.forEach(item => {
        addCard(item.name, `Age: ${item.age}`);
    });
});
