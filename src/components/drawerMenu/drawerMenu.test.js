import React from 'react';
import { shallow } from 'enzyme';
import DrawerMenu from './drawerMenu';

describe('<DrawerMenu />', () => {
  test('renders', () => {
    const wrapper = shallow(<DrawerMenu />);
    expect(wrapper).toMatchSnapshot();
  });
});
