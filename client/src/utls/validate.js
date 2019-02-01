const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = '*Required Email';
  } else if (values.length < 2 && values.length > 20) {
    errors.name = '*Full name must be between 2 and 20 characters';
  } else if (/[0-9]/i.test(values.name)) {
    errors.name = '*Full name cannot contain number';
  }
  if (!values.company) {
    errors.company = '*Required Company Name';
  } else if (values.company.length < 2 || values.company.length > 20) {
    errors.company = '*Full name must be between 2 and 20 characters';
  }
  if (!values.email) {
    errors.email = '*Required Email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = '*Invalid email address';
  }
  if (!values.newPassword) {
    errors.newPassword = '*Required Password';
  } else if (
    !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(values.newPassword)
  ) {
    errors.newPassword = '*At least 8 characters, 1 number, 1 capital & 1 symbol';
  }
  if (!values.password) {
    errors.password = '*Required Password';
  }
  if (!values.phone) {
    errors.phone = '*Required Phone Number';
  } 
  else if (!/(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s.]?[(]?[0-9]{1,3}[)]?([-\s.]?[0-9]{3})([-\s.]?[0-9]{3,4})/.test(values.phone)) {
    errors.phone = '*Enter with countrycode';
  }

  return errors;
};

export default validate;
