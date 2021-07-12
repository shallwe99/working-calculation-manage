import React from 'react';

// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { AuthContext } from './components/authentication/AuthContext';
// utils
import { saveInfoToLocal, deleteInfofromLocal } from './utils/httpUtils';

// ----------------------------------------------------------------------

export default function App() {
  const authContext = React.useMemo(
    () => ({
      signIn: (loginRTNData) => {
        const userToken = loginRTNData.token;
        const { comCode, teacherId, role, teacherName, telephone, isLoggedIn } = loginRTNData;
        const tokenSavedTime = Math.floor(new Date().getTime() / 1000).toString();
        saveInfoToLocal(
          userToken,
          comCode,
          teacherId,
          role,
          teacherName,
          telephone,
          tokenSavedTime,
          isLoggedIn
        );
      },
      signUp: (registerRTNData) => {
        const userToken = registerRTNData.token;
        const { comCode, teacherId, role, teacherName, telephone, isLoggedIn } = registerRTNData;
        const tokenSavedTime = Math.floor(new Date().getTime() / 1000).toString();
        saveInfoToLocal(
          userToken,
          comCode,
          teacherId,
          role,
          teacherName,
          telephone,
          tokenSavedTime,
          isLoggedIn
        );
      },
      logout: () => {
        // delete storaged sensitive info
        deleteInfofromLocal();
      }
    }),
    []
  );
  return (
    <AuthContext.Provider value={authContext}>
      <ThemeConfig>
        <ScrollToTop />
        <Router />
      </ThemeConfig>
    </AuthContext.Provider>
  );
}
