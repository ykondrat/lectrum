import React, { Component } from 'react';
import { withProfile } from '../../HOC/withProfile';
import { api, GROUP_ID } from '../../REST';
import { socket } from '../../socket';
import cx from 'classnames';
import Styles from './styles.m.css';

@withProfile
export default class StatusBar extends Component {

    state = {
        online: false
    }

    componentDidMount () {
        socket.on('connect', () => {
            this.setState(() => ({
                online: true
            }))
        });
        socket.on('disconnect', () => {
            this.setState(() => ({
                online: false
            }))
        });
    }

    componentWillUnmount () {
        socket.removeListener('connect');
        socket.removeListener('disconnect');
    }

    render () {
        const { avatar, currentUserFirstName, currentUserLastName } = this.props;
        const { online } = this.state;
        const statusStyles = cx(Styles.status, {
            [Styles.offline]: !online,
            [Styles.online]: online
        })
        const statusMessage = online ? 'Online' : 'Offline';

        return (
            <section className = { Styles.statusBar }>
                <div className = { statusStyles }>
                    <div>{ statusMessage }</div>
                    <span />
                </div>
                <button>
                    <img src = { avatar } />
                    <span> { currentUserFirstName } </span>
                    &nbsp;
                    <span> { currentUserLastName } </span>
                </button>
            </section>
        )
    }
}
