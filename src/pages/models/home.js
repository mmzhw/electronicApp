import { inputPassword, selectTeacher, selectYear, evaluateSure, getModule1, getModule2, getModule3, getModule4, getModule5, getModule6, getModule7 } from '../../services/index';
import tempbg1 from '../../assets/tempbg1.png';
import tempbg2 from '../../assets/tempbg2.png';
import btn_touxiang from '../../assets/btn_touxiang.png';
import icon_yun from '../../assets/icon_yun.png';

export default {
    namespace: 'home',
    state: {
        allStudents: [
            { value: 0, label: 'Ph.D.' },
            { value: 1, label: 'Bachelor' },
            { value: 2, label: 'College diploma' },
            { value: 3, label: 'College diploma' },
            { value: 4, label: 'College diploma' },
            { value: 5, label: 'College diploma' },
            { value: 6, label: 'College diploma' },
            { value: 7, label: 'College diploma' },
            { value: 8, label: 'College diploma' },
            { value: 9, label: 'College diploma' },
            { value: 10, label: 'College diploma' },
            { value: 11, label: 'College diploma' },
            { value: 12, label: 'College diploma' },
            { value: 13, label: 'College diploma' },
            { value: 14, label: 'College diploma' },
            { value: 15, label: 'College diploma' },
            { value: 16, label: 'College diploma' },
            { value: 17, label: 'College diploma' },
            { value: 18, label: 'College diploma' },
            { value: 19, label: 'College diploma' },
            { value: 20, label: 'College diploma' },
            { value: 21, label: 'College diploma' },
            { value: 22, label: 'College diploma' },
            { value: 23, label: 'College diploma' },
            { value: 24, label: 'College diploma' },
            { value: 25, label: 'College diploma' },
            { value: 26, label: 'College diploma' },
            { value: 27, label: 'College diploma' },
            { value: 28, label: 'College diploma' },
            { value: 29, label: 'College diploma' },
            { value: 30, label: 'College diploma' },
        ],
        yearType: [
            '一年级一班',
            '一年级一班',
            '一年级一班',
            '一年级一班',
            '一年级一班',
            '一年级一班',
            '一年级一班',
            '一年级一班',
            '一年级一班',
            '一年级一班',
            '一年级一班',
            '一年级一班',
            '一年级一班',
            '一年级一班',
            '一年级一班',
            '一年级一班',
            '一年级一班',
            '一年级一班',
        ],
        module1: {
            img: tempbg1,
            class: '一年级（1）班',
            student: 34,
            headMaster: '催化',
            subHeadMaster: '催化',
        },
        module2: [
            { time: '8：00-8：40', name: '语文' },
            { time: '8：00-8：40', name: '语文' },
            { time: '8：00-8：40', name: '语文' },
            { time: '8：00-8：40', name: '语文' },
            { time: '8：00-8：40', name: '语文' },
            { time: '8：00-8：40', name: '语文' },
            { time: '8：00-8：40', name: '语文' },
            {
                time: '8：00-8：40',
                name: '语文',
            },
            { time: '8：00-8：40', name: '语文' },
        ],
        module3: { img: tempbg2 },
        module4: [
            { class: '语文', img: btn_touxiang, name: '阿达' },
            { class: '语文', img: btn_touxiang, name: '阿达' },
            { class: '语文', img: btn_touxiang, name: '阿达' },
            { class: '语文', img: btn_touxiang, name: '阿达' },
            { class: '语文', img: btn_touxiang, name: '阿达' },
            { class: '语文', img: btn_touxiang, name: '阿达' },
            { class: '语文', img: btn_touxiang, name: '阿达' },
            { class: '语文', img: btn_touxiang, name: '阿达' },
            { class: '语文', img: btn_touxiang, name: '阿达' },
            { class: '语文', img: btn_touxiang, name: '阿达' },
            { class: '语文', img: btn_touxiang, name: '阿达' },
            { class: '语文', img: btn_touxiang, name: '阿达' },
            { class: '语文', img: btn_touxiang, name: '阿达' },
        ],
        module5: [
            { img: '', name: '王小二', score: 70 },
            { img: '', name: '王小二', score: 70 },
            { img: '', name: '王小二', score: 70 },
            { img: '', name: '王小二', score: 70 },
        ],
        module6: {
            content: '通知动态通知动态通知动态通知动态通知动态通知动态通知动态通知动态通知动态通知动态',
            time: '2019年5月20日',
            name: '金康园小学教务处',
        },
        module7: {
            nowTemperature: '23',
            img: icon_yun,
            temperature: '18-23',
            weather: '阴',
            location: '位置',
            time: '2019年5月20日',
        },
        evaluateTeacher: [
            { img: '', type: '语文', name: '阿达' },
            { img: '', type: '语文', name: '阿达' },
            { img: '', type: '语文', name: '阿达' },
            { img: '', type: '语文', name: '阿达' },
            { img: '', type: '语文', name: '阿达' },
        ],
        selectYear: '' // 首页已选择的年级参数
    },
    effects: {
        // 获取所有可选择的学生
        * getAllStudents({ payload, callback }, { call, put }) {
            const response = yield call(getModule1, payload);
            if (response && response.code === 1) {
                yield put({ type: 'save', payload: { allStudents: response.result }});
            }
        },
        // 获取所有年级
        * getYearType({ payload, callback }, { call, put }) {
            const response = yield call(getModule1, payload);
            if (response && response.code === 1) {
                yield put({ type: 'save', payload: { yearType: response.result }});
            }
        },
        // 年级信息
        * getModule1({ payload, callback }, { call, put }) {
            const response = yield call(getModule1, payload);
            if (response && response.code === 1) {
                yield put({ type: 'save', payload: { module1: response.result }});
            }
        },
        // 获取课表请求
        * getModule2({ payload, callback }, { call, put }) {
            const response = yield call(getModule1, payload);
            if (response && response.code === 1) {
                yield put({ type: 'save', payload: { module2: response.result }});
            }
        },
        // 班级风采
        * getModule3({ payload, callback }, { call, put }) {
            const response = yield call(getModule1, payload);
            if (response && response.code === 1) {
                yield put({ type: 'save', payload: { getModule3: response.result }});
            }
        },
        // 任课老师
        * getModule4({ payload, callback }, { call, put }) {
            const response = yield call(getModule1, payload);
            if (response && response.code === 1) {
                yield put({ type: 'save', payload: { module4: response.result }});
            }
        },
        // 本周/本月排行，0周排行，1月排行
        * getModule5({ payload, callback }, { call, put }) {
            const response = yield call(getModule1, payload);
            if (response && response.code === 1) {
                yield put({ type: 'save', payload: { module5: response.result }});
            }
        },
        // 通知动态
        * getModule6({ payload, callback }, { call, put }) {
            const response = yield call(getModule1, payload);
            if (response && response.code === 1) {
                yield put({ type: 'save', payload: { module6: response.result }});
            }
        },
        // 天气
        * getModule7({ payload, callback }, { call, put }) {
            const response = yield call(getModule1, payload);
            if (response && response.code === 1) {
                yield put({ type: 'save', payload: { module7: response.result }});
            }
        },
        // 获取所有可选择的老师信息
        * getEvaluateTeacher({ payload, callback }, { call, put }) {
            const response = yield call(getModule1, payload);
            if (response && response.code === 1) {
                yield put({ type: 'save', payload: { evaluateTeacher: response.result }});
            }
        },
        // 选择的老师
        * selectTeacher({ payload, callback }, { call, put }) {
            const response = yield call(selectTeacher, payload);
            if (response && response.code === 1) {
                callback(1);
            }
        },
        // 输入密码
        * inputPassword({ payload, callback }, { call, put }) {
            const response = yield call(inputPassword, payload);
            if (response && response.code === 1) {
                callback(1);
            }
        },
        // 已选择的年级
        * selectYear({ payload, callback }, { call, put }) {
            const response = yield call(selectYear, payload);
            if (response && response.code === 1) {
                yield put({ type: 'save', payload: { selectYear: response.result }});
            }
        },
        // 提交评价
        * evaluateSure({ payload, callback }, { call, put }) {
            const response = yield call(evaluateSure, payload);
            if (response && response.code === 1) {
                callback(1);
            }
        },
    },
    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, search }) => {
                console.log(pathname, search);
            });
        },
    },
};
