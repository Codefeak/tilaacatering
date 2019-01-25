import React from 'react';
import { shallow } from 'enzyme';
import DateIcon from '..';
import dayjs from 'dayjs';

describe('DateIcon', () => {
  let wrapper;
  const date = '2018-05-05T08:08:08';
  const dateIcon = 'dateIcon';
  const month = 'dateIcon__month';
  const day = 'dateIcon__day';

  beforeEach(() => {
    wrapper = shallow(<DateIcon date={date} />);
  });

  describe('Elements and basic class names', () => {
    it('should render div with class dateIcon', () => {
      expect(wrapper.find('div').first().hasClass(dateIcon)).toBe(true);
    });

    it('should render div with class dateIcon__month and a p element inside it', () => {
      const wrapperTarget = wrapper.find('div').first().children('div').at(0);
      expect(wrapperTarget.hasClass(month)).toBe(true);
      expect(wrapperTarget.children('p')).toHaveLength(1);
    });

    it('should render div with class dateIcon__day and a p element inside it', () => {
      const wrapperTarget = wrapper.find('div').first().children('div').at(1);
      expect(wrapperTarget.hasClass(day)).toBe(true);
      expect(wrapperTarget.children('p')).toHaveLength(1);
    });
  });

  describe('Date formats', () => {
    const dateString = '2018-01-01T00:00:01';
    it('should have correct Month printed out out using DayJs', () => {
      const output = dayjs(dateString).format('MMM').toUpperCase();
      wrapper.setProps({ date: dateString });
      expect(wrapper.find('p').at(0).text()).toBe(output);
    });
    it('should have correct Day printed out out using DayJs', () => {
      const output = dayjs(dateString).format('DD').toUpperCase();
      wrapper.setProps({ date: dateString });
      expect(wrapper.find('p').at(1).text()).toBe(output);
    });
  });

  describe('Props and prop dependant class names', () => {
    describe('color size', () => {
      it('should have default class of default', () => {
        const colorDefault = 'dateIcon--color-default';
        expect(wrapper.find('div').first().hasClass(colorDefault)).toBe(true);
      });
      it('should have correct color class according to prop color', () => {
        const color = 'primary';
        const colorClass = `dateIcon--color-${color}`;
        wrapper.setProps({ color });
        expect(wrapper.find('div').first().hasClass(colorClass)).toBe(true);
      });
    });
  });
});
