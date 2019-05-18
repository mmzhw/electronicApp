import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './evaluate.less';
import classnames from 'classnames';
import btn_xuanzhong from '../assets/btn_xuanzhong.png';
import { Modal, Checkbox } from 'antd-mobile';
import icon_hua_gray from '../assets/icon_hua_gray.png';
import icon_hua_blue from '../assets/icon_hua_blue.png';
import icon_hua_red from '../assets/icon_hua_red.png';
import router from 'umi/router';
import Shape from '../assets/Shape.png';
const CheckboxItem = Checkbox.CheckboxItem;

@connect(({ home }) => ({ home }))
class Evaluate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chooseType: 1,
            evaluationType: [{ type: 1, name: '行为习惯' }, { type: 2, name: '学习习惯' }],
            studentChoose: false,
            selectStudents: [],
            flowerNum: [1, 2, 3, 4, 5],
            redNum: 0,
            blueNum: 0,
        };
    }

    chooseType(chooseType) {
        this.setState({
            chooseType
        });
    }

    onShow(value) {
        this.setState({
            [value]: true
        });
    }

    onClose(value) {
        this.setState({
            [value]: false
        });
    }

    onChange(value) {
        let arr = this.state.selectStudents.concat();
        let res = arr.findIndex((item) => {
            return item === value;
        });

        if (res === -1) {
            arr.push(value);
        } else {
            arr.splice(res, 1);
        }
        this.setState({
            selectStudents: arr
        });
    }

    getNames() {
        let names = '';

        this.state.selectStudents.forEach((item) => {
            let res = this.props.home.allStudents.find((i) => {
                return i.value === item;
            });
            if (res) {
                names = names + ';' + res.label;
            }
        });
        return names;
    }

    getCheckState(value) {
        return !!this.state.selectStudents.find((i) => {
            return value === i;
        });
    }

    getFlower(value, key) {
        let num = value;
        if (value === 1 && this.state[key] === 1) {
            num = 0;
        }
        this.setState({
            [key]: num
        });
    }

    closeModule() {
        router.push('/home');
    }

    sure() {
        this.props.dispatch({
            type: 'home/evaluateSure',
            payload: {
                selectStudents: this.state.selectStudents,
                redNum: this.state.redNum,
                blueNum: this.state.blueNum,
                chooseType: this.state.chooseType,
            },
            callback: (res) => {
                router.push('/home');
            }
        });
    }

    clear() {
        this.setState({
            selectStudents: [],
            redNum: 0,
            blueNum: 0,
            chooseType: 1,
        });
    }

    render() {
        const { allStudents } = this.props.home;
        return (
            <div className={styles.wrap}>
                <Modal
                    visible={this.state.studentChoose}
                    transparent
                    closable={true}
                    className={styles.modelStudent}
                    onClose={this.onClose.bind(this, 'studentChoose')}
                >
                    <div className={styles.allStudents}>
                        {allStudents.map(i => (
                            <CheckboxItem key={i.value} onChange={this.onChange.bind(this, i.value)} checked={this.getCheckState(i.value)}>
                                {i.label}
                            </CheckboxItem>
                        ))}
                    </div>
                </Modal>
                <div className={styles.item}>
                    <div className={styles.label}>评价类型</div>
                    <div className={classnames(styles.value, styles.module1)}>
                        {
                            this.state.evaluationType.map((item, index) => {
                                return (
                                    <div className={styles.chooseType} onClick={this.chooseType.bind(this, item.type)} key={index}>
                                        {
                                            this.state.chooseType === item.type ? (
                                                <img src={btn_xuanzhong} alt='' />
                                            ) : (
                                                <div />
                                            )
                                        }
                                        {item.name}</div>
                                );
                            })
                        }

                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>选择学生</div>
                    <div className={classnames(styles.value, styles.module2)}>
                        <div onClick={this.onShow.bind(this, 'studentChoose')}>请选择学生</div>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>已选学生</div>
                    <div className={classnames(styles.value, styles.module3)}>
                        <div>{this.getNames()}</div>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>蓝花</div>
                    <div className={styles.value}>
                        {
                            this.state.flowerNum.map((item, index) => {
                                if (item <= this.state.blueNum) {
                                    return (<img onClick={this.getFlower.bind(this, item, 'blueNum')} src={icon_hua_blue} alt={''} />);
                                } else {
                                    return (<img onClick={this.getFlower.bind(this, item, 'blueNum')} src={icon_hua_gray} alt={''} />);
                                }
                            })
                        }
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>红花</div>
                    <div className={styles.value}>
                        {
                            this.state.flowerNum.map((item, index) => {
                                if (item <= this.state.redNum) {
                                    return (<img onClick={this.getFlower.bind(this, item, 'redNum')} src={icon_hua_red} alt={''} />);
                                } else {
                                    return (<img onClick={this.getFlower.bind(this, item, 'redNum')} src={icon_hua_gray} alt={''} />);
                                }
                            })
                        }
                    </div>
                </div>
                <div className={styles.evaluateBut}>
                    <div onClick={this.sure.bind(this)}>确认</div>
                    <div onClick={this.clear.bind(this)}>清空</div>
                </div>
                <div className={styles.backBut} onClick={this.closeModule.bind(this)}>
                    <img src={Shape} alt=''/>
                    <div>返回首页</div>
                </div>
            </div>
        );
    }
}

export default Evaluate;

