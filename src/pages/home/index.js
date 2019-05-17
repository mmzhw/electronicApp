import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import classnames from 'classnames';
import styles from './index.less';

import icon from '../../assets/icon_logo.png';
import wifi from '../../assets/wifi.png';

@connect(({ home }) => ({ home }))
class Home extends Component {
    constructor (props) {
        super(props);
        this.state = {
            year: 'YYYY年MM月DD日',
            hour: 'hh:ss',
            timeObj: null,
        };
        this.timeObj = null;
    }

    componentDidMount () {
        this.getTime();
        this.timeObj = setInterval(() => {
            this.getTime();
        }, 1000);
    }

    componentWillUnmount () {
        clearInterval(this.timeObj);
    }

    getTime () {
        this.setState({
            year: moment().format('YYYY年MM月DD日'),
            hour: moment().format('hh:ss'),
        });
    }

    render () {
        const { module1, module2, module3, module4 } = this.props.home;
        return (
            <div className={styles.wrap}>
                <div className={styles.header}>
                    <img src={icon} alt=''/>
                    <div className={styles.info}>
                        <span>{this.state.year}</span><i>/</i>
                        <span>{this.state.hour}</span><i>/</i>
                        <span>江苏-苏州</span><i>/</i>
                        <img src={wifi} alt={''}/>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <div className={classnames(styles.itemWrap, styles.module1)}>
                            <div className={styles.schoolBg}><img src={module1.img} alt=''/></div>
                            <p>{module1.class}</p>
                            <div className={styles.classInfo}>
                                <div><p>班学生</p><p>{module1.student}</p></div>
                                <p>|</p>
                                <div><p>班主任</p><p>{module1.headMaster}</p></div>
                                <p>|</p>
                                <div><p>副班主任</p><p>{module1.subHeadMaster}</p></div>
                            </div>
                        </div>
                        <div className={classnames(styles.itemWrap, styles.module2)}>
                            <div className={styles.head}>周一课表</div>
                            <div className={styles.foot}>
                                <div className={styles.item}>
                                    <p>时间</p><p>课程</p>
                                </div>
                                {
                                    module2.map((item, index) => {
                                        return (
                                            <div className={styles.item} key={index}>
                                                <p>{item.time}</p><p>{item.name}</p>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.top}>
                            <div className={classnames(styles.itemWrap, styles.module3)}>
                                <div className={styles.classImg}>
                                    <img src={module3.img} alt=''/>
                                </div>
                                <div className={styles.classText}>班级风采</div>
                            </div>
                            <div className={classnames(styles.itemWrap, styles.module4)}>
                                <div className={styles.head}>任课老师</div>
                                <div className={styles.foot}>
                                    {
                                        module4.map((item, index) => {
                                            return (
                                                <div className={styles.item} key={index}>
                                                    <p>{index + 1}、{item.class}</p>
                                                    <img src={item.img} alt=''/>
                                                    <span>{item.name}</span>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                            <div className={classnames(styles.itemWrap, styles.module5)}></div>
                        </div>
                        <div className={styles.foot}>
                            <div className={classnames(styles.itemWrap, styles.module6)}></div>
                            <div className={classnames(styles.itemWrap, styles.module7)}></div>
                            <div className={classnames(styles.itemWrap, styles.module8)}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;

