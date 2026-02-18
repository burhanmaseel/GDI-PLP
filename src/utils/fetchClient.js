/**
 * A simple fetch client to handle GET API requests
 */
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
      throw new Error(`[Error]: ${error.message}`);
    }
  }
}

// Export the FetchClient class for unit tests
export { FetchClient };

// Export a singleton instance for use in the app
export const fetchClient = new FetchClient();
