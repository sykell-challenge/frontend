import Title from "../components/Title";
import RegisterTemplate from "../templates/Register";
import Welcome from "../templates/Welcome";

const Register = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Title title="Welcome" />
      <div className="flex gap-32 mt-24">
        <Welcome />
        <RegisterTemplate />
      </div>
    </div>
  );
};

export default Register;
