import renderer from 'react-test-renderer';
import Avatar from '../Avatar';

it('renders bubble avatar', () => {
    const component = renderer.create(
        <Avatar source="" />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});