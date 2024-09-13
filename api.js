const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function getPokemonInfo(pokemonName) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Pokémon ${pokemonName} não encontrado.`);
    }

    const pokemonData = await response.json();

    const pokemonInfo = {
      name: pokemonData.name,
      id: pokemonData.id,
      height: pokemonData.height,
      weight: pokemonData.weight,
      types: pokemonData.types.map(t => t.type.name),
    };

    console.log(pokemonInfo);
  } catch (error) {
    console.error(error.message);
  }
}

rl.question("Digite o nome do Pokémon: ", (pokemonName) => {
  getPokemonInfo(pokemonName);
  rl.close();
});
