document.addEventListener("DOMContentLoaded", function () {
  // Función para añadir una tarjeta, recibiendo título y texto como parámetros
  function addCard(title, text) {
    // Clonar el contenido de la plantilla
    const template = document
      .getElementById("card-template")
      .content.cloneNode(true);
    // Asignar el título y el texto proporcionado a los elementos correspondientes
    template.querySelector(".card-title").innerText = title;
    template.querySelector(".card-text").innerText = text;
    // Añadir la tarjeta al contenedor
    document.querySelector("#card-list").appendChild(template);
  }

  // Añadir una tarjeta de ejemplo con contenido dinámico
  addCard("Dynamic Title", "Dynamic text content");
});
