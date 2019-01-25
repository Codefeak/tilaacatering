// @flow
import React from 'react';

type Props = {
  id?: string,
  color?: string,
  size?: string,
  disabled?: string,
  onClick?: () => mixed,
  className?: string,
  label?: string,
  icon?: string,
  formAction?: () => mixed,
  variant?: string,
  type?: string,
};
/* eslint react/button-has-type: 0 */
const Button = ({
  id,
  color,
  size,
  disabled,
  onClick,
  className,
  label,
  icon,
  formAction,
  variant,
  type,
}: Props) => (
  <button
    id={id}
    type={type}
    disabled={disabled}
    onClick={onClick}
    formAction={formAction}
    className={`Button Button--${color} Button--${size} Button--${variant} ${className} ${disabled
      || 'waves-effect waves-light'}`}>
    {label && <span>{label}</span>}
    {icon}
  </button>
);

Button.defaultProps = {
  id: undefined,
  className: undefined,
  color: undefined,
  size: undefined,
  disabled: undefined,
  onClick: undefined,
  label: undefined,
  icon: undefined,
  formAction: undefined,
  type: undefined,
  variant: undefined,
};
export default Button;
