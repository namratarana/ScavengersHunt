import { useEffect, useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from "next/link";
import { motion } from 'framer-motion';
import { Github, Twitter } from 'react-bootstrap-icons'

function SignUpForm() {
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            router.push('/');
        }
    }, [])
    const [data, setData] = useState();
    const [loginData, setLoginData] = useState();
    const [error1, setError1] = useState({ userError: '', emailError: '', pwError: '' });
    const [error2, setError2] = useState({ userError: '', pwError: '' });

    const register = () => {
        var x = document.getElementById('login');
        var y = document.getElementById('register');
        var z = document.getElementById('btn');
        x.style.left = "-400px";
        y.style.left = "50px";
        z.style.left = "110px";
    }
    const login = () => {
        var x = document.getElementById('login');
        var y = document.getElementById('register');
        var z = document.getElementById('btn');
        x.style.left = "50px";
        y.style.left = "450px";
        z.style.left = "0px";
    }
    const signUpSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.BACKEND_URL}/user/`, data)
            .then((res) => {
                localStorage.setItem('token', res.data.myToken);
                alert(res.data.message);
                router.push("/verifyLocations");
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const loginSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.BACKEND_URL}/user/login`, loginData)
            .then((res) => {
                alert(res.data.message);
                localStorage.setItem('token', res.data.myToken)
                router.push("/verifyLocations");
            })
            .catch((e) => {
                console.log(e)
            });

    }
    const validate = (e) => {
        switch (e.target.name) {
            case "s_userID":
                console.log(e.target.name);
                if (e.target.value === "") {
                    setError1({ ...error1, userError: "User Id cannot be blank!" });
                }
                else if (e.target.value.length < 6 || e.target.value.length > 12) {
                    setError1({ ...error1, userError: "User Id must be 6 to 12 characters long" });
                }
                else if (e.target.value.includes(' ')) {
                    setError1({ ...error1, userError: "User Id must not contain space" });
                }
                else {
                    setError1({ ...error1, userError: "" });
                    setData({ ...data, user: e.target.value });
                }
                break;
            case "s_emailID":
                console.log(e.target.name);
                if (e.target.value === "") {
                    setError1({ ...error1, emailError: "Email Id cannot be blank!" });
                }
                else if (e.target.value.includes(' ')) {
                    setError1({ ...error1, emailError: "Email Id must not contain space" });
                }
                else {
                    setError1({ ...error1, emailError: "" });
                    setData({ ...data, email: e.target.value });
                }
                break;
            case "s_password":
                console.log(e.target.name);
                if (e.target.value === "") {
                    setError1({ ...error1, pwError: "Password cannot be blank!" });

                }
                else if (e.target.value.length < 6 || e.target.value.length > 12) {
                    setError1({ ...error1, pwError: "Password must be 6 to 12 characters long" });
                }
                else if (e.target.value.includes(' ')) {
                    setError1({ ...error1, pwError: "Password must not contain space" });
                }
                else {
                    setError1({ ...error1, pwError: "" });
                    setData({ ...data, password: e.target.value });
                }
                break;
            case "l_userID":
                console.log(e.target.name);
                if (e.target.value === "") {
                    setError2({ ...error2, userError: "User Id cannot be blank!" });

                }
                else if (e.target.value.length < 6 || e.target.value.length > 12) {
                    setError2({ ...error2, userError: "User Id must be 6 to 12 characters long" });
                }
                else if (e.target.value.includes(' ')) {
                    setError2({ ...error2, userError: "User Id must not contain space" });
                }
                else {
                    setError2({ ...error2, userError: "" });
                    setLoginData({ ...loginData, user: e.target.value });
                }
                break;
            case "l_password":
                console.log(e.target.name);
                if (e.target.value === "") {
                    setError2({ ...error2, pwError: "Password cannot be blank!" });

                }
                else if (e.target.value.length < 6 || e.target.value.length > 12) {
                    setError2({ ...error2, pwError: "Password must be 6 to 12 characters long" });
                }
                else if (e.target.value.includes(' ')) {
                    setError2({ ...error2, pwError: "Password must not contain space" });
                }
                else {
                    setError2({ ...error2, pwError: "" });
                    setLoginData({ ...loginData, password: e.target.value });
                }
                break;
        }
    }
    const showPassword = () => {
        console.log("function working")
        let show = document.getElementById("password");
        if (show.type === "password") {
            show.type = "text";
        }
        else {
            show.type = "password";
        }
    }
    const showS_Password = () => {
        console.log("function working")
        let show = document.getElementById("S_password");
        if (show.type === "password") {
            show.type = "text";
        }
        else {
            show.type = "password";
        }
    }
    const githubLogin = () => {
        console.log(process.env.BACKEND_URL)
        window.open(`${process.env.BACKEND_URL}/auth/github`, "_self");
    }
    const twitterLogin = () => {
        window.open(`${process.env.BACKEND_URL}/auth/twitter`, "_self");
    }
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} >
            <div className="main-form">

                <div className="form-box">
                    <div className="button-box">
                        <div id="btn" />
                        <button type="button" className="toggle-btn" onClick={login}>Login</button>
                        <button type="button" className="toggle-btn" onClick={register}>Register</button>

                    </div>

                    <div className="social-icons">
                        <button className="Github" onClick={githubLogin}><Github /></button>
                        <button className="Twitter" onClick={twitterLogin}><Twitter /></button>
                    </div>

                    <form id="login" className="input-group">
                        <input name="l_userID" type="text" className="input-field" placeholder="User Id" required onChange={(e) => validate(e)} onBlur={(e) => validate(e)} />
                        {error2.userError ? <small className="errors">{error2.userError}</small> : null}
                        <input name="l_password" type="password" id="password" className="input-field" placeholder="Enter-Password" required onChange={(e) => validate(e)} onBlur={(e) => validate(e)} />
                        <small className="eye" onClick={showPassword}> &#128065;</small>
                        {error2.pwError ? <small className="errors">{error2.pwError}</small> : null}
                        <button type="submit" className="submit-btn one" onClick={loginSubmit}>Login with Password</button>
                        <p className="submit-btn"><Link href="/otp" >Login with OTP</Link></p>
                        <br />
                        <center><Link href="/forgotPW">Forgot password?</Link></center>
                    </form>
                    <form id="register" className="input-group">
                        <input name="s_userID" type="text" className="input-field" placeholder="User Id" required onChange={(e) => validate(e)} onBlur={(e) => validate(e)} />
                        {error1.userError ? <small className="errors">{error1.userError}</small> : null}
                        <input name="s_emailID" type="email" className="input-field" placeholder="Email Id" required onChange={(e) => validate(e)} onBlur={(e) => validate(e)} />
                        {error1.emailError ? <small className="errors">{error1.emailError}</small> : null}
                        <input name="s_password" type="password" id="S_password" className="input-field" placeholder="Enter password" required onChange={(e) => validate(e)} onBlur={(e) => validate(e)} />
                        <small className="eye" onClick={showS_Password}> &#128065;</small>
                        {error1.pwError ? <small className="errors">{error1.pwError}</small> : null}
                        <button type="submit" className="submit-btn" onClick={signUpSubmit}>Register</button>
                    </form>
                </div>
            </div>
        </motion.div>
    );
}

export default SignUpForm;