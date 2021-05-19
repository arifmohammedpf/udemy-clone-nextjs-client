import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("Arif");
  const [email, setEmail] = useState("arif@gmail.com");
  const [password, setPassword] = useState("1234567");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.table(name, email, password);
    const { data } = await axios.post(`http://localhost:8000/api/register`, {
      name,
      email,
      password,
    });
    console.log("Register res--->", data);
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
          <button type='submit' className='btn btn-block btn-primary'>
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
