// Referencias al DOM
const btnGenerate = document.getElementById('btn-generate');
const btnSearch = document.getElementById('btn-search'); // Nuevo
const inputSearch = document.getElementById('char-input'); // Nuevo
const loader = document.getElementById('loader'); // Nuevo
const charName = document.getElementById('char-name');
const charStatus = document.getElementById('char-status');
const charSpecies = document.getElementById('char-species');
const charGender = document.getElementById('char-gender');
const charOrigin = document.getElementById('char-origin');
const charImg = document.getElementById('char-img');

const traducciones = {
    status: { 'Alive': 'Vivo', 'Dead': 'Muerto', 'unknown': 'Desconocido' },
    species: { 'Human': 'Humano', 'Alien': 'Alienígena', 'Humanoid': 'Humanoide', 'Robot': 'Robot', 'Animal': 'Animal', 'Cronenberg': 'Cronenberg', 'Mythological Creature': 'Criatura Mitológica' },
    gender: { 'Male': 'Masculino', 'Female': 'Femenino', 'Genderless': 'Sin género', 'unknown': 'Desconocido' }
};

const getRandomId = () => Math.floor(Math.random() * 826) + 1;

// Modificamos la función para aceptar un ID opcional
async function getCharacter(id = null) {
    // Si no dan ID, generamos uno aleatorio
    const characterId = id || getRandomId();
    const url = `https://rickandmortyapi.com/api/character/${characterId}`;

    // Mostrar Loader y Ocultar imagen temporalmente
    loader.classList.remove('d-none');
    charImg.style.opacity = '0.5';

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Personaje no encontrado');
        
        const data = await response.json();

        charName.textContent = data.name;
        charImg.src = data.image;
        
        charStatus.textContent = traducciones.status[data.status] || data.status;
        charSpecies.textContent = traducciones.species[data.species] || data.species;
        charGender.textContent = traducciones.gender[data.gender] || data.gender;
        charOrigin.textContent = data.origin.name;

        if (data.status === 'Alive') charStatus.className = 'text-success fw-bold';
        else if (data.status === 'Dead') charStatus.className = 'text-danger fw-bold';
        else charStatus.className = 'text-secondary fw-bold';
        
    } catch (error) {
        console.error('Error:', error);
        charName.textContent = "No encontrado / Error";
        charImg.src = "https://via.placeholder.com/300?text=Error";
    } finally {
        // Ocultar loader al finalizar
        loader.classList.add('d-none');
        charImg.style.opacity = '1';
    }
}

// Evento: Botón Aleatorio
btnGenerate.addEventListener('click', () => getCharacter());

// NUEVO: Evento Botón Buscar
btnSearch.addEventListener('click', () => {
    const id = inputSearch.value;
    if (id > 0 && id <= 826) {
        getCharacter(id);
    } else {
        alert("Por favor ingresa un ID válido (1 - 826)");
    }
});

// NUEVO: Permitir buscar con la tecla Enter
inputSearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        btnSearch.click();
    }
});

// Cargar inicial
window.addEventListener('load', () => getCharacter());