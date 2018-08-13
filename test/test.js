import React from 'react';
import App from '../src/App';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure( { adapter : new Adapter() });

const setup = () => {
  const props = {
    location:{
      pathname:'/'
    }
  };
  const enzymeWrapper = shallow(<App {...props}/>);
  return {
    props,
    enzymeWrapper
  };
};

describe('App', () => {
  const { enzymeWrapper, props } = setup();
  it('should render', () => {
    console.log(enzymeWrapper);
    expect(enzymeWrapper).toBeDefined();
  });
});
