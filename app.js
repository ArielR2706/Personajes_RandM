// Referencias al DOM
const btnGenerate = document.getElementById('btn-generate');
const charName = document.getElementById('char-name');
const charStatus = document.getElementById('char-status');
const charSpecies = document.getElementById('char-species');
const charGender = document.getElementById('char-gender');
const charOrigin = document.getElementById('char-origin');
const charImg = document.getElementById('char-img');

// Diccionarios para traducción manual
const traducciones = {
    status: {
        'Alive': 'Vivo',
        'Dead': 'Muerto',
        'unknown': 'Desconocido'
    },
    species: {
        'Human': 'Humano',
        'Alien': 'Alienígena',
        'Humanoid': 'Humanoide',
        'Robot': 'Robot',
        'Animal': 'Animal',
        'Cronenberg': 'Cronenberg',
        'Mythological Creature': 'Criatura Mitológica'
    },
    gender: {
        'Male': 'Masculino',
        'Female': 'Femenino',
        'Genderless': 'Sin género',
        'unknown': 'Desconocido'
    }
};

const getRandomId = () => Math.floor(Math.random() * 826) + 1;

async function getCharacter() {
    const id = getRandomId();
    const url = `https://rickandmortyapi.com/api/character/${id}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Actualizar datos básicos
        charName.textContent = data.name;
        charImg.src = data.image;
        
        // Traducir y mostrar datos (Si no existe la traducción, muestra el original)
        charStatus.textContent = traducciones.status[data.status] || data.status;
        charSpecies.textContent = traducciones.species[data.species] || data.species;
        charGender.textContent = traducciones.gender[data.gender] || data.gender;
        
        // El origen es un objeto dentro de data, accedemos a su nombre
        charOrigin.textContent = data.origin.name;

        // Cambiar color del texto de estado según si está vivo o muerto
        if (data.status === 'Alive') charStatus.className = 'text-success fw-bold';
        else if (data.status === 'Dead') charStatus.className = 'text-danger fw-bold';
        else charStatus.className = 'text-secondary fw-bold';
        
    } catch (error) {
        console.error('Error:', error);
        charName.textContent = "Error al cargar";
    }
}

// Cargar un personaje al iniciar la página
window.addEventListener('load', getCharacter);
btnGenerate.addEventListener('click', getCharacter);