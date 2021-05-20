import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";

const Register = () => {
  const [name, setName] = useState("Arif");
  const [email, setEmail] = useState("arif@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      //console.table(name, email, password);
      const { data } = await axios.post(`/api/register`, {
        name,
        email,
        password,
      });
      // console.log("Register res--->", data);
      toast.success("Registration successfull.");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data);
    }
  };
  return (
    <>
      <h1 className='container-fluid p-5 jumbotron text-center'>Register</h1>
      <div className='container col-md-4 offset-md-4 pb-5'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            className='form-control mb-4 p-2'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter name'
            required
          />
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
            disabled={!name || !email || !password || loading}
            className='btn btn-block btn-primary'
          >
            {loading ? <SyncOutlined spin /> : "Register"}
          </button>
        </form>

        <p className='text-center p-3'>
          Already registered?{" "}
          <Link href='/login'>
            <a>Login</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
