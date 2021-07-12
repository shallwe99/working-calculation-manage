import React, { useState } from 'react';
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';

export function useForm(initialFValues, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
    if (validateOnChange) validate({ [name]: value });
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  };
}

const RootForm = styled('form')(({ theme }) => ({
  '& .MuiFormControl-root': {
    margin: theme.spacing(1),
    width: '80%'
  }
}));

export function Form(props) {
  const { children, ...other } = props;
  return (
    <RootForm autoComplete="off" {...other}>
      {props.children}
    </RootForm>
  );
}
