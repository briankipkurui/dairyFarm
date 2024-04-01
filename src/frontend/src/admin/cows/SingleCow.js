import {useParams} from "react-router-dom";
import Tree from "react-d3-tree";
import React, {useEffect, useState} from "react";
import {getAllCows, getFamilyTreeById} from "../adminUrlCall/AdminUrlCalls";
import {errorNotification} from "../../utils/Notification";
import './Cows.css'

const SingleCow = () => {
    const [familyTree, setFamilyTree] = useState({})
    const {cattleId} = useParams()

    const fetchStudents = (cattleId) =>
        getFamilyTreeById(cattleId)
            .then(res => res.json())
            .then(data => {
                setFamilyTree(data);
            }).catch(err => {
            console.log(err.response)
            err.response.json().then(res => {
                console.log(res);
                errorNotification(
                    "There was an issue",
                    `${res.message} [${res.status}] [${res.error}]`
                )
            });
        })

    useEffect(() => {
        fetchStudents(cattleId);
    }, []);
    const separation = {siblings: 2, nonSiblings: 2.1};
    return (
        <>
            <div className="cows">
                you are viewing family tree of cattle with id {cattleId}
                <div style={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    zIndex: -1
                }}>
                    <Tree className="tree" data={familyTree} orientation="vertical" separation={separation}/>
                </div>

            </div>
        </>
    )
}
export default SingleCow