import React, { Component } from 'react';
import { string, func } from 'prop-types';
import { withProfile } from '../../HOC/withProfile';
import Styles from './styles.m.css';

export class Composer extends Component {

    static propTypes = {
        avatar: string.isRequired,
        currentUserFirstName: string.isRequired,
        _createPostAsync: func.isRequired
    }

    state = {
        comment: ''
    }

    _handleTeaxtareaChange = (event) => {
        const { value } = event.target;

        this.setState({
            comment: value
        });
    }

    _createPost = () => {
        const { _createPostAsync } = this.props;
        const { comment } = this.state;

        if (!comment.trim()) {
            return (null);
        }

        _createPostAsync(comment);

        this.setState({
            comment: ''
        });
    }

    _handleFormSubmit = (event) => {
        event.preventDefault();
        this._createPost();
    }

    _handleTeaxtareaKeyPress = (event) => {
        const { charCode } = event;

        if (charCode === 13) {
            event.preventDefault();
            this._createPost();
        }
    }

    _handleTeaxtareaCopy = (event) => {
        event.preventDefault();
    }

    render () {
        const { avatar, currentUserFirstName } = this.props;
        const { comment } = this.state;

        return (
            <section className = { Styles.composer } >
                <img src = { avatar } alt = 'User avatar' />
                <form
                    onSubmit = { this._handleFormSubmit }
                >
                    <textarea
                        placeholder = {
                            `What's on your mind, ${ currentUserFirstName }`
                        }
                        value = { comment }
                        onChange = { this._handleTeaxtareaChange }
                        onCopy = { this._handleTeaxtareaCopy }
                        onKeyPress = { this._handleTeaxtareaKeyPress }
                    />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}

export default withProfile(Composer)
