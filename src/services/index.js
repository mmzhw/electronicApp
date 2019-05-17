import request from '../utils/request';

export function getRankList(body) {
    return request.post('/getRankList', body);
}

export function getExchange(body) {
    return request.post('/getExchange', body);
}

export function getIntegralRanking(body) {
    return request.post('/getExchange', body);
}
