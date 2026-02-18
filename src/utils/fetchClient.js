
class FetchClient {

  async get(endpoint, options = {}) {
    try {
      const url = endpoint;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers || {},
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`[Error] Failed to fetch: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('[Error] Fetch Client: ', error);
      throw error;
    }
  }
}

export const fetchClient = new FetchClient();