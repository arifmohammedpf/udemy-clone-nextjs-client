import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";
import Password from "antd/lib/input/Password";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // context
  const {
    state: { user },
  } = useContext(Context);
  // router
  const router = useRouter();
  // redirect if user is logged in
  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/forgot-password", { email });
      setSuccess(true);
      toast("Check your email for reset code");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast(err.response.data);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/reset-password", {
        email,
        code,
        newPassword,
      });
      setEmail("");
      setCode("");
      setNewPassword("");
      setLoading(false);
      toast("Password reset Success");
    } catch (err) {
      setLoading(false);
      toast(err.response.data);
    }
  };

  return (
    <>
      <h1 className='jumbotron container-fluid p-5 text-center bg-primary square'>
        Forgot Password?
      </h1>
      <div className='container col-md-4 offset-md-4 pb-5'>
        <form onSubmit={success ? handleResetPassword : handleSubmit}>
          <input
            type='email'
            className='form-control mb-4 p-4'
            vaue={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter email'
            required
          />
          {success && (
            <>
              <input
                type='text'
                className='form-control mb-4 p-4'
                vaue={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder='Enter reset Code'
                required
              />
              <input
                type='password'
                className='form-control mb-4 p-4'
                vaue={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder='Enter New Password'
                required
              />
            </>
          )}
          <button
            type='submit'
            disabled={loading || !email}
            className='btn btn-primary btn-block p-2'
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
