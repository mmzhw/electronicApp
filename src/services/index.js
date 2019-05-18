import request from '../utils/request';

export function inputPassword(body) {
    return request.post('/inputPassword', body);
}

export function selectTeacher(body) {
    return request.post('/selectTeacher', body);
}

export function selectYear(body) {
    return request.post('/selectYear', body);
}

export function evaluateSure(body) {
    return request.post('/evaluateSure', body);
}
