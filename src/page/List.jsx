import { useEffect, useState, useMemo } from "react";
import { PokemonApi } from "../api/Pokemon";
import { Link } from "react-router-dom";
import { useLoading } from "../context/useLoading";

const pokemonApi = new PokemonApi();

function List() {
  const dammyImageUrl = "https://placehold.jp/3d4070/ffffff/150x150.png?text=";
  const { setIsLoading } = useLoading();
  const [searchData, setSearchData] = useState({ name: "" });
  // pokemon list data
  const [pokemonList, setPokemonList] = useState([]);
  // pagination data
  const [pagination, setPagination] = useState({
    previous: null,
    next: null,
  });

  // pagination disabled state
  const isPreviousDisabled = useMemo(() => {
    return pagination.previous === null;
  }, [pagination.previous]);

  const isNextDisabled = useMemo(() => {
    return pagination.next === null;
  }, [pagination.next]);

  const isNameSearchDisabled = useMemo(() => {
    return searchData.name === "";
  }, [searchData.name]);

  // search handlers
  const handleSearch = async () => {
    try {
      setIsLoading(true);

      const result = await pokemonApi.getPokemonList(
        `pokemon/${searchData.name}`
      );

      setPokemonList(result.forms);
      setPagination({
        previous: null,
        next: null,
      });

      setIsLoading(false);
    } catch (error) {
      console.warn(error);
      setIsLoading(false);
    }
  };
  // pagination handlers
  const handlePrevious = () => {
    setPokemonList([]);
    // v2/以降の文字列取得したい
    const url = pagination.previous.split("v2/")[1];
    fetchPaginationData(url);
  };
  const handleNext = () => {
    setPokemonList([]);
    const url = pagination.next.split("v2/")[1];
    fetchPaginationData(url);
  };

  // pagination data fetch process
  const fetchPaginationData = async (url) => {
    try {
      setIsLoading(true);

      const result = await pokemonApi.getPokemonList(url);

      setFetchData(result);
      setIsLoading(false);
    } catch (error) {
      console.warn(error);
      setIsLoading(false);
    }
  };

  const setFetchData = (result) => {
    setPokemonList(result.results);
    setPagination({
      previous: result.previous,
      next: result.next,
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchPokemonData = async () => {
      try {
        setIsLoading(true);

        const INITIAL_URL = "pokemon";
        const result = await pokemonApi.getPokemonList(
          INITIAL_URL,
          controller.signal
        );

        setFetchData(result);
        setIsLoading(false);
      } catch (error) {
        // AbortErrorは無視（クリーンアップによる正常なキャンセル）
        if (error.name !== "AbortError") {
          console.error("Fetch error:", error);
        }
        setIsLoading(false);
      }
    };

    fetchPokemonData();

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="px-10 py-10">
        <div className="flex flex-col gap-2 mb-5">
          <div className="text-1xl font-bold">pokemno name</div>
          <div>
            <input
              type="text"
              placeholder="name"
              className="border-2 border-gray-300 rounded-md p-2 mr-2"
              value={searchData.name}
              onChange={(e) => setSearchData({ name: e.target.value })}
            />
            <button
              className={
                isNameSearchDisabled
                  ? "text-gray-400 cursor-not-allowed rounded-md p-2 bg-gray-300"
                  : "bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600"
              }
              disabled={isNameSearchDisabled}
              onClick={() => {
                handleSearch();
              }}
            >
              Search
            </button>
          </div>
        </div>

        {pokemonList && (
          <div>
            <div className="text-1xl flex flex-wrap gap-5 mb-5">
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

            <div className="flex justify-center gap-2">
              <button
                className={
                  isPreviousDisabled
                    ? "text-gray-400 cursor-not-allowed mr-10"
                    : "text-blue-500 hover:text-blue-600 mr-10"
                }
                disabled={isPreviousDisabled}
                onClick={() => {
                  handlePrevious();
                }}
              >
                Previous
              </button>
              <button
                className={
                  isNextDisabled
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-500 hover:text-blue-600"
                }
                disabled={isNextDisabled}
                onClick={() => {
                  handleNext();
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default List;
