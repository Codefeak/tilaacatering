// @flow

import React from 'react';
import Button from '../Button';

type Props = {
  handleSubmit: () => mixed,
  handleChange: () => mixed,
};
const EmailForm = ({ handleSubmit, handleChange }: Props) => (
  <form className="form" onSubmit={handleSubmit}>
    <div className="form-group">
      <br />
      <h4>Please Send Your Registered Email Address </h4>
      <input
        name="email"
        className="input"
        type="email"
        placeholder="Email"
        label="Email"
        onChange={handleChange}/>
      <br />
      <br />
      <br />
      <br />
      <Button className="Button" type="submit">
        Submit
      </Button>
    </div>
  </form>
);

export default EmailForm;
