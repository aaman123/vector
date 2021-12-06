import axios from 'axios';
import { Card } from '../interfaces/Card';

/*
 API calls to get and update cards.
 Dependency - Axios.
*/

const getCards = () => {
    return axios({
        method: 'GET',
        url: `http://localhost:8000/get_cards`,
        headers: {
            'Content-Type': 'application/json'
        }
    }).catch(error => {
        return error.response;
    });
};

const updateCards = (payLoad: Card[]) => {
    return axios({
        method: 'POST',
        url: `http://localhost:8000/update_cards`,
        data: JSON.stringify(payLoad)
    }).catch(error => {
        return error.response;
    });
}

export {
    getCards,
    updateCards
}