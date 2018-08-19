import React, { Component } from 'react';
import { string } from 'prop-types';
import { Consumer } from '../../HOC/withProfile';
import Styles from './styles.m.css';

export default class Composer extends Component {

    static propTypes = {
        avatar: string.isRequired,
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
        const { _createPost } = this.props;
        const { comment } = this.state;

        if (!comment.trim()) {
            return (null);
        }

        _createPost(comment);
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
        const { avatar } = this.props;
        const { comment } = this.state;

        return (
            <Consumer>
                {
                    (context) => (
                        <section className = { Styles.composer } >
                            <img src = { avatar } />
                            <form
                                onSubmit = { this._handleFormSubmit }
                            >
                                <textarea
                                    placeholder = {
                                        `What's on your mind, ${context.currentUserFirstName}`
                                    }
                                    value = { comment }
                                    onChange = { this._handleTeaxtareaChange }
                                    onCopy = { this._handleTeaxtareaCopy }
                                    onKeyPress = { this._handleTeaxtareaKeyPress }
                                />
                                <input type = 'submit' value = 'Post' />
                            </form>
                        </section>
                    )
                }
            </Consumer>
        );
    }
}
