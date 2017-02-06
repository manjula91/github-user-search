import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

import SearchForm from '../../src/components/SearchForm';

describe('Component: SearchForm', () => {

  it('should render as expected', () => {
    const component = renderer.create(<SearchForm pushRoute={jest.fn()} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('when an initialQuery prop is absent', () => {
    it('should set inputValue to an empty string', () => {
      const wrapper = shallow(<SearchForm pushRoute={jest.fn()} />);
      expect(wrapper.state('inputValue')).toEqual('');
    });
  });

  describe('when a different initialQuery is set', () => {
    it('should update the state', () => {
      const wrapper = shallow(
        <SearchForm
          initialQuery={'hello'}
          pushRoute={jest.fn()}
        />
      );
      expect(wrapper.state('inputValue')).toEqual('hello');
      wrapper.setProps({
        initialQuery: 'foo',
      });
      expect(wrapper.state('inputValue')).toEqual('foo');
    });
  });

  describe('when the form is submitted', () => {
    describe('and the state has an input value', () => {
      it('should push the query as a new route', () => {
        const spy = jest.fn();
        const wrapper = shallow(
          <SearchForm
            pushRoute={spy}
          />
        );
        wrapper.setState({inputValue: 'test'});
        wrapper.simulate('submit', {preventDefault: f => f});
        expect(spy.mock.calls[0]).toMatchSnapshot();
      });
    });

    describe('and the state has no inputValue', () => {
      it('should not call the pushRoute function', () => {
        const spy = jest.fn();
        const wrapper = shallow(
          <SearchForm
            pushRoute={spy}
          />
        );
        wrapper.simulate('submit', {preventDefault: f => f});
        expect(spy).not.toHaveBeenCalled();
      });
    });
  });

});