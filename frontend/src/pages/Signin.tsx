import { Link, useNavigate } from "react-router";
import Button from "../components/Button";
import LabelledInput from "../components/LabelledInput";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { SigninInput } from "../common/index";
import { Feather } from "lucide-react";
import { useAppDispatch } from "../hooks/hooks";
import { fetchUser } from "../features/userSlice";
import { toast } from "sonner";

const Signin = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isSubmitting,setIsSubmitting] = useState(false)
  const [inputs, setInputs] = useState<SigninInput>({
    email: "",
    password: "",
  });
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInputs({
      ...inputs,
      [e.target.name.toLowerCase()]: e.target.value,
    });
  }
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsSubmitting(true)
      let res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, inputs);
      let jwt = res.data.jwt;
      localStorage.setItem("token", jwt);
      dispatch(fetchUser())
      toast.success('Signin Successfully')
      navigate('/')
    } catch (error:any) {
      toast.error(error.response.data.error);
    }finally{
      setIsSubmitting(false)
    }
  }
  return (
    <div className="flex min-h-screen bg-white/10 flex-col justify-center px-6 py-20 lg:px-8">
      <div className="mx-auto sm:w-full sm:max-w-sm">
        <div className="text-center w-full max-w-xs md:max-w-md lg:max-w-lg">
          <Link to={"/"} className="flex justify-center items-center text-2xl sm:text-4xl font-extrabold">
            Eazy
          <Feather size={28} />
          </Link>
        <h2 className="text-2xl sm:text-3xl font-bold">
          Login an account
        </h2>
        </div>
      </div>

      <div className="mt-6 mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
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
          <Button className="w-full max-w-xs md:max-w-md lg:max-w-lg" variant="secondary" disabled={isSubmitting}>Sign In</Button>
        </form>

        <p className="mt-6 text-center w-full max-w-xs md:max-w-md lg:max-w-lg">
          Don't have an account?
          <Link
            to="/signup"
            className="font-semibold text-indigo-500 hover:text-indigo-400"
          >
            {" "}
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
