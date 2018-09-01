import { EventEmitter } from 'events';

import dispatcher from './dispatcher';

import { FETCH_POSTS, CREATE_POST, DELETE_POST, LIKE_POST } from './actions/types';

export default new class PostsStore extends EventEmitter {

    constructor () {
    	super();

        this.store = {
            posts: []
        };

        dispatcher.register((action) => {
            switch (action.type) {
                case FETCH_POSTS:
                    this.fetchPosts(action.payload);
                    break;
                case CREATE_POST:
                    this.createPost(action.payload);
                    break;
                case DELETE_POST:
                    this.deletePost(action.payload);
                    break;
                case LIKE_POST:
                    this.likePost(action.payload);
                    break;
                default:
                    return false;
                    break;
            }
        });

    }

    subscibe (callback) {
        this.on('change', callback);
    }

    unsubscibe (callback) {
        this.removeListener('change', callback);
    }

    update () {
        this.emit('change');
    }

    getPosts () {
        return this.store.posts;
    }

    fetchPosts (posts) {
        this.store.posts = posts;
        this.update();
    }

    createPost (post) {
        const { posts } = this.store;

        this.store.posts = [post, ...posts];
        this.update();
    }

    deletePost (id) {
        const posts = this.store.posts.filter((post) => post.id !== id);

        this.store.posts = posts;
        this.update();

    }

    likePost (likedPost) {
        const posts = this.store.posts.map((post) => post.id === likedPost.id ? likedPost : post);

        this.store.posts = posts;
        this.update();
    }

}();
