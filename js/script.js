const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form_search');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.button_prev');
const buttonNext = document.querySelector('.button_next');

let currentId = 1;

const fetchPokemon = async (pokemon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (!response.ok) {
        return null;
    }

    return await response.json();
};

const renderPokemon = async (pokemon) => {
    pokemonName.textContent = 'carregando...';
    pokemonNumber.textContent = '';
    pokemonImage.style.display = 'none';

    const data = await fetchPokemon(pokemon);

    if (!data) {
        pokemonName.textContent = 'não encontrado';
        pokemonNumber.textContent = '';
        return;
    }

    const sprite = data.sprites.front_default;

    pokemonImage.style.display = 'block';
    pokemonImage.src = sprite || '';
    pokemonName.textContent = data.name;
    pokemonNumber.textContent = `${data.id} - `;

    currentId = data.id;
    input.value = '';
};

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (input.value.trim()) {
        renderPokemon(input.value.trim().toLowerCase());
    }
});

buttonPrev.addEventListener('click', () => {
    if (currentId > 1) {
        renderPokemon(currentId - 1);
    }
});

buttonNext.addEventListener('click', () => {
    renderPokemon(currentId + 1);
});

renderPokemon(currentId);
