import { Link, useNavigate } from "react-router";
import { ChangeEvent, FormEvent, useState } from "react";
import { SignupInput } from "../common/index";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Feather } from "lucide-react";
import { toast } from "sonner";
import LabelledInput from "../components/LabelledInput";
import Button from "../components/Button";

const Signup = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputs, setInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name.toLowerCase()]: e.target.value,
    });
  };
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, inputs);
      let jwt = res.data.jwt;
      localStorage.setItem("token", jwt);
      navigate("/profile");
      toast.success("Signup Successfull");
    } catch (error: any) {
      const msg = error.response.data.error;
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div className="flex min-h-screen bg-white flex-col justify-center px-6 py-6 lg:px-8">
      <div className="mx-auto sm:w-full sm:max-w-sm">
        <div className="text-center w-full max-w-xs md:max-w-md lg:max-w-lg">
          <Link to={"/"} className="flex justify-center items-center text-2xl sm:text-4xl font-extrabold">
            Eazy
          <Feather size={28} />
          </Link>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Create an account
          </h2>
        </div>
      </div>

      <div className="mt-6 mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <LabelledInput
            label="Name"
            value={inputs.name}
            onChange={handleChange}
            placeholder="Jhon Doe"
          />
          <LabelledInput
            value={inputs.email}
            type="email"
            label="Email"
            placeholder="jhondoe@gmail.com"
            onChange={handleChange}
          />
          <LabelledInput
            value={inputs.password}
            type="password"
            label="Password"
            placeholder="******"
            onChange={handleChange}
          />
            <Button className="w-full max-w-xs md:max-w-md lg:max-w-lg" disabled={isSubmitting} variant="secondary">
              Signup
            </Button>
        </form>

        <p className="mt-6 text-center w-full max-w-xs md:max-w-md lg:max-w-lg text-gray-500">
          Already have an account?
          <Link
            to="/signin"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            {" "}
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
