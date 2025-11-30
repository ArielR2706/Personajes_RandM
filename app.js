// Referencias al DOM
const btnGenerate = document.getElementById('btn-generate');
const charName = document.getElementById('char-name');
const charStatus = document.getElementById('char-status');
const charImg = document.getElementById('char-img');

// Función para obtener un número aleatorio entre 1 y 826 (Total de personajes)
const getRandomId = () => Math.floor(Math.random() * 826) + 1;

// Función asíncrona para llamar a la API
async function getCharacter() {
    const id = getRandomId();
    const url = `https://rickandmortyapi.com/api/character/${id}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Actualizar el DOM con los datos recibidos
        charName.textContent = data.name;
        charStatus.textContent = `Estado: ${data.status} - Especie: ${data.species}`;
        charImg.src = data.image;
        
    } catch (error) {
        console.error('Error al obtener el personaje:', error);
        charName.textContent = "Error al cargar";
    }
}

// Event Listener para el botón
btnGenerate.addEventListener('click', getCharacter);