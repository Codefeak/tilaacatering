// @flow
import * as React from 'react';
import MediaQuery from 'react-responsive';
import pageBreak from '../../styles/variables/variables';

type Props = {
  device: string,
  children: React.Node,
};

const devices = {
  mobile: {
    min: null,
    max: pageBreak.small,
  },
  mobileAndLarger: {
    min: pageBreak.small + 1,
    max: null,
  },
  tablet: {
    min: pageBreak.small + 1,
    max: pageBreak.medium,
  },
  tabletAndLarger: {
    min: pageBreak.medium,
    max: null,
  },
};

const DeviceView = (props: Props) => {
  const { device, children } = props;
  return (
    <MediaQuery minWidth={devices[device].min} maxWidth={devices[device].max}>
      {children}
    </MediaQuery>
  )
};

export default DeviceView;
