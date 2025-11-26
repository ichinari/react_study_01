import { useEffect } from "react";
import { PokemonApi } from "./api/Pokemon";

const pokemonApi = new PokemonApi();

function App() {
  useEffect(() => {
    const fetchPokemonData = async () => {
      const pokemonData = await pokemonApi.getPokemonList();
      console.log(pokemonData);
    };
    fetchPokemonData();
  }, []);

  return (
    <>
      <div>react project</div>
    </>
  );
}

export default App;
