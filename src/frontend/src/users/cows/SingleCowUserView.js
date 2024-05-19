import {useParams} from "react-router-dom";
import React, {useState} from "react";

import './Cows.css'
import {Switch} from "antd";
import DistinctCowTree from "./DistinctCowTree";
import AllCowTree from "./AllCowTree";
import html2pdf from "html2pdf.js/src";

const SingleCowUserView = () => {
    const {cattleId} = useParams()
    const [checked, setChecked] = useState(false)


    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
        setChecked(checked)
    }

    const handleDownload = () => {
        const element = document.getElementById('down');
        const opt = {
            margin: 0.5,
            filename: 'cowTree.pdf',
            image: {type: 'jpeg', quality: 0.98},
            html2canvas: {scale: 2},
            jsPDF: {unit: 'in', format: 'letter', orientation: 'portrait'}
        };

        html2pdf().from(element).set(opt).save();
    };

    return (
        <>
            <div className="cows">
                    <button onClick={handleDownload}>Download PDF</button>
                    <br/>
                    view all family tree of Cow with id {cattleId} : <Switch onChange={onChange}/>


                <div style={{
                    width: '100%',
                    height: '100vh',
                    background: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    zIndex: -1
                }}
                     id="down"
                >
                    {checked ? <AllCowTree cattleId={cattleId}/> : <DistinctCowTree cattleId={cattleId}/>}
                </div>

            </div>
        </>
    )
}
export default SingleCowUserView