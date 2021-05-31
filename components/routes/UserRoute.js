import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";

const UserRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");
      //   console.log(data);
      if (data.ok) setOk(true);
    } catch (err) {
      console.error(err);
      setOk(false);
      router.push("/login");
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      {!ok ? (
        <SyncOutlined
          spin
          className='d-flex justify-center display-1 text-primary p-5'
        />
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default UserRoute;