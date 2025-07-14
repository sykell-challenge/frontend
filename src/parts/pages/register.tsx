import RegisterTemplate from '../templates/Register';

import { Card, SignInContainer } from './login';

const Register = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="flex">
        <SignInContainer direction="column" justifyContent="space-between">
          <Card>
            <RegisterTemplate />
          </Card>
        </SignInContainer>
      </div>
    </div>
  );
};

export default Register;
