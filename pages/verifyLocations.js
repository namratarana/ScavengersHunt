import { useEffect, useState } from "react";
import { markers } from "./api/markers";
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons'
import Header2 from "./header2";
import { useRouter } from "next/router";
import { motion } from 'framer-motion';
import axios from "axios";


const VerifyLocations = () => {

    const router = useRouter();
    const [coord, setCoord] = useState();
    const [location, setLocation] = useState();
    const [check, setCheck] = useState(markers);

    useEffect(async () => {
        await axios.get(`${process.env.BACKEND_URL}/getToken`)
            .then((res) => {
                localStorage.setItem('token', res.data.token);
            })
            .catch((err) => {
                console.log(err);
            })
        const token = localStorage.getItem('token');
        if (token) {
            getLocation();
        }
        else {
            router.push('/');
        }
    }, []);
    function getLocation() {
        //x = document.getElementById("demo");

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(verifyLoc);
        }
        else {
            //x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function verifyLoc(position) {
        const Latitude = position.coords.latitude;
        const Longitude = position.coords.longitude;
        setLocation({ lat: Latitude, long: Longitude });
        console.log(Latitude, Longitude);

    }
    function verifyLocations(data) {


        check.map((i) => {
            if (i.name === data.name) {
                console.log(location.lat, data.location[0])
                if (location.lat === data.location[0] && location.long === data.location[1]) {
                    i.valid = "valid";
                }
                else {

                    i.valid = "invalid";

                }
                setCoord(i.name)
            }
        })
    }
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 2 }} >
            <Header2 />
            <div className="homeBg2">

                <p className="space">
                    Tap the location to complete the challenge
                </p>

                <div className="buttonSection">

                    {check.map((data, index) => {
                        // {setCount(count+1)}
                        return (


                            <div key={index} className="parent">
                                <button className="verifyButtons success " onClick={(e) => verifyLocations(data)}>
                                    Location{index + 1}<br />
                                    {/* <small className= "locationSize">({data.location[0]} , {data.location[1]})</small> */}
                                </button>

                                {data.valid ? data.valid === "valid" ? <CheckCircleFill id="valid" className="position" /> : <XCircleFill id="invalid" className="position" /> : null}
                            </div>
                        )

                    })}
                </div>


            </div>
        </motion.div>
    );
}

export default VerifyLocations;