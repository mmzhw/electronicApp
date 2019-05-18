import React, { Component } from 'react';
import { connect } from 'dva';
import classnames from 'classnames';
import ImgModule from './components/imgModule/index';
import EvaluateModule from './components/evaluateModule/index';
import styles from './home.less';
import icon_suileft from '../assets/icon_suileft.png';
import icon_suilright from '../assets/icon_suilright.png';
import btn_touxiang from '../assets/btn_touxiang.png';
import icon_notice from '../assets/icon_notice.png';
import icon_ketangpinjia from '../assets/icon_ketangpinjia.png';

@connect(({ home }) => ({ home }))
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgModule: false,
            evaluateModule: false,
            mouthWeek: 0,
            rankAppearNum: [1, 2, 3, 4, 5, 6]
        };
    }

    changeMouthWeek(value) {
        this.setState({
            mouthWeek: value
        });
    }

    closeModule(key) {
        this.setState({
            [key]: false
        });
    }

    openModule(key) {
        this.setState({
            [key]: true
        });
    }

    render() {
        const { module1, module2, module3, module4, module5, module6, module7 } = this.props.home;
        return (
            <div className={styles.wrap}>
                {
                    this.state.imgModule ? (
                        <ImgModule img={module3.img} closeModule={this.closeModule.bind(this, 'imgModule')} />
                    ) : null
                }
                {
                    this.state.evaluateModule ? (
                        <EvaluateModule closeModule={this.closeModule.bind(this, 'evaluateModule')} />
                    ) : null
                }

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
                            <div onClick={this.openModule.bind(this, 'imgModule')} className={classnames(styles.itemWrap, styles.module3)}>
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
                            <div className={classnames(styles.itemWrap, styles.module5)}>
                                <div className={styles.top}><img src={icon_suileft} alt='' />本周排行<img src={icon_suilright} alt='' /></div>
                                <div className={styles.change}>
                                    <div className={this.state.mouthWeek === 0 ? styles.divActive : ''} onClick={this.changeMouthWeek.bind(this, 0)}>周排行</div>
                                    <div className={this.state.mouthWeek === 1 ? styles.divActive : ''} onClick={this.changeMouthWeek.bind(this, 1)}>月排行</div>
                                </div>
                                <div className={styles.content}>
                                    {
                                        this.state.rankAppearNum.map((item, index) => {
                                            if (module5[index]) {
                                                return (
                                                    <div key={item} className={styles.item}><img src={module5[index].img ? module5[index].img : btn_touxiang} alt='' /><p>{module5[index].name}</p><span>{module5[index].score}</span></div>
                                                );
                                            } else {
                                                return (
                                                    <div key={item} className={styles.item}><img src={btn_touxiang} alt='' /><p>--</p><span>--</span></div>
                                                );
                                            }
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={styles.foot}>
                            <div className={classnames(styles.itemWrap, styles.module6)}>
                                <div className={styles.head}>
                                    <img src={icon_notice} alt='' />
                                    <span>通知动态</span>
                                </div>
                                <div className={styles.content}>{module6.content}</div>
                                <div className={styles.foot}>
                                    <p>{module6.time}</p>
                                    <p>{module6.name}</p>
                                </div>
                            </div>
                            <div className={classnames(styles.itemWrap, styles.module7)} onClick={this.openModule.bind(this, 'evaluateModule')}>
                                <img src={icon_ketangpinjia} alt='' />
                            </div>
                            <div className={classnames(styles.itemWrap, styles.module8)}>
                                <div>{module7.nowTemperature}℃<img src={module7.img} alt='' /></div>
                                <div>{module7.temperature}℃ <span>|</span>{module7.weather}<span>|</span>{module7.location}</div>
                                <div>{module7.time}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;

