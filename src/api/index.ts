import ky from "ky";

export default class ApiClient {
  protected prefixUrl: string;
  protected headers: Record<string, string>;
  protected api: ReturnType<typeof ky.create>;

  constructor(prefixUrl: string, headers: Record<string, string> = {}) {
    this.prefixUrl = prefixUrl;
    this.headers = headers;
    this.api = ky.create({
      prefixUrl,
      headers: {
        Accept: "application/json",
        ...headers,
      },
    });
  }

  async get<T>(url: string | null = null): Promise<T> {
    return this.api.get<T>(url ?? "").json();
  }

  async post<T>(url: string, data: unknown): Promise<T> {
    return this.api.post<T>(url, { json: data }).json();
  }

  async put<T>(url: string, data: unknown): Promise<T> {
    return this.api.put<T>(url, { json: data }).json();
  }

  async delete<T>(url: string): Promise<T> {
    return this.api.delete<T>(url).json();
  }
}
