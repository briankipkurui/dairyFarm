import React, {useEffect, useState} from "react";
import {errorNotification} from "../../utils/Notification";
import Tree from "react-d3-tree";
import {getFamilyTreeById} from "../../admin/adminUrlCall/AdminUrlCalls";

const DistinctCowTree = ({cattleId}) => {
    const [familyTree, setFamilyTree] = useState({})
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
    const translate = { x: 500, y: 50 };
    return (
        <>
            <Tree translate={translate} data={familyTree} orientation="vertical" separation={separation} />
        </>
    )
}
export default DistinctCowTree