import React, { Component } from 'react';
import { string } from 'prop-types';
import Composer from '../Composer';
import Post from '../Post';
import StatusBar from '../StatusBar';
import Styles from './styles.m.css';
import { getUniqueID } from '../../instruments';
import Counter from '../Counter';
import Catcher from '../Catcher';
import Spinner from '../Spinner';
import Postman from '../Postman';
import { api, GROUP_ID } from '../../REST';
import { socket } from '../../socket';
import gsap from 'gsap';
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group';

import { fetchPosts, createPost, deletePost, likePost } from '../../store/actions';

import dispatcher from '../../store/dispatcher';
import PostsStore from '../../store';

export default class Feed extends Component {

    static propTypes = {
        avatar:               string.isRequired,
        currentUserFirstName: string.isRequired,
        currentUserLastName:  string.isRequired
    }

    state = {
        posts: PostsStore.getPosts(),
        isSpinning: false
    }

    componentDidMount () {
        const { currentUserFirstName, currentUserLastName } = this.props;

        PostsStore.subscibe(this._onChange);

        this._fetchPostsAsync();

        socket.emit('join', GROUP_ID);

        socket.on('create', (postJSON) => {
            const { data: createdPost } = JSON.parse(postJSON);

            if (`${currentUserFirstName} ${currentUserLastName}` !== `${createdPost.firstName} ${createdPost.lastName}`) {
                dispatcher.dispatch(createPost(createdPost))
            }
        });
        socket.on('remove', (postId) => {
            const { data: { id }, meta } = JSON.parse(postId);

            if (`${currentUserFirstName} ${currentUserLastName}` !== `${meta.authorFirstName} ${meta.authorLastName}`) {
                dispatcher.dispatch(deletePost(id));
            }
        });
        socket.on('like', (post) => {
            const { data: createdPost } = JSON.parse(post);

            if (`${currentUserFirstName} ${currentUserLastName}` !== `${createdPost.firstName} ${createdPost.lastName}`) {
                dispatcher.dispatch(likePost(createdPost));
            }
        });
    }

    componentWillMount() {
        socket.removeListener('create');
        socket.removeListener('remove');
        socket.removeListener('like');
        PostsStore.unsubscibe(this._onChange);
    }

    _onChange = () => {
        this.setState({
            posts: PostsStore.getPosts()
        })
    }

    _setPostsFetchingState = (isSpinning) => {
        this.setState({
            isSpinning
        });
    }

    _fetchPostsAsync = async () => {
        try {
            this._setPostsFetchingState(true);
            const posts = await api.fetchPosts();

            dispatcher.dispatch(fetchPosts(posts))
        } catch (e) {
            console.error(e);
        } finally {
            this._setPostsFetchingState(false);
        }
    }

    _createPostAsync = async (comment) => {
        try {
            this._setPostsFetchingState(true);
            const post = await api.createPost(comment);

            dispatcher.dispatch(createPost(post))
        } catch (e) {
            console.error(e);
        } finally {
            this._setPostsFetchingState(false);
        }
    }

    _removePostAsync = async (id) => {
        try {
            this._setPostsFetchingState(true);
            await api.removePost(id);

            dispatcher.dispatch(deletePost(id));
        } catch (e) {
            console.error(e);
        } finally {
            this._setPostsFetchingState(false);
        }
    }

    _likePostAsync = async (id) => {
        try {
            this._setPostsFetchingState(true);
            const likedPost = await api.likePost(id);

            dispatcher.dispatch(likePost(likedPost));
        } catch (e) {
            console.error(e);
        } finally {
            this._setPostsFetchingState(false);
        }
    }

    _animateComposerEnter = (composer) => {
        gsap.fromTo(composer, 1,
            {
                opacity: 0,
                x: 1400,

            },
            {
                opacity: 1,
                x: 0,

            }
        );
    }

    render () {
        const { avatar, currentUserFirstName, currentUserLastName } = this.props;
        const { posts, isSpinning } = this.state;
        const count = posts.length;
        const postsJSX = posts.map((post, index) => (
            <CSSTransition
                timeout = { 1000 }
                classNames = { {
                    enter: Styles.postInStart,
                    enterActive: Styles.postInEnd,
                    exit: Styles.postOutStart,
                    exitActive: Styles.postOutEnd
                } }
                key = { `post__view__${post.id}` }
            >
                <Catcher>
                    <Post
                        { ...post }
                        currentUserFirstName = { currentUserFirstName }
                        currentUserLastName = { currentUserLastName }
                        _removePostAsync = { this._removePostAsync }
                        _likePostAsync = { this._likePostAsync }
                    />
                </Catcher>
            </CSSTransition>
        ))

        return (
            <section className = { Styles.feed } >
                <StatusBar/>
                <Transition
                    appear
                    in
                    timeout = { 1000 }
                    onEnter = { this._animateComposerEnter }
                >
                    <Composer
                        avatar = { avatar }
                        currentUserFirstName = { currentUserFirstName }
                        currentUserLastName = { currentUserLastName }
                        _createPostAsync = { this._createPostAsync }
                    />
                </Transition>
                <Counter count = { count } />
                <TransitionGroup>
                    { postsJSX }
                </TransitionGroup>
                <Spinner isSpinning = { isSpinning } />
                <Postman/>
            </section>
        );
    }

}
