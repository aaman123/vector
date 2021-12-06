import axios from 'axios';
import { Card } from '../interfaces/Card';

const getCards = () => {
    return axios({
        method: 'GET',
        url: `http://3.110.128.120/get_cards`,
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
        url: `http://3.110.128.120/update_cards`,
        data: JSON.stringify(payLoad)
    }).catch(error => {
        return error.response;
    });
}

export {
    getCards,
    updateCards
}