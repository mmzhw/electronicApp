import React, { Component } from 'react';
import styles from './index.less';
import Head from '../components/head';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={styles.wrap}>
                <Head />
                {this.props.children}
            </div>

        );
    }
}

export default Layout;
