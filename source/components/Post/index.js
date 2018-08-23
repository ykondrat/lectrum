import React, { Component } from 'react';
import moment from 'moment';
import { string, func } from 'prop-types';
import { withProfile } from '../../HOC/withProfile';
import Styles from './styles.m.css';
import Like from '../Like';

@withProfile
export default class Post extends Component {

    static propTypes = {
        avatar: string.isRequired,
        firstName: string.isRequired,
        lastName: string.isRequired,
        comment: string.isRequired,
        currentUserFirstName: string.isRequired,
        currentUserLastName:  string.isRequired,
        _removePostAsync: func.isRequired,
        _likePostAsync: func.isRequired
    }

    _handlePostDeleteClick = (event) => {
        const {
            _removePostAsync,
            id
        } = this.props;

        _removePostAsync(id);
    }

    _getCross () {
        const {
            currentUserFirstName,
            currentUserLastName,
            firstName,
            lastName
        } = this.props;

        return (
            `${currentUserFirstName} ${currentUserLastName}` === `${firstName} ${lastName}`
            ? <span
                className = { Styles.cross }
                onClick = { this._handlePostDeleteClick }
            />
            : null
        );
    }

    render () {
        const {
            id,
            avatar,
            currentUserFirstName,
            currentUserLastName,
            firstName,
            lastName,
            comment,
            created,
            likes,
            _likePostAsync
        } = this.props;
        const cross = this._getCross();

        return (
            <section className = { Styles.post } >
                { cross }
                <img src = { avatar } />
                <a>{ firstName } { lastName }</a>
                <time>{ moment.unix(created).format('MMMM D h:mm:ss a') }</time>
                <p>{ comment }</p>
                <Like
                    id = { id }
                    _likePostAsync = { _likePostAsync }
                    likes = { likes }
                />
            </section>
        );
    }
}
