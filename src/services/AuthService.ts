export type AuthData = {
  token: string;
  phoneNumber: string;
  name: string;
};
const signIn = (
  phoneNumber: string,
  _pin: string,
  _campusId: string,
): Promise<AuthData> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        token: JWTTokenMock,
        phoneNumber: phoneNumber,
        name: 'Lucas Garcez',
        
      });
    }, 1000);
  });
};
const signUp = (
  fullName: string,
  phoneNumber: string,
  _campusId: string,
  _email: string,
  _pin: string,
): Promise<AuthData> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        token: JWTTokenMock,
        phoneNumber: phoneNumber,
        name: fullName,
      
      });
    }, 1000);
  });
};
export const authService = {
  signIn,
  signUp,
};

const JWTTokenMock =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikx1Y2FzIEdhcmNleiIsImlhdCI6MTUxNjIzOTAyMn0.oK5FZPULfF-nfZmiumDGiufxf10Fe2KiGe9G5Njoa64';
