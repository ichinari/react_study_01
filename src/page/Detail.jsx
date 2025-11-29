import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PokemonApi } from "../api/Pokemon";
import DetailContent from "../components/DetailContent";

const pokemonApi = new PokemonApi();

function Detail() {
  const { name } = useParams();
  const navigate = useNavigate();

  const [pokemonDetail, setPokemonDetail] = useState(null);

  useEffect(() => {
    const fetchPokemonDetailData = async () => {
      const result = await pokemonApi.getPokemonDetail(name);
      setPokemonDetail(result);
    };
    fetchPokemonDetailData();
  }, [name]);
  return (
    <>
      <div className="mx-10 my-10 p-10 flex flex-col items-center gap-y-3 border-2 border-gray-300 rounded-md shadow-md">
        {pokemonDetail && (
          <div className="flex flex-col items-center gap-y-3">
            <img
              src={pokemonDetail.sprites.front_default}
              alt={name}
              width={150}
              height={150}
            />

            <div className="text-2xl font-bold border-bottom border-gray-300">
              <p>{name}</p>
            </div>

            <div className="flex flex-col items-center gap-y-3">
              <DetailContent title="Type">
                {pokemonDetail.types.map((type) => (
                  <li key={type.type.name}>{type.type.name}</li>
                ))}
              </DetailContent>

              <DetailContent title="Height">
                <li>{pokemonDetail.height}</li>
              </DetailContent>

              <DetailContent title="Weight">
                <li>{pokemonDetail.weight}</li>
              </DetailContent>

              <DetailContent title="Ability">
                {pokemonDetail.abilities.map((ability) => (
                  <li key={ability.ability.name}>{ability.ability.name}</li>
                ))}
              </DetailContent>
            </div>
          </div>
        )}
      </div>
      <div className="text-center">
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
