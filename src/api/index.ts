import ky from "ky";

export default class ApiClient {
  protected prefixUrl: string;
  protected headers: Record<string, string>;
  protected api: ReturnType<typeof ky.create>;

  constructor(prefixUrl: string, headers: Record<string, string> = {}) {
    this.prefixUrl = prefixUrl;
    this.headers = headers;
    this.api = this.kyCreate();
  }

  async get<T>(url: string, signal?: AbortSignal): Promise<T> {
    return this.api.get<T>(url, { signal }).json();
  }

  // TODO: dataの型を定義
  async post<T>(url: string, data: unknown): Promise<T> {
    return this.api.post<T>(url, { json: data }).json();
  }

  // TODO: dataの型を定義
  async put<T>(url: string, data: unknown): Promise<T> {
    return this.api.put<T>(url, { json: data }).json();
  }

  async delete<T>(url: string): Promise<T> {
    return this.api.delete<T>(url).json();
  }

  private kyCreate() {
    return ky.create({
      prefixUrl: this.prefixUrl,
      headers: {
        Accept: "application/json",
        ...this.headers,
      },
    });
  }
}
