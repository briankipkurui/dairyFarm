import React, {useState} from "react";
import './Cows.css'
import {Button, Drawer, Switch} from "antd";
import {Cattle} from "@/pages/types/Types";
import AllCattleTree from "@/pages/cattle/AllCattleTree";
import DistinctCattleTree from "@/pages/cattle/DistinctCattleTree";

interface FamilyTreeMainProps {
    familyTreeMainDrawer: boolean;
    showFamilyTreeMainDrawer: React.Dispatch<React.SetStateAction<boolean>>
    cattle: Cattle,
    setCattleData: React.Dispatch<React.SetStateAction<Cattle | undefined>>
}

const FamilyTreeMain:React.FC<FamilyTreeMainProps> = ({familyTreeMainDrawer,showFamilyTreeMainDrawer,cattle,setCattleData}) => {

    const [checked, setChecked] = useState(false)

    const onChange = (checked: any) => {
        console.log(`switch to ${checked}`);
        setChecked(checked)
    }


    return (
        <Drawer
            title={"view family tree"}
            width={720}
            onClose={() => {
                setCattleData(undefined);
                showFamilyTreeMainDrawer(false);
            }}
            open={familyTreeMainDrawer}
            bodyStyle={{paddingBottom: 80}}
            style={{
                backgroundColor: 'white',
                transition: 'transform 0.3s ease, opacity 0.3s ease'
            }}
            maskStyle={{
                transition: 'opacity 0.3s ease'
            }}
            footer={
                <div style={{textAlign: 'right'}}>
                    <Button onClick={() => {
                        setCattleData(undefined);
                        showFamilyTreeMainDrawer(false);
                    }} style={{marginRight: 8}}>
                        Cancel
                    </Button>
                </div>
            }
        >
            <div className="cows">
                <br/>
                view all family tree of Cow with id {cattle.id} : <Switch onChange={onChange}/>
                <div style={{
                    width: '100%',
                    height: '100vh',
                    background: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    zIndex: -1
                }}
                     id="down"
                >
                    {checked ? <AllCattleTree cattleId={cattle.id}/> : <DistinctCattleTree cattleId={cattle.id}/>}
                </div>

            </div>
        </Drawer>
    )
}
export default FamilyTreeMain