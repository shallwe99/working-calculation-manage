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
import DisplayDataList from './DisplayDataList';
// import DatePicker from '../../DatePicker';
// ----------------------------------------------------------------------

const mapRecordArrayToSubmitArray = (dataArray) =>
  dataArray.map((item) => {
    // eslint-disable-next-line default-case
    const newItem = {};
    newItem.courseName = item.课程名称;
    newItem.price = item.价格;
    // eslint-disable-next-line default-case
    switch (item.类型) {
      case '一对一':
        newItem.courseType = '1:1';
        break;
      case '一对多':
        newItem.courseType = '1:N';
        break;
      case '多对多':
        newItem.courseType = 'N:N';
        break;
      case '多对一':
        newItem.courseType = 'N:1';
        break;
    }
    newItem.enabled = true;
    return newItem;
  });

export default function UploadCourseForm({
  comCode,
  headLabels,
  recordArray,
  callback,
  companyCourseList = []
}) {
  const [loading, setLoading] = useState(false);
  const SubmitCourseSchema = Yup.object().shape({
    comCode: Yup.string().max(8, 'Must be 8 characters').required('required'),
    type: Yup.mixed()
      .oneOf(['course', 'teacher', 'patient'])
      .required('must be one of course|teacher|patient'),
    dataArray: Yup.array().of(
      Yup.object().shape({
        courseName: Yup.string().required('Course Name required'),
        courseType: Yup.mixed().oneOf(['1:1', '1:N', 'N:N', 'N:1']).required('Course Type wrong'),
        price: Yup.number().min(0).required('Price should great or equal 0')
      })
    )
  });

  const submitData = () => {
    const dataArray = mapRecordArrayToSubmitArray(recordArray);
    const submitData = {
      comCode,
      type: 'course',
      dataArray
    };
    // check submitdata format is OK
    SubmitCourseSchema.validate(submitData)
      .then((data) => {
        // 检查导入的课程是否已经存在于该公司的课程列表
        let isExistInComCourseList = false;
        dataArray.forEach((course) => {
          const isExist = companyCourseList.some(
            (companyCourse) => course.courseName === companyCourse.courseName
          );
          if (isExist) isExistInComCourseList = isExist;
        });
        if (isExistInComCourseList) {
          alert('您输入的课程，有些已经存在于系统中，请整理好导入课程，再次操作');
          return;
        }
        // 导入的课程不存在该公司的课程列表时，进行导入
        setLoading(true);
        http
          .post('/batchImportCourseData', {
            comCode,
            type: 'course',
            dataArray
          })
          .then((response) => {
            setLoading(false);
            // process the response and signIn with token and other userInfo
            if (response.status === 200) {
              // fetch all courses again to refresh Course page
              callback();
              alert(response.data.message);
              // signIn(loginData);
              // navigate('/dashboard', { replace: true });
            } else {
              alert(`系统错误\n${JSON.stringify(response.data.errors.msg)}`);
            }
          })
          .catch((err) => {
            setLoading(false);
            callback();
            switch (err.response.status) {
              case 404:
                alert('请求错误-该用户不存在');
                return;
              case 403:
                alert('请求错误，操作被禁止，请联系管理员获取帮助');
                return;
              case 422:
                alert('请求包含错误的参数值');
                return;
              default:
                alert('错误', JSON.stringify(err.reponse.errors.msg));
            }
          });
      })
      .catch((err) => {
        alert(`导入数据格式问题:\n${JSON.stringify(err.errors)}`);
      });
  };

  return (
    <>
      <DisplayDataList headLabels={headLabels} dataRecords={recordArray} />
      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 2 }}>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading}
          sx={{ mr: 2 }}
          onClick={submitData}
        >
          Submit
        </LoadingButton>
        <Button variant="contained" onClick={callback} color="warning">
          Cancel
        </Button>
      </Stack>
    </>
  );
}
