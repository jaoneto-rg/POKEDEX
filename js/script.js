const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form_search');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.button_prev');
const buttonNext = document.querySelector('.button_next');
const buttonShiny = document.querySelector('.button_shiny');

let currentId = 1;
let isShiny = false;

const setLoading = (isLoading) => {
    input.disabled = isLoading;
    buttonPrev.disabled = isLoading;
    buttonNext.disabled = isLoading;
};

const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

        if (!response.ok) {
            return null;
        }

        return await response.json();
    } catch (error) {
        return null;
    }
};

const renderPokemon = async (pokemon) => {
    setLoading(true);
    pokemonName.textContent = 'carregando...';
    pokemonNumber.textContent = '';
    pokemonImage.style.display = 'none';

    const data = await fetchPokemon(pokemon);

    if (!data) {
        pokemonName.textContent = 'não encontrado';
        pokemonNumber.textContent = '';
        buttonShiny.disabled = true;
        buttonShiny.setAttribute('aria-pressed', 'false');
        isShiny = false;
        setLoading(false);
        return;
    }

    const shinySprite = data.sprites.front_shiny;
    const normalSprite = data.sprites.front_default;
    const hasShiny = Boolean(shinySprite);
    const sprite = isShiny && hasShiny ? shinySprite : normalSprite;

    buttonShiny.disabled = !hasShiny;
    if (!hasShiny) {
        isShiny = false;
    }
    buttonShiny.setAttribute('aria-pressed', String(isShiny));

    if (sprite) {
        pokemonImage.style.display = 'block';
        pokemonImage.src = sprite;
        pokemonImage.alt = isShiny ? `Sprite shiny do ${data.name}` : `Sprite do ${data.name}`;
    } else {
        pokemonImage.style.display = 'none';
        pokemonImage.src = '';
        pokemonImage.alt = 'Sprite indisponível';
    }
    pokemonName.textContent = data.name;
    pokemonNumber.textContent = `${data.id} - `;

    currentId = data.id;
    input.value = '';
    setLoading(false);
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

buttonShiny.addEventListener('click', () => {
    if (buttonShiny.disabled) {
        return;
    }
    isShiny = !isShiny;
    renderPokemon(currentId);
});

renderPokemon(currentId);
