import React from 'react';
import { shallow } from 'enzyme';
import DetailsScreen from './detailsScreen';

describe('<DetailsScreen />', () => {
  test('renders', () => {
    const wrapper = shallow(<DetailsScreen />);
    expect(wrapper).toMatchSnapshot();
  });
});
