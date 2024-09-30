import React, {useEffect, useState} from "react";

import  Tree from "react-d3-tree"
import {getAllFamilyTreeById} from "@/apiCalls/apiCalls";
import {errorNotification} from "@/utils/Notification";
interface   AllCattleTreeMainProps {
    cattleId: number;
}

const AllCattleTree:React.FC<AllCattleTreeMainProps> = ({cattleId}) => {
    const [familyTree, setFamilyTree] = useState<any>({})
    const fetchStudents = (cattleId:any) =>
        getAllFamilyTreeById(cattleId)
            .then(res => res.json())
            .then(data => {
                setFamilyTree(data);
            }).catch(err => {
            console.log(err.response)
            err.response.json().then((res:any) => {
                console.log(res);
                errorNotification(
                    "There was an issue",
                    `${res.message} [${res.status}] [${res.error}]`,
                    'topRight'
                )
            });
        })

    useEffect(() => {
        fetchStudents(cattleId);
    }, []);
    const separation = {siblings: 2, nonSiblings: 2.1};
    const translate = {x: 500, y: 50};
    return (
        <>
            <Tree translate={translate} data={familyTree} orientation="vertical"  separation={separation} />
        </>
    )
}
export default AllCattleTree