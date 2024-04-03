import {useParams} from "react-router-dom";
import React, {useState} from "react";

import './Cows.css'
import {Switch} from "antd";
import DistinctCowTree from "./DistinctCowTree";
import AllCowTree from "./AllCowTree";

const SingleCow = () => {
    const {cattleId} = useParams()
    const [checked, setChecked] = useState(false)


    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
        setChecked(checked)
    }

    return (
        <>
            <div className="cows">
                <div
                   style={{
                       position:'sticky'
                   }}
                >
                    view all family tree of Cow with id {cattleId} : <Switch onChange={onChange}/>
                </div>

                <div style={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                    background: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    zIndex: -1
                }}>
                    {checked ? <AllCowTree cattleId={cattleId}/> : <DistinctCowTree cattleId={cattleId}/>}
                </div>

            </div>
        </>
    )
}
export default SingleCow