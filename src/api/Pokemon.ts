import ApiClient from "./index";

// 取得
interface GetPokemonListType {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

const pokeApiUrl = "https://pokeapi.co/api/v2/";

export class PokemonApi extends ApiClient {
  constructor() {
    super(pokeApiUrl, {});
  }

  async getPokemonList(url, signal?: AbortSignal) {
    return await this.get<any>(url, signal);
  }

  async getPokemonDetail(name, signal?: AbortSignal) {
    return await this.get<any>(`pokemon/${name}`, signal);
  }
}
