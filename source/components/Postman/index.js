import React, { Component } from 'react';
import gsap from 'gsap';
import { Transition } from 'react-transition-group';
import { withProfile } from '../../HOC/withProfile';
import Styles from './styles.m.css';
import moment from 'moment';

@withProfile
export default class Postman extends Component {

    state = {
        setPostman: true,
        duration: 0
    }

    componentDidMount() {
        const date = JSON.parse(localStorage.getItem('user_date'));

        if (date) {
            const prevDate = moment(date);
            const currentDate = moment();
            const durationInMinute = moment.duration(currentDate.diff(prevDate)).asMinutes();

            this.setState(({ duration }) => ({
                duration: durationInMinute
            }));
        } else {
            localStorage.setItem('user_date', JSON.stringify(moment()));
        }

    }

    _togglePostman = () => {
        this.setState(({ setPostman }) => ({
            setPostman: !setPostman
        }))
    }

    _animateComposerEnter = (component) => {
        gsap.fromTo(component, 1,
            {
                opacity: 0,
                x: 1400
            },
            {
                opacity: 1,
                x: 0,
                onComplete: () => {
                    setTimeout(() => {
                        this._togglePostman();
                    }, 4000);
                }
            }
        );
    }

    _animateComposerExit = (component) => {
        gsap.fromTo(component, 1,
            {
                opacity: 1,
                x: 0
            },
            {
                opacity: 0,
                x: 400
            }
        );
    }

    render () {
        const { avatar, currentUserFirstName } = this.props;
        const { setPostman, duration } = this.state;

        if (duration <= 2) {
            return (null)
        }
        return (
            <Transition
                appear
                in = { setPostman }
                timeout = { { enter: 1000, exit: 1000 } }
                onEnter = { this._animateComposerEnter }
                onExit = { this._animateComposerExit }
            >
                <div className = { Styles.postman }>
                    <img src = { avatar } alt = 'Avatar' />
                    <span>Welcome online, <b>{ currentUserFirstName }</b></span>
                </div>
            </Transition>
        );
    }
}
