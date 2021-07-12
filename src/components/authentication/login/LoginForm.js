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
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { http } from '../../../utils/httpUtils';
import { AuthContext } from '../AuthContext';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const { signIn } = React.useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      http
        .post('login', { teacherId: values.email, password: values.password })
        .then((response) => {
          // process the response and signIn with token and other userInfo
          if (response.status === 200) {
            const {
              comCode,
              role,
              // teacherId,
              teacherName,
              telephone
            } = response.data.user;
            const loginData = {
              token: response.data.token,
              comCode,
              role,
              teacherId: values.email,
              teacherName,
              telephone,
              isLoggedIn: true
            };
            if (role !== 'admin') {
              alert('本系统只有管理员可以登录哦！');
              resetForm();
              return;
            }
            signIn(loginData);
            navigate('/dashboard', { replace: true });
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

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          {/* <Link component={RouterLink} variant="subtitle2" to="#">
            Forgot password?
          </Link> */}
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
