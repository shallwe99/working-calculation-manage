// import React, { useEffect } from 'react';
// import {
//   Grid,
//   TextField,
//   Checkbox,
//   Button,
//   Select,
//   FormControl,
//   FormLabel,
//   FormControlLabel,
//   InputLabel,
//   Radio,
//   MenuItem,
//   FormHelperText
// } from '@material-ui/core';
// import LoadingButton from '@material-ui/lab/LoadingButton';

// // import Controls from '../../components/controls/Controls';
// import { useForm, Form } from '../../useForm';
// import RadioGroup from '../../RadioGroup';
// import DatePicker from '../../DatePicker';
// // import * as employeeService from '../../services/employeeService';

// const getItems = [
//   { id: 'male', title: 'Male' },
//   { id: 'female', title: 'Female' },
//   { id: 'other', title: 'Other' }
// ];

// const initialFValues = {
//   id: 0,
//   fullName: '',
//   email: '',
//   mobile: '',
//   city: '',
//   gender: 'male',
//   departmentId: '',
//   hireDate: new Date(),
//   isPermanent: false
// };

// export default function UserForm(props) {
//   const { addOrEdit, recordForEdit } = props;
//   const validate = (fieldValues = values) => {
//     const temp = { ...errors };
//     if ('fullName' in fieldValues)
//       temp.fullName = fieldValues.fullName ? '' : 'This field is required.';
//     if ('email' in fieldValues)
//       temp.email = /$^|.+@.+..+/.test(fieldValues.email) ? '' : 'Email is not valid.';
//     if ('mobile' in fieldValues)
//       temp.mobile = fieldValues.mobile.length > 9 ? '' : 'Minimum 10 numbers required.';
//     if ('departmentId' in fieldValues)
//       temp.departmentId = fieldValues.departmentId.length !== 0 ? '' : 'This field is required.';
//     setErrors({
//       ...temp
//     });
//     if (fieldValues === values) return Object.values(temp).every((x) => x === '');
//   };

//   const { values, setValues, errors, setErrors, handleInputChange, resetForm } = useForm(
//     initialFValues,
//     true,
//     validate
//   );

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       addOrEdit(values, resetForm);
//     }
//   };

//   useEffect(() => {
//     if (recordForEdit !== null) {
//       setValues({ ...recordForEdit });
//     }
//   }, [recordForEdit, setValues]);

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Grid container>
//         <Grid item xs={6}>
//           <TextField
//             name="courseName"
//             label="Course Name"
//             value={values.fullName}
//             onChange={handleInputChange}
//             error={errors.fullName}
//           />
//           <TextField
//             variant="outlined"
//             label="Email"
//             name="email"
//             value={values.email}
//             onChange={handleInputChange}
//             error={errors.email}
//           />
//           <TextField
//             variant="outlined"
//             label="Mobile"
//             name="mobile"
//             value={values.mobile}
//             onChange={handleInputChange}
//             error={errors.mobile}
//           />
//           <TextField
//             variant="outlined"
//             label="City"
//             name="city"
//             value={values.city}
//             onChange={handleInputChange}
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <RadioGroup
//             name="gender"
//             label="Gender"
//             value={values.gender}
//             onChange={handleInputChange}
//             items={getItems}
//           />
//           {/* <Select
//             name="departmentId"
//             label="Department"
//             value={values.departmentId}
//             onChange={handleInputChange}
//             options={[
//               { id: '1', title: 'Development' },
//               { id: '2', title: 'Marketing' },
//               { id: '3', title: 'Accounting' },
//               { id: '4', title: 'HR' }
//             ]}
//             error={errors.departmentId}
//           /> */}
//           <FormControl sx={{ m: 1, minWidth: 120 }}>
//             <InputLabel id="department">Department</InputLabel>
//             <Select
//               labelId="department"
//               id="departmentSelect"
//               label="Department"
//               name="departmentId"
//               value={values.departmentId}
//               defaultValue=""
//               onChange={handleInputChange}
//               renderValue={(value) => `??????  -   ${value}`}
//             >
//               <MenuItem value="">
//                 <em>None</em>
//               </MenuItem>
//               <MenuItem value="1">Development</MenuItem>
//               <MenuItem value="2">Marketing</MenuItem>
//               <MenuItem value="3">Accounting</MenuItem>
//               <MenuItem value="4">HR</MenuItem>
//             </Select>
//             {errors.departmentId && <FormHelperText>{errors.departmentId}</FormHelperText>}
//           </FormControl>
//           <DatePicker
//             name="hireDate"
//             label="Hire Date"
//             value={values.hire}
//             onChange={handleInputChange}
//           />
//           {/* <Checkbox
//             name="isPermanent"
//             label="Permanent Employee"
//             // value={values.isPermanent}
//             onChange={handleInputChange}
//           /> */}
//           <FormControlLabel
//             control={<Checkbox name="isPermanent" onChange={handleInputChange} />}
//             label="Permanent Employee"
//           />
//           {/* <Button type="submit" text="Submit" />
//           <Button color="default" text="Reset" onClick={resetForm} /> */}
//           <LoadingButton
//             // fullWidth
//             // size="large"
//             type="submit"
//             variant="contained"
//             loading
//           >
//             Submit
//           </LoadingButton>
//         </Grid>
//       </Grid>
//     </Form>
//   );
// }

import * as Yup from 'yup';
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Checkbox,
  Radio,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { http, getComCode } from '../utils/httpUtils';
// import DatePicker from '../../DatePicker';
// ----------------------------------------------------------------------

export default function StudentForm({ recordForEdit, callback }) {
  const SubmitPatientSchema = Yup.object().shape({
    patientName: Yup.string().max(22, 'Must be 22 characters or less').required('required'),
    sex: Yup.boolean().required('Sex is required'),
    age: Yup.number().min(0).required('Should great or equal 0')
  });
  const comCode = getComCode();
  let tmpLeftMoney = 0;
  if (recordForEdit) {
    if (recordForEdit.payList && recordForEdit.payList.length > 0) {
      tmpLeftMoney = recordForEdit.payList[recordForEdit.payList.length - 1].currentMoney;
    }
  }
  const formik = useFormik({
    initialValues: {
      // ????????????????????????
      patientName: recordForEdit ? recordForEdit.patientName : '',
      sex: recordForEdit ? recordForEdit.sex : true,
      age: recordForEdit ? recordForEdit.age : 1,
      payType: recordForEdit ? recordForEdit.payType : 'oneTime',
      leftMoney: tmpLeftMoney,
      enabled: recordForEdit ? recordForEdit.enabled : true
    },
    validationSchema: SubmitPatientSchema,
    onSubmit: (values, { setSubmitting }) => {
      let url = '';
      let method = {};
      if (recordForEdit) {
        url = `/patients/${comCode}/${recordForEdit.patientId}`;
        method = http.put;
      } else {
        url = `/patients/${comCode}/addPatient`;
        method = http.post;
      }
      method(url, {
        comCode,
        patientName: values.patientName,
        sex: values.sex,
        age: Number.parseInt(values.age, 10),
        payType: values.payType,
        leftMoney: values.leftMoney,
        enabled: values.enabled
      })
        .then((response) => {
          // process the response and signIn with token and other userInfo
          if (response.status === 200) {
            // fetch all courses again to refresh Course page
            callback();
            alert('new student has been saved to DB successfully.');
            // signIn(loginData);
            // navigate('/dashboard', { replace: true });
          } else {
            alert('????????????', JSON.stringify(response.data.errors.msg));
            setSubmitting(false);
          }
        })
        .catch((err) => {
          setSubmitting(false);
          switch (err.response.status) {
            case 404:
              alert('????????????', '??????????????????');
              return;
            case 403:
              alert('????????????', '????????????????????????????????????????????????');
              return;
            case 409:
              if (err.response.data.errors.msg === 'BLOCKED_USER') {
                alert('????????????', '??????????????????????????????10?????????2???????????????????????????');
              } else {
                alert('????????????', '???????????????????????????');
              }
              return;
            case 422:
              alert('??????', '????????????????????????????????????????????????????????????');
              return;
            default:
              alert('??????', JSON.stringify(err.reponse.errors.msg));
          }
        });
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, resetForm } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="off"
            type="text"
            label="Student Name"
            {...getFieldProps('patientName')}
            error={Boolean(touched.patientName && errors.patientName)}
            helperText={touched.patientName && errors.patientName}
            disabled={!!recordForEdit}
          />
          <TextField
            fullWidth
            autoComplete="age"
            type="text"
            label="Age"
            {...getFieldProps('age')}
            error={Boolean(touched.age && errors.age)}
            helperText={touched.age && errors.age}
          />
          <TextField
            fullWidth
            autoComplete="leftMoney"
            type="text"
            label="Left Money"
            {...getFieldProps('leftMoney')}
            error={Boolean(touched.leftMoney && errors.leftMoney)}
            helperText={touched.leftMoney && errors.leftMoney}
            disabled={!!recordForEdit}
          />
          <FormControl>
            <FormLabel>Sex</FormLabel>
            <RadioGroup column value={values.sex} {...getFieldProps('sex')}>
              {[
                { id: false, title: 'Female' },
                { id: true, title: 'Male' }
              ].map((item, index) => (
                <FormControlLabel
                  key={index}
                  value={item.id}
                  control={<Radio />}
                  label={item.title}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Payment Type</FormLabel>
            <RadioGroup column value={values.payType} {...getFieldProps('payType')}>
              {[
                { id: 'oneTime', title: '????????????' },
                { id: 'monthly', title: '????????????' }
              ].map((item, index) => (
                <FormControlLabel
                  key={item.id}
                  value={item.id}
                  control={<Radio />}
                  label={item.title}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox sx={{ ml: -1 }} {...getFieldProps('enabled')} checked={values.enabled} />
            }
            label="In Using"
          />
        </Stack>

        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#">
            Forgot password?
          </Link>
        </Stack> */}
        <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 2 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting} sx={{ mr: 2 }}>
            Submit
          </LoadingButton>
          <Button
            variant="contained"
            onClick={resetForm}
            color="warning"
            disabled={!!recordForEdit}
          >
            Reset
          </Button>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
