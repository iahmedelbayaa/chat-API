import { createContext, useCallback, useEffect, useState } from 'react';
import { baseUrl, postRequest } from '../utils/services';

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  console.log('User', user);
    console.log('Login', loginInfo);

  useEffect(() => {
    const user = localStorage.getItem('User');
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);
  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);
  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsRegisterLoading(true);
      setRegisterError(null);
      const response = await postRequest(
        `${baseUrl}/signup`,
        JSON.stringify(registerInfo)
      );
      setIsRegisterLoading(false);

      if (response.error) {
        return setRegisterError(response);
      }
      localStorage.setItem('User', JSON.stringify(response));
      setUser(response);
    },
    [registerInfo]
  );
  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoginLoading(true);
      setLoginError(null);
      const response = await postRequest(
        `${baseUrl}/login`,
        JSON.stringify(loginInfo)
      );
      setIsLoginLoading(false);

      if (response.error) {
        return setLoginError(response);
      }
      localStorage.setItem('User', JSON.stringify(response));
      setUser(response);
    },
    [loginInfo]
  );
  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);
  const logoutUser = useCallback(() => {
    localStorage.removeItem('User');
    setUser(null);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        logoutUser,
        loginUser,
        updateLoginInfo,
        loginInfo,
        loginError,
        isLoginLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
