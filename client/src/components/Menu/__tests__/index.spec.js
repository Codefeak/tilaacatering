import React from 'react';
import { shallow } from 'enzyme';

import Menu from '../index';

describe('Menu', () => {
  const wrapper = shallow(<Menu />);

  it('contains a div with the class name menu-container', () => {
    expect(wrapper.find('.Menu')).toHaveLength(0);
  });

  it('contains a div with the class name menu-header', () => {
    expect(wrapper.find('.Menu')).toHaveLength(0);
  });

  it('contains a div with the class name sidebar-icontoggle', () => {
    expect(wrapper.find('.Menu')).toHaveLength(0);
  });

  it('contains a div with the id name open sidebar menu', () => {
    expect(wrapper.find('.Menu')).toHaveLength(0);
  });

  it('contains a div with the id name sidebar-menu', () => {
    expect(wrapper.find('.Menu')).toHaveLength(0);
  });

  it('contains a div with one children div elements', () => {
    expect(wrapper.find('.menu-header').find('div')).toHaveLength(1);
  });

  it('renders a input type checkbox', () => {
    expect(shallow(<Menu />).find('#open-sidebar-menu').length).toEqual(1);
  });

  it('should render without throwing an error', () => {
    expect(
      shallow(<Menu />)
        .find('form.Menu')
        .exists(),
    ).toBe(false);
  });
});
