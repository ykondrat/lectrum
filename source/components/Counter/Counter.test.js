import Counter from './';
import dom from 'react-test-renderer';

const renderTree = dom.create(<Counter count = { 5 } />).toJSON();

describe('Counter component', () => {
    test('Counter component should correspond to its snapshot', () => {
        expect(renderTree).toMatchSnapshot();
    });
});
