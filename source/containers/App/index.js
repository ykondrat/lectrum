import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Catcher from '../../components/Catcher';
import Feed from '../../components/Feed';
import { Provider } from '../../HOC/withProfile';
import avatar from '../../theme/assets/homer.png';

const config = {
    avatar,
    currentUserFirstName: 'Евгений',
    currentUserLastName:  'Кондратьев',
};

@hot(module)
export default class App extends Component {
    render () {
        return (
            <Catcher>
                <Provider value = { config } >
                    <Feed { ...config } />
                </Provider>
            </Catcher>
        );
    }
}
