// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import type { StoreState } from '../../utls/flowTypes';
import Button from '../Button';
import { getProfileState } from '../../store/reducers';
import * as actions from '../../store/actions';

type Fn = () => mixed;
type Props = {
  profile: { name: string, email: string, company: string },
  user: { id: string },
  fetchProfile: string => mixed,
  editProfile: (string, values?: {}) => mixed,
  handleSubmit: Fn => mixed,
};
type State = {
  isEditing: boolean,
};

function renderField({
  input, label, type, className, readOnly,
}) {
  return (
    <>
      <span className="profile-form__details">{label} :</span>
      <input type={type} placeholder="(no data)" className={className} readOnly={readOnly} {...input} />
    </>
  );
}

class Profile extends Component<Props, State> {
  state = { isEditing: false };

  fields = [
    {
      name: 'company',
      className: 'profile-form__company-name',
      icon: 'fas fa-building fa-lg',
    },
    {
      name: 'name',
      className: 'profile-form__name',
      icon: 'fas fa-user  fa-lg',
    },
    {
      name: 'phone',
      className: 'profile-form__number',
      icon: 'fas fa-phone fa-lg',
    },
    {
      name: 'email',
      className: 'profile-form__email',
      icon: 'fas fa-envelope fa-lg',
    },
    {
      name: 'website',
      className: 'profile-form__web',
      icon: 'fas fa-link fa-lg',
    },
  ];

  componentDidMount() {
    const { user, fetchProfile } = this.props;
    fetchProfile(user.id);
  }

  handleClick: Fn = (values) => {
    const { isEditing } = this.state;
    const { editProfile, user } = this.props;
    // eslint-disable-next-line no-unused-expressions
    isEditing === false
      ? this.setState(prevState => ({ isEditing: !prevState.isEditing }))
      : editProfile(user.id, values)
        && this.setState(prevState => ({ isEditing: !prevState.isEditing }));
  };

  render() {
    const { handleSubmit, reset } = this.props;
    const { isEditing } = this.state;

    return (
      <div className="profile-layout">
        <div className="profile-layout__info">
          <form onSubmit={handleSubmit(this.handleClick)} className="profile-form">
            <ul>
              {this.fields.map(field => (
                <li key={field.name}>
                  <span className={field.icon} />
                  <Field
                    component={renderField}
                    name={field.name}
                    label={field.name}
                    readOnly={!isEditing}
                    className={`${!isEditing ? 'without-border' : ''} ${field.className}`}/>
                </li>
              ))}
              <div className="btn-container">
                <Button
                  type="submit"
                  variant="contained"
                  color="on-light"
                  size="md"
                  label={isEditing ? 'Save Details' : 'Edit Details'}/>
                {isEditing === true && (
                  <Button
                    type="button"
                    onClick={() => {
                      reset();
                      this.setState(prevState => ({ isEditing: !prevState.isEditing }));
                    }}
                    label="Cancel"
                    size="md"
                    variant="outlined"
                    color="secondary"/>
                )}
              </div>
            </ul>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => {
  const {
    name, email, company, phone, website,
  } = getProfileState(state);
  return {
    profile: getProfileState(state),
    initialValues: {
      name,
      email,
      phone,
      company,
      website,
    },
  };
};

export default connect(
  mapStateToProps,
  actions,
)(
  reduxForm({
    form: 'profile',
    destroyOnUnmount: true,
    enableReinitialize: true,
  })(Profile),
);
