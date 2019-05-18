import React, { Component } from 'react';
import styles from './index.less';
import Shape from '../../../assets/Shape.png';
import btn_touxiang from '../../../assets/btn_touxiang.png';
import { connect } from 'dva';
import router from 'umi/router';
import { Toast } from 'antd-mobile';

@connect(({ home }) => ({ home }))
class EvaluateModule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectIndex: null,
            step: 1,
            password: '',
            item: {}
        };
    }

    chooseTeacher(item, selectIndex) {
        this.setState({ item, selectIndex });
    }

    sure() {
        if (this.state.step === 1) {
            this.props.dispatch({
                type: 'home/selectTeacher',
                payload: { item: this.state.item },
                callback: (res) => {
                    this.setState({ step: 2 });
                }
            });
        } else if (this.state.step === 2) {
            this.props.dispatch({
                type: 'home/getRankList',
                payload: { password: this.state.password },
                callback: (res) => {
                    if (res === 1) {
                        router.push('/evaluate');
                    } else {
                        Toast.info('密码错误，请重新输入', 3);
                    }
                }
            });
        }
    }

    handleChange(event) {
        this.setState({
            password: event.target.value
        });
    }

    render() {
        const { evaluateTeacher } = this.props.home;
        return (
            <div className={styles.wrap}>

                <div className={styles.content}>
                    <div className={styles.head}>任课老师</div>

                    {
                        this.state.step === 1 ? (
                            <div className={styles.selectTeacher}>
                                {
                                    evaluateTeacher.map((item, index) => {
                                        return (
                                            <div className={styles.item} key={index} onClick={this.chooseTeacher.bind(this, item, index)}>
                                                <img src={item.img ? item.img : btn_touxiang} alt=''/>
                                                <p>{item.type}</p>
                                                <p>{item.name}</p>
                                                <div className={this.state.selectIndex === index ? styles.active : styles.noActive}/>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        ) : (
                            <div className={styles.inputPassword}>
                                <input type='password' onChange={this.handleChange.bind(this)} />
                            </div>
                        )
                    }

                    <div className={styles.sure} onClick={this.sure.bind(this)}>确定</div>
                </div>

                <div className={styles.backBut} onClick={this.props.closeModule}>
                    <img src={Shape} alt=''/>
                    <div>返回首页</div>
                </div>
            </div>
        );
    }
}

export default EvaluateModule;

