// import { getRankList } from '../../../services';
import tempbg1 from '../../../assets/tempbg1.png';
import tempbg2 from '../../../assets/tempbg2.png';
import btn_touxiang from '../../../assets/btn_touxiang.png';

export default {
    namespace: 'home',
    state: {
        module1: {
            img: tempbg1,
            class: '一年级（1）班',
            student: 34,
            headMaster: '催化',
            subHeadMaster: '催化',
        },
        module2: [{ time: '8：00-8：40', name: '语文' }, { time: '8：00-8：40', name: '语文' }, { time: '8：00-8：40', name: '语文' }, { time: '8：00-8：40', name: '语文' }, { time: '8：00-8：40', name: '语文' }, { time: '8：00-8：40', name: '语文' }, { time: '8：00-8：40', name: '语文' }, {
            time: '8：00-8：40',
            name: '语文',
        }, { time: '8：00-8：40', name: '语文' }],
        module3: { img: tempbg2 },
        module4: [{ class: '语文', img: btn_touxiang, name: '阿达' }, { class: '语文', img: btn_touxiang, name: '阿达' }, { class: '语文', img: btn_touxiang, name: '阿达' }, { class: '语文', img: btn_touxiang, name: '阿达' }, { class: '语文', img: btn_touxiang, name: '阿达' }, { class: '语文', img: btn_touxiang, name: '阿达' }, { class: '语文', img: btn_touxiang, name: '阿达' }, { class: '语文', img: btn_touxiang, name: '阿达' }, { class: '语文', img: btn_touxiang, name: '阿达' }, { class: '语文', img: btn_touxiang, name: '阿达' }, { class: '语文', img: btn_touxiang, name: '阿达' }, { class: '语文', img: btn_touxiang, name: '阿达' }, { class: '语文', img: btn_touxiang, name: '阿达' }],
    },
    effects: {
        * getRankList ({ payload, callback }, { call, put }) {
            // const response = yield call(getRankList, payload);
            // console.log(response);
            // yield put({
            //     type: 'save',
            //     payload: {
            //         rankingList: [{ no: 1, img: icon1 }, { no: 2, img: icon2 }, { no: 3, img: icon3 }]
            //     },
            // });
        },
    },
    reducers: {
        save (state, action) {
            return { ...state, ...action.payload };
        },
    },
    subscriptions: {
        setup ({ dispatch, history }) {
            return history.listen(({ pathname, search }) => {
                console.log(pathname, search);
            });
        },
    },
};
