import { useEffect, useState } from "react";
import { PokemonApi } from "../api/Pokemon";
import { Link } from "react-router-dom";

const pokemonApi = new PokemonApi();

function List() {
  const dammyImageUrl = "https://placehold.jp/3d4070/ffffff/150x150.png?text=";

  const [isLoading, setIsLoading] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      setIsLoading(true);

      const result = await pokemonApi.getPokemonList();

      setPokemonList(result.results);
      setIsLoading(false);
    };
    fetchPokemonData();
  }, []);

  return (
    <>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="text-1xl flex flex-wrap gap-5">
            {pokemonList.map((pokemon) => (
              <div
                key={pokemon.name}
                className="w-40 border-2 border-gray-300 rounded-md p-5 text-center grid gap-y-3"
              >
                <img src={dammyImageUrl + pokemon.name} alt={pokemon.name} />
                <p className="text-1xl font-bold">{pokemon.name}</p>
                <Link
                  to={`/pokemon/${pokemon.name}`}
                  className="text-sm text-blue-500 hover:text-blue-600"
                >
                  detail here
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default List;
