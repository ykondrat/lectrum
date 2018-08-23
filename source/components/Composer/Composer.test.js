import { Composer } from './';

const mocks = {
    _createPostAsyncMock: jest.fn(() => Promise.resolve()),
    preventDefaultMock:   jest.fn()
}

const avatar = 'https://www.avatar.com';
const currentUserFirstName = 'Yevhen';

const props = {
    _createPostAsync: mocks._createPostAsyncMock,
    currentUserFirstName,
    avatar
}

const testComment = 'Hello Lectrum!';
const initialState = {
    comment: ''
}

const mutatedState = {
    comment: testComment
}

const result = mount(<Composer { ...props } />);
const markup = render(<Composer { ...props } />);

const spies = {
    _updateCommentSpy: jest.spyOn(result.instance(), '_handleTeaxtareaChange'),
    _submitCommentSpy: jest.spyOn(result.instance(), '_handleFormSubmit'),
}

describe('Composer component:', () => {
    describe('should have valid markup elements', () => {
        test('core JSX', () => {
            expect(result.find('section.composer')).toHaveLength(1);
            expect(result.find('form')).toHaveLength(1);
            expect(result.find('textarea')).toHaveLength(1);
            expect(result.find('input')).toHaveLength(1);
            expect(result.find('img')).toHaveLength(1);
        });
    });

    describe('should have valid props', () => {
        test('_createPostAsync should be an async function', async () => {
            await expect(
                result.prop('_createPostAsync')()
            ).resolves.toBeUndefined();
        });

        test('currentUserFirstName should be string', () => {
            expect(typeof result.prop('currentUserFirstName')).toBe('string');
        });

        test('avatar should be string', () => {
            expect(typeof result.prop('avatar')).toBe('string');
        });
    });

    describe('should have valid initial state', () => {
        test('comment should be an empty string', () => {
            expect(result.state('comment')).toBe('');
        });
    });

    describe('should have core class methods' , () => {
        describe('_handleSubmit', () => {
            test('should call preventDefault', () => {
                const event = {
                    preventDefault: mocks.preventDefaultMock,
                };

                result.instance()._handleFormSubmit(event);

                expect(mocks.preventDefaultMock).toHaveBeenCalledTimes(1);
            });

            test('should call this._handleSubmit class method', () => {
                expect(spies._submitCommentSpy).toHaveBeenCalledTimes(1);

                jest.clearAllMocks();
            });

            test('should have a valid initial state', () => {
                expect(result.state()).toEqual(initialState);
            });

            test('should call props._createPostAsync with a comment as an argument', () => {
                result.setState({
                    comment: testComment,
                });

                result.instance()._createPost();

                expect(mocks._createPostAsyncMock).toHaveBeenNthCalledWith(
                    1,
                    testComment,
                );

                expect(result.state()).toEqual(initialState);
            });

            test('should update a state.comment value when called onChange', () => {
                const event = {
                    target: {
                        value: testComment,
                    },
                };

                result.instance()._handleTeaxtareaChange(event);

                expect(result.state()).toEqual(mutatedState);

                jest.clearAllMocks();
                result.setState(initialState);
            });
        });

        describe('textarea', () => {
            test('textarea onChange', () => {
                const event = {
                    target: {
                        value: testComment,
                    }
                };

                result.find('textarea').simulate('change', event);

                expect(spies._updateCommentSpy).toHaveBeenCalledTimes(1);
                expect(result.find('textarea').text()).toBe(testComment);
                expect(result.state()).toEqual(mutatedState);
            });
        })
    });

    describe('should render valid markup', () => {
        test('should contain valid css class', () => {
            expect(markup.attr('class')).toBe('composer');
        });
        test('should img src equal to avatar', () => {
            expect(markup.find('img').attr('src')).toBe(avatar);
        });
        test('should img contain valid alt', () => {
            expect(markup.find('img').attr('alt')).toBeTruthy();
        });
        test('should textarea have valid placeholder', () => {
            expect(markup.find('textarea').attr('placeholder')).toBe(`What's on your mind, ${ currentUserFirstName }`);
        });

        test('(Anzyme) snapshot should match', () => {
            expect(markup.html()).toMatchSnapshot();
        });
    });
})
