import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import Feed from '../../components/Feed';
import { Provider } from '../../HOC/withProfile';
import avatar from '../../theme/assets/homer.png';

const config = {
    avatar,
    currentUserFirstName: 'Yevhen',
    currentUserLastName:  'Kondratyev',
};

@hot(module)
export default class App extends Component {
    render () {
        return (
            <Provider value = { config } >
                <Feed { ...config } />
            </Provider>
        );
    }
}
