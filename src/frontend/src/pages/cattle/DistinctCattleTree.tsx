import React, {useEffect, useState} from "react";
import {getFamilyTreeById} from "@/apiCalls/apiCalls";
import {errorNotification} from "@/utils/Notification";
import Tree from "react-d3-tree";

interface DistinctCattleTreeMainProps {
    cattleId: number;
}

const DistinctCattleTree:React.FC<DistinctCattleTreeMainProps> = ({cattleId}) => {

    const [familyTree, setFamilyTree] = useState<any>({})

    const fetchStudents = (cattleId:any) =>
        getFamilyTreeById(cattleId)
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
    const translate = { x: 500, y: 50 };
    return (
        <>
            <Tree translate={translate} data={familyTree} orientation="vertical" separation={separation} />
        </>
    )
}
export default DistinctCattleTree