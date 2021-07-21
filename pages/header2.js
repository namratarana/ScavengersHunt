import {useRouter} from 'next/router';
import axios  from 'axios';
function Header2()
{  
    const router = useRouter();
    const removeToken = ()=>
    {
        
        localStorage.removeItem('token');
        axios.get(`${process.env.BACKEND_URL}/logout`)
        .then((res)=>
        {
            router.push("/");
        })
        .catch((err)=>
        {
            console.log(err);
        })
    }
    return(
    
        <div className= "header bttn">
             <button onClick ={removeToken}>Logout</button>
        </div>
    )
}

export default Header2;