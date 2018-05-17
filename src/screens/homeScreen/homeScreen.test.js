import React from 'react';
import { shallow } from 'enzyme';
import HomeScreen from './homeScreen';

describe('<HomeScreen />', () => {
  test('renders', () => {
    const wrapper = shallow(<HomeScreen />);
    expect(wrapper).toMatchSnapshot();
  });
});
