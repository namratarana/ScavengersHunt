import Link from 'next/link';
import { useEffect, useState } from 'react';

function Header1()
{  
    const [tokenExists,setToken] = useState();
    useEffect(()=>
    {
        const token = localStorage.getItem('token');
        setToken(token);
    },[])
    return(
        <>
        {!tokenExists?<div className= "header1 bttn">
            <Link href="/signUp" >Sign Up</Link>   
        
            <Link href ="/signUp" > Login with Password </Link>
            
        </div>:null}
        </>
    )
}

export default Header1;