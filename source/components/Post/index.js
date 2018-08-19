import React, { Component } from 'react';
import moment from 'moment';
import { string } from 'prop-types';

import Styles from './styles.m.css';

export default class Post extends Component {

    static propTypes = {
        avatar:               string.isRequired,
        currentUserFirstName: string.isRequired,
        currentUserLastName:  string.isRequired,
        comment: string.isRequired
    }

    _handlePostDeleteClick = (event) => {
        const {
            _deletePost,
            _id
        } = this.props;

        _deletePost(_id);
    }

    render () {
        const {
            avatar,
            currentUserFirstName,
            currentUserLastName,
            comment
        } = this.props;

        return (
            <section className = { Styles.post } >
                <span
                    className = { Styles.cross }
                    onClick = { this._handlePostDeleteClick }
                />
                <img src = { avatar } />
                <a>{ currentUserFirstName } { currentUserLastName }</a>
                <time>{ moment().format('MMMM D h:mm:ss a') }</time>
                <p>{ comment }</p>
            </section>
        );
    }
}
