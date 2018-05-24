import React from 'react';
import { shallow } from 'enzyme';
import SavedListScreen from './savedListScreen';

describe('<SavedListScreen />', () => {
  test('renders', () => {
    const wrapper = shallow(<SavedListScreen />);
    expect(wrapper).toMatchSnapshot();
  });
});
