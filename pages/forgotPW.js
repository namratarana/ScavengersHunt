import { useState, useEffect} from "react";
import {useRouter} from 'next/router';
import axios from 'axios';
import {motion} from 'framer-motion'


function ForgotPW ()
{
    
    const router = useRouter();
    useEffect(()=>
    {
        const token = localStorage.getItem('token');
        if(token)
        {
            router.push('/');
        }
    },[])
    const [data, setData] = useState();
    const [hide, setHide] = useState(true);
    const [newPW, setNewPW] = useState(false);
    const [pwData, setPwData] = useState();
    const [err1, setErr1] = useState({newPwErr:'', confPwErr:''});

    const getOTP =(e)=>
    {
        e.preventDefault();
        const email = data.email;
        console.log(data.email);
        axios.put(`${process.env.BACKEND_URL}/user/getOTP`,data)
        .then((res)=>
        {
            console.log(res.data);
            setHide(false);
        })
        .catch((err)=>
        {
            console.log(err);
        })
        
    }

    const verifyOTP = (e) =>
    {
        e.preventDefault();
        axios.post(`${process.env.BACKEND_URL}/user/verifyOTP`, data)
        .then((res)=>
        {
            setNewPW(true);
            setPwData({email:data.email})
        })
        .catch((err)=>
        {
            alert("OTP does not matches");
        })
    }

    const resetPW =(e)=>
    {
        e.preventDefault();
        if(err1.newPwErr == '' && err1.confPwErr== '')
        {
            axios.put(`${process.env.BACKEND_URL}/user/resetPass`,pwData)
            .then((res)=>
            {
                router.push("/signUp");
            })
            .catch((err)=>
            {
                console.log(err);
            })
        }
        else
        {
            alert("passwords does not match");
        }
    }
    const validate =(e)=>
    {
        switch(e.target.name)
        {   
            case "newPass":
                if(e.target.value == "")
                {
                    setErr1({...err1,newPwErr:"Password cannot be blank"});
                }
                else if(e.target.value.includes(" "))
                {
                    setErr1({...err1,newPwErr:"Password must not contain space"});
                }
                else if(e.target.value.length <6 || e.target.value.length > 12)
                {
                    setErr1({...err1,newPwErr:"Password length must be between 6 to 12 "});
                }
                else
                {
                    setErr1({...err1, newPwErr:""});
                    setPwData({...pwData,newPass:e.target.value});
                }
                break;
            case "confPass":
                if(e.target.value == "")
                {
                    setErr1({...err1,confPwErr:"Password cannot be blank"});
                }
                else if(e.target.value.includes(" "))
                {
                    setErr1({...err1,confPwErr:"Password must not contain space"});
                }
                else if(e.target.value.length <6 || e.target.value.length > 12)
                {
                    setErr1({...err1,confPwErr:"Password length must be between 6 to 12 "});
                }
                else if(e.target.value != pwData.newPass)
                {
                    //console.log(e.target.value, pwData.confPass , pwData.newPass);
                    setErr1({...err1, confPwErr:"Passwords must match"});
                }
                else
                {
                    setErr1({...err1, confPwErr:""});
                    setPwData({...pwData,confPass:e.target.value});
                }
                break;
        }
    }
    const showNewPassword =()=>
    {
        console.log("function working")
        let show = document.getElementById("new_password");
        if(show.type === "password")
        {
            show.type = "text";
        }
        else
        {
            show.type ="password";
        }
    }
    const showConfPassword =()=>
    {
        console.log("function working")
        let show = document.getElementById("conf_password");
        if(show.type === "password")
        {
            show.type = "text";
        }
        else
        {
            show.type ="password";
        }
    }
    return(
        <motion.div initial={{opacity:0}} animate={{opacity:1 }} exit={{opacity:0}} transition={{duration:1}} >
        <div className="main-form ">
           <div className="form-box form-two">
            
               <form id="login" className="input-group1">
                { newPW===false?
                <>    
                    <input type="text" className="input-field" placeholder="Email ID" disabled={!hide} required onChange={(e)=>setData({...data,email:e.target.value})} />
                    {hide==false?<input type="text" className="input-field" placeholder="OTP" onChange={(e)=>setData({...data, otp:e.target.value})} />:null}
                    {hide?<button type="submit" className="submit-btn one" onClick={getOTP} >Get OTP</button>: null}
                    {hide==false?<button type="submit" className="submit-btn one" onClick={verifyOTP} >Verify</button>:null}
               
                </>:
                <>
                    <input type="hidden"/>
                    <input type="hidden"/>
                    <input name ="newPass" type="password" id="new_password" className="input-field" placeholder="New password"  required defaultValue ="" onChange={(e)=> validate(e)} onBlur={(e)=>validate(e)}/>
                    <small className="eye" onClick={showNewPassword}> &#128065;</small>
                    {err1.newPwErr?  <small className="errors">{err1.newPwErr}</small>: null}
                    <input name = "confPass" type="password" id="conf_password" className="input-field" placeholder="Confirm password"  required  defaultValue ="" onChange={(e)=>validate(e)} onBlur={(e)=>validate(e)}/>
                    <small className="eye" onClick={showConfPassword}> &#128065;</small>
                    {err1.confPwErr?  <small className="errors">{err1.confPwErr}</small>: null}
                    <button type = "submit" className="submit-btn" onClick={resetPW}> Reset password</button>
                </>
                }
                </form>
                            
            
        </div>
       </div>
       </motion.div>
    )
}
export default ForgotPW;