import React, { Component } from 'react';
import styles from './index.less';
import Shape from '../../../assets/Shape.png';

class ImgModule extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={styles.wrap}>
                <img src={this.props.img} alt='' />
                <div className={styles.backBut} onClick={this.props.closeModule}>
                    <img src={Shape} alt='' />
                    <div>返回首页</div>
                </div>
            </div>
        );
    }
}

export default ImgModule;

