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


export default class Feed extends Component {

    static propTypes = {
        avatar:               string.isRequired,
        currentUserFirstName: string.isRequired,
        currentUserLastName:  string.isRequired
    }

    state = {
        posts: [],
        isSpinning: false
    }

    componentDidMount () {
        const { currentUserFirstName, currentUserLastName } = this.props;
        this._fetchPostsAsync();

        socket.emit('join', GROUP_ID);

        socket.on('create', (postJSON) => {
            const { data: createdPost } = JSON.parse(postJSON);

            if (`${currentUserFirstName} ${currentUserLastName}` !== `${createdPost.firstName} ${createdPost.lastName}`) {
                this.setState(({ posts }) => ({
                    posts: [createdPost, ...posts]
                }));
            }
        });
        socket.on('remove', (postId) => {
            const { data: { id }, meta } = JSON.parse(postId);

            if (`${currentUserFirstName} ${currentUserLastName}` !== `${meta.authorFirstName} ${meta.authorLastName}`) {
                this.setState(({ posts }) => ({
                    posts: posts.filter((post) => post.id !== id)
                }));
            }
        });
        socket.on('like', (post) => {
            const { data: createdPost } = JSON.parse(post);

            if (`${currentUserFirstName} ${currentUserLastName}` !== `${createdPost.firstName} ${createdPost.lastName}`) {
                this.setState(({ posts }) => ({
                    posts: posts.map((post) => post.id === createdPost.id ? createdPost : post)
                }));
            }
        });
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

            this.setState({
                posts
            });
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

            this.setState((prevState) => ({
                posts: [post, ...prevState.posts]
            }));
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

            this.setState(({ posts }) => ({
                posts: posts.filter((post) => post.id !== id)
            }));
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

            this.setState(({ posts }) => ({
                posts: posts.map((post) => post.id === likedPost.id ? likedPost : post)
            }));
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
