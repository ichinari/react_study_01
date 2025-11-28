import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PokemonApi } from "../api/Pokemon";

const pokemonApi = new PokemonApi();

function Detail() {
  const { name } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemonDetailData = async () => {
      const result = await pokemonApi.getPokemonDetail(name);
      console.log(result);
    };
    fetchPokemonDetailData();
  }, [name]);
  return (
    <>
      <div>
        <p className="mb-4 text-2xl">
          Pokemon name: <span className="font-bold">{name}</span>
        </p>
        <button
          onClick={() => navigate("/")}
          className="text-blue-500 hover:text-blue-600 underline"
        >
          back
        </button>
      </div>
    </>
  );
}
export default Detail;
