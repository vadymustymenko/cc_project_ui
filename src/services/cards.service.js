import axios from 'axios';

class _CardsService {
    getAll() {
        return axios.get("https://1d1to.sse.codesandbox.io/api/cards");
    }

    insert(model) {
        return axios.post("https://1d1to.sse.codesandbox.io/api/cards", model);
    }
}

const CardsService = new _CardsService();
export default CardsService;