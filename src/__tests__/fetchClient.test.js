import { FetchClient } from '../utils/fetchClient.js';

describe('FetchClient', () => {
    let client;

    beforeEach(() => {
        client = new FetchClient();
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('returns parsed JSON on a successful 200 response', async () => {
        const mockPayload = { products: [{ id: 1, title: 'Widget' }], total: 1 };

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockPayload,
        });

        const result = await client.get('https://dummyjson.com/products?limit=1&skip=0');

        expect(result).toEqual(mockPayload);
    });

    it('calls fetch with the correct URL', async () => {
        const url = 'https://dummyjson.com/products?limit=16&skip=0';

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({}),
        });

        await client.get(url);

        expect(global.fetch).toHaveBeenCalledWith(
            url,
            expect.objectContaining({ method: 'GET' })
        );
    });

    it('throws an error when the response status is not ok (e.g. 404)', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: false,
            status: 404,
        });

        await expect(client.get('https://dummyjson.com/products?limit=16&skip=0')).rejects.toThrow(
            '[Error]: [Error] Failed to fetch: 404'
        );
    });

    it('throws an error when the response status is 500', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: false,
            status: 500,
        });

        await expect(client.get('https://dummyjson.com/products?limit=16&skip=0')).rejects.toThrow(
            '[Error]: [Error] Failed to fetch: 500'
        );
    });

    it('throws an error with the message from the server', async () => {
        global.fetch.mockRejectedValueOnce(new TypeError('Server is down'));

        await expect(client.get('https://dummyjson.com/products?limit=16&skip=0')).rejects.toThrow(
            '[Error]: Server is down'
        );
    });

});
