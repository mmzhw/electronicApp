import request from '../utils/request';

export function getModule1(body) {
    return request.post('/getModule1', body);
}

export function getModule2(body) {
    return request.post('/getModule2', body);
}

export function getModule3(body) {
    return request.post('/getModule3', body);
}

export function getModule4(body) {
    return request.post('/getModule4', body);
}

export function getModule5(body) {
    return request.post('/getModule5', body);
}

export function getModule6(body) {
    return request.post('/getModule6', body);
}

export function getModule7(body) {
    return request.post('/getModule7', body);
}

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
