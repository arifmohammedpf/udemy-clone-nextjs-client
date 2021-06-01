import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("arif@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  // state
  const { state, dispatch } = useContext(Context);
  // router
  const router = useRouter();

  // protect route
  const { user } = state;
  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      //console.table(name, email, password);
      const { data } = await axios.post(`/api/login`, {
        email,
        password,
      });
      // console.log("Login res--->", data);
      dispatch({
        type: "LOGIN",
        payload: data,
      });
      // save in local storage
      window.localStorage.setItem("user", JSON.stringify(data));

      setLoading(false);
      router.push("/user");
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data);
    }
  };
  return (
    <>
      <h1 className='container-fluid p-5 jumbotron text-center'>Login</h1>
      <div className='container col-md-4 offset-md-4 pb-5'>
        <form onSubmit={handleSubmit}>
          <input
            type='email'
            className='form-control mb-4 p-2'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter email'
            required
          />
          <input
            type='password'
            className='form-control mb-4 p-2'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter Password'
            required
          />
          <button
            type='submit'
            disabled={!email || !password || loading}
            className='btn btn-block btn-primary'
          >
            {loading ? <SyncOutlined spin /> : "Login"}
          </button>
        </form>

        <p className='text-center pt-3'>
          Not yet registered?{" "}
          <Link href='/register'>
            <a>Register</a>
          </Link>
        </p>

        <p className='text-center'>
          <Link href='/forgot-password'>
            <a className='text-danger'>Forgot password?</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
