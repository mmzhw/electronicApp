import React, { Component } from 'react';
import styles from './index.less';
import icon from '../../assets/icon_logo.png';
import wifi from '../../assets/wifi.png';
import moment from 'moment';

class Head extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: 'YYYY年MM月DD日',
            hour: 'hh:ss',
        };
        this.timeObj = null;
    }

    componentDidMount() {
        this.getTime();
        this.timeObj = setInterval(() => {
            this.getTime();
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timeObj);
    }

    getTime() {
        this.setState({
            year: moment().format('YYYY年MM月DD日'),
            hour: moment().format('hh:ss'),
        });
    }

    render() {
        return (
            <div className={styles.header}>
                <img src={icon} alt=''/>
                <div className={styles.info}>
                    <span>{this.state.year}</span><i>/</i>
                    <span>{this.state.hour}</span><i>/</i>
                    <span>江苏-苏州</span><i>/</i>
                    <img src={wifi} alt={''}/>
                </div>
            </div>
        );
    }
}

export default Head;

