import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import router from 'umi/router';

@connect(({ home }) => ({ home }))
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    selectYear() {
        this.props.dispatch({
            type: 'home/selectYear',
            payload: { item: this.state.item },
            callback: (res) => {
                router.push('/home');
            }
        });
        router.push('/home');
    }

    render() {
        const { yearType } = this.props.home;
        return (
            <div className={styles.yearWrap}>
                {
                    yearType.map((item, index) => {
                        return (
                            <div onClick={this.selectYear.bind(this, item)} key={index} className={styles.item}><div>{item}</div></div>
                        );
                    })
                }
            </div>
        );
    }
}

export default Index;

