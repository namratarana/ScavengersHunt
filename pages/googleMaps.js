import { markers } from './api/markers';
import { useEffect, useState } from 'react';
import GoogleMaps from './maps';


export default function Home() {

  const [data,setData] = useState();
  const [coord,setCoord] = useState();
  const [location,setLocation] = useState();
  var x;
  //let ele;
  useEffect(()=>{
    setData(markers[Math.floor(Math.random() * markers.length)]);
    getLocation();
    
  },[])
  
  function getLocation() 
  { 
    //x = document.getElementById("demo");
    
    if (navigator.geolocation) 
      {
          navigator.geolocation.getCurrentPosition(verifyLoc);
      } 
      else 
      {
        //x.innerHTML = "Geolocation is not supported by this browser.";
      }
  }

  function verifyLoc(position) 
  {
      const Latitude =position.coords.latitude;
      const Longitude =position.coords.longitude;
      setLocation({lat:Latitude,long:Longitude});
      console.log(Latitude, Longitude);
     
  }
  
  function verifyLocations()
  {
    
    if(location.lat === data.location[0] && location.long === data.location[1] )
    {
      setCoord("Valid")
      
    }
    else
    {
      setCoord("Invalid")
      
    }
    
  }

  return (
    <div>
          <button onClick={verifyLocations} style={{marginBottom:"20px"}}>Verify location</button>
         
          {location?
          <>
          <GoogleMaps locations = {location }/>
          {coord?alert(coord):null}
          
          </>:null}
          
    </div>
  )
}
