import React from 'react';
import { number } from 'prop-types';
import Styles from './styles.m.css';

const Counter = (props) => (
    <section className = { Styles.counter }>Posts count: { props.count }</section>
)

Counter.propType = {
    count: number.isRequired
}

Counter.defaultProps = {
    count: 0
}

export default Counter;
