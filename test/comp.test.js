import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { HomePage } from '../src/components/HomePage';

Enzyme.configure( { adapter : new Adapter() });

const setup = () => {
  const props = {
    logout: jest.fn(),
    isAuthenticated:true
  };
  const enzymeWrapper = shallow(<HomePage {...props}/>);
  return {
    props,
    enzymeWrapper
  };
};


describe(' HomePage Component', () => {
  const { enzymeWrapper, props } = setup();
  it('Should Render', () => {
    expect(enzymeWrapper.find('div').hasClass('container'))
      .toBe(false);
  });
});
