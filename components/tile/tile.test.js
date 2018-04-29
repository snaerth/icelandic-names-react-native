import React from 'react';
import { shallow } from 'enzyme';
import Tile from './tile';

describe('<Tile />', () => {
  test('renders', () => {
    const wrapper = shallow(<Tile />);
    expect(wrapper).toMatchSnapshot();
  });
});
