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
    try {
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
    } catch (error) {
      console.error('Error during registration:', error);
      setRegisterError({
        error: true,
        message: 'An error occurred during registration.',
      });
      setIsRegisterLoading(false);
    }
  },
  [registerInfo]
);

    const updateLoginInfo = useCallback((info) => {
      setLoginInfo(info);
    }, []);
  const loginUser = useCallback(
    async (e) => {
      try {
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
      } catch (error) {
        console.error('Error during login:', error);
        setLoginError({
          error: true,
          message: 'Email or Password is required.',
        });
        setIsLoginLoading(false);
      }
    },
    [loginInfo]
  );


  const logoutUser = useCallback(() => {
    localStorage.removeItem('User');
    history.push('/login');
    setUser(null);
  }, [history, setUser]);
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
