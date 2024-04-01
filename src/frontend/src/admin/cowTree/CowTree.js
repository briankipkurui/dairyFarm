import React, {useEffect, useState} from "react";
import {getAllCows, getAllCowTrees} from "../adminUrlCall/AdminUrlCalls";
import {errorNotification} from "../../utils/Notification";
import Tree from 'react-d3-tree';
import axios from 'axios';

const CowTree = () => {
    const [treeInfo,setTreeInfo] = useState({})

    useEffect(() => {
        axios.get('/api/v1/cattle/cows')
            .then(response => {
                setTreeInfo(response.data);
            })
            .catch(error => {
                console.error('Error fetching cow tree:', error);
            });
    }, []);

    const separation = { siblings: 2, nonSiblings: 2.1 };

    return(
      <>
          {/*separation={separation}*/}
          <div className="cows">
              cow births tree representation
              <div style={{width: '100%', height: '100vh'}}>
                  <Tree data={treeInfo} orientation="vertical" separation={separation}/>
              </div>
          </div>

      </>
    )
}
export default CowTree