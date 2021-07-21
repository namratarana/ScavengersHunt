import { useEffect, useState } from 'react';
import Header1 from './header1';
import axios from 'axios';
import { useRouter } from 'next/router';
import { motion } from "framer-motion";


function Home() {
  const [token1, setToken1] = useState(false);
  const router = useRouter();

  useEffect(async () => {

    const token =
      localStorage.getItem("token")

    await axios.get(`${process.env.BACKEND_URL}/user/data?token=${token}`)
      .then((res) => {
        console.log(res.data.name)
        setToken1(true);
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem('token');
      })
  }, [])

  const verify = () => {
    if (token1) {
      router.push("/verifyLocations");
    }
    else {
      router.push("/signUp");
    }
  }
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} >
      <div>
        <Header1 />
      </div>
      <div className="homeBg">
        <button className="StartButton" onClick={verify}>
          START ADVENTURE
        </button>
      </div>
    </motion.div>

  );
}

export default Home;