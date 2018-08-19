import React, { Component } from 'react';
import { Consumer } from '../../HOC/withProfile';

import Styles from './styles.m.css';

export default class StatusBar extends Component {
    render () {
        return (
            <Consumer>
                {
                    (context) => (
                        <section className = { Styles.statusBar }>
                            <div className = { `${Styles.offline} ${ Styles.status}` }>
                                <div>Offline</div>
                                <span />
                            </div>
                            <button>
                                <img src = { context.avatar } />
                                <span> { context.currentUserFirstName } </span>
                                &nbsp;
                                <span> { context.currentUserLastName } </span>
                            </button>
                        </section>
                    )
                }
            </Consumer>
        )
    }
}