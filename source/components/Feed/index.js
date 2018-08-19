import React, { Component } from 'react';
import { string } from 'prop-types';
import Composer from '../Composer';
import Post from '../Post';
import StatusBar from '../StatusBar';
import Styles from './styles.m.css';
import { getUniqueID } from '../../instruments';
import Counter from '../Counter';

export default class Feed extends Component {

    static propTypes = {
        avatar:               string.isRequired,
        currentUserFirstName: string.isRequired,
        currentUserLastName:  string,
    }

    state = {
        posts: []
    }

    _createPost = (comment) => {
        this.setState((prevState) => ({
            posts: [{ id: getUniqueID(), comment }, ...prevState.posts]
        }));
    }

    _deletePost = (id) => {
        this.setState(({ posts }) => ({
            posts: posts.filter((post) => post.id !== id)
        }));
    }

    render () {
        const { avatar, currentUserFirstName, currentUserLastName } = this.props;
        const { posts } = this.state;
        const count = posts.length;
        const postsJSX = posts.map((post, index) => (
            <Post
                key = { `post__view__${post.id}` }
                avatar = { avatar }
                currentUserFirstName = { currentUserFirstName }
                currentUserLastName = { currentUserLastName }
                comment = { post.comment }
                _id = { post.id }
                _deletePost = { this._deletePost }
            />
        ))

        return (
            <section className = { Styles.feed } >
                <StatusBar/>
                <Composer
                    avatar = { avatar }
                    _createPost = { this._createPost }
                />
                <Counter count = { count } />
                { postsJSX }
            </section>
        );
    }

}
