import Title from '../components/Title';
import LoginTemplate from '../templates/Login';
import Welcome from '../templates/Welcome';

const Login = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Title title="Welcome" className="mt-12" />
      <div className="flex gap-32 mt-24">
        <Welcome />
        <LoginTemplate />
      </div>
    </div>
  );
};

export default Login;
