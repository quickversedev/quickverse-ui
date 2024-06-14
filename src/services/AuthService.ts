export type AuthData = {
  token: string;
  email: string;
  name: string;
};
const signIn = (
  phoneNumber: string,
  _pin: string,
  _campusId: string,
): Promise<AuthData> => {
  // this is a mock of an API call, in a real app
  // will be need connect with some real API,
  // send email and password, and if credential is corret
  //the API will resolve with some token and another datas as the below
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        token: JWTTokenMock,
        email: phoneNumber,
        name: 'Lucas Garcez',
      });
    }, 1000);
  });
};
const signUp = (
  firstName: string,
  lastName: string,
  phoneNumber: string,
  campusId: string,
  email: string,
): Promise<AuthData> => {
  // Mocked sign-up function for demonstration purposes
  // Replace this with your actual API call
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        token: JWTTokenMock,
        email: email,
        name: 'Lucas Garcez',
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
