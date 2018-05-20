import React from 'react';
import { shallow } from 'enzyme';
import Alphabet from './alphabet';

describe('<Alphabet />', () => {
  test('renders', () => {
    const wrapper = shallow(<Alphabet />);
    expect(wrapper).toMatchSnapshot();
  });
});
