import { useEffect, useState } from "react";
import axios from 'axios';
import { useRouter } from "next/router";

function OTP() {
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            router.push('/');
        }
    }, [])

    const [data, setData] = useState();
    const [hide, setHide] = useState(true);

    const getOTP = (e) => {
        e.preventDefault();
        axios.put(`${process.env.BACKEND_URL}/user/getOTP`, data)
            .then((res) => {
                console.log(res.data);
                setHide(false);
            })
            .catch((err) => {
                console.log(err);
            })

    }

    const verifyOTP = (e) => {
        e.preventDefault();
        axios.post(`${process.env.BACKEND_URL}/user/verifyOTP`, data)
            .then((res) => {
                localStorage.setItem('token', res.data.myToken);
                router.push("/verifyLocations");

            })
            .catch((err) => {
                alert("OTP does not matches");
            })
    }
    return (
        <div className="main-form ">
            <div className="form-box form-two">
                <form id="login" className="input-group1">
                    <input type="text" className="input-field" placeholder="Email ID" disabled={!hide} required onChange={(e) => setData({ ...data, email: e.target.value })} />
                    {hide == false ? <input type="text" className="input-field" placeholder="OTP" onChange={(e) => setData({ ...data, otp: e.target.value })} /> : null}
                    {hide ? <button type="submit" className="submit-btn one" onClick={getOTP} >Get OTP</button> : null}
                    {hide == false ? <button type="submit" className="submit-btn one" onClick={verifyOTP} >Login</button> : null}
                </form>
            </div>
        </div>
    )
}
export default OTP;