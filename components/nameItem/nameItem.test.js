import React from 'react';
import { shallow } from 'enzyme';
import NameItem from './nameItem';

describe('<NameItem />', () => {
  test('renders', () => {
    const wrapper = shallow(<NameItem />);
    expect(wrapper).toMatchSnapshot();
  });
});
