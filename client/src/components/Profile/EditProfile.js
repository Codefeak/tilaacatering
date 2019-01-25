import React, { Component } from 'react';

class EditProfile extends Component {
  state = {
    name: '',
    email: '',
    companyName: '',
    number: '',
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const {
      name, email, companyName, number,
    } = this.state;
    return (
      <div className="profile-layout__edit">
        <h1>Edit Profile</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">
            Name:
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.onChange}/>
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.onChange}/>
          </label>
          <label htmlFor="companyName">
            Company Name:
            <input
              type="text"
              name="companyName"
              value={companyName}
              onChange={this.onChange}/>
          </label>
          <label htmlFor="number">
            Credit Card Number:
            <input
              type="text"
              name="number"
              value={number}
              onChange={this.onChange}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
export default EditProfile;
