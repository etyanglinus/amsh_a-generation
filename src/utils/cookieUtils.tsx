import Cookies from 'js-cookie';

export const getUserDetails = () => {
  const userData = Cookies.get('userData');
  if (userData) {
    return JSON.parse(userData);
  }
  return null;
};
