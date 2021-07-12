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
//               renderValue={(value) => `⚠️  -   ${value}`}
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

export default function TeacherForm({ recordForEdit, callback }) {
  const SubmitTeacherSchema = Yup.object().shape({
    teacherName: Yup.string().max(22, 'Must be 22 characters or less').required('required'),
    role: Yup.mixed()
      .oneOf(['admin', 'teacher', 'manager'])
      .required('role must be admin,teacher or manager.'),
    teacherId: Yup.string().email().required('Email is not valid.')
  });
  const comCode = getComCode();
  const formik = useFormik({
    initialValues: {
      // 要在表单中显示的字段
      teacherName: recordForEdit ? recordForEdit.teacherName : '',
      role: recordForEdit ? recordForEdit.role : true,
      teacherId: recordForEdit ? recordForEdit.teacherId : '',
      enabled: recordForEdit ? recordForEdit.enabled : true
    },
    validationSchema: SubmitTeacherSchema,
    onSubmit: (values, { setSubmitting }) => {
      let url = '';
      let method = {};
      if (recordForEdit) {
        url = `/teachers/${comCode}/${recordForEdit.patientId}`;
        method = http.put;
      } else {
        url = `/teachers/${comCode}/addTeacherForBatchSingle`;
        method = http.post;
      }
      method(url, {
        comCode,
        teacherName: values.teacherName,
        teacherId: values.teacherId,
        role: values.role,
        enabled: values.enabled,
        telephone: '13323853685'
      })
        .then((response) => {
          // process the response and signIn with token and other userInfo
          if (response.status === 200) {
            // fetch all courses again to refresh Course page
            callback();
            alert('new teacher has been saved to DB successfully.');
            // signIn(loginData);
            // navigate('/dashboard', { replace: true });
          } else {
            alert('系统错误', JSON.stringify(response.data.errors.msg));
            setSubmitting(false);
          }
        })
        .catch((err) => {
          setSubmitting(false);
          switch (err.response.status) {
            case 404:
              alert('请求错误', '该用户不存在');
              return;
            case 403:
              alert('请求错误', '操作被禁止，请联系管理员获取帮助');
              return;
            case 409:
              if (err.response.data.errors.msg === 'BLOCKED_USER') {
                alert('登陆错误', '您输入的错误次数超过10次，请2小时以后再进行输入');
              } else {
                alert('密码错误', '您输入的密码不正确');
              }
              return;
            case 422:
              alert('错误', '远程服务器问题，请及时联系管理员解决问题');
              return;
            default:
              alert('错误', JSON.stringify(err.reponse.errors.msg));
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
            autoComplete="teacherName"
            type="text"
            label="Teacher Name"
            {...getFieldProps('teacherName')}
            error={Boolean(touched.teacherName && errors.teacherName)}
            helperText={touched.teacherName && errors.teacherName}
            disabled={!!recordForEdit}
          />
          <TextField
            fullWidth
            autoComplete="teacherId"
            type="text"
            label="Email Address"
            {...getFieldProps('teacherId')}
            error={Boolean(touched.teacherId && errors.teacherId)}
            helperText={touched.teacherId && errors.teacherId}
            disabled={!!recordForEdit}
          />
          <FormControl>
            <FormLabel>Role</FormLabel>
            <RadioGroup column value={values.payType} {...getFieldProps('role')}>
              {[
                { id: 'admin', title: 'Admin' },
                { id: 'teacher', title: 'Teacher' },
                { id: 'manager', title: 'Manager' }
              ].map((item) => (
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
