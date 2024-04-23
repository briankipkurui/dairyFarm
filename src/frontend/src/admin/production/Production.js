import {
    Table,
    Spin,
    Empty,
    Button,
    Badge,
    Tag,
    Radio,
    Popconfirm, Form, Select,
} from 'antd';
import {
    LoadingOutlined,
    PlusOutlined
} from '@ant-design/icons';
import React, {useEffect, useState} from "react";
import {errorNotification} from "../../utils/Notification";
import {getAllCows, getAllProduction} from "../adminUrlCall/AdminUrlCalls";
import './Production.css'
import moment from 'moment';
import FilterProduction from "./FilterProduction";
const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;


const Production = () => {



    const [production, setProduction] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);

    const columns = fetchCows => [
        {
            title: 'Name',
            dataIndex: 'cattle',
            key: 'name',
            render: (cattle) => cattle.name
        },
        {
            title: 'unit',
            dataIndex: 'unit',
            key: 'unit',
        },
        {
            title: 'time',
            dataIndex: 'time',
            key: 'time',
            render: (text) => {
                const formattedTime = moment(text).format('ddd, MMM DD, YYYY, hh:mm:ss A');
                return formattedTime;
            },
        }
    ];


    const fetchProduction = () =>
        getAllProduction()
            .then(res => res.json())
            .then(data => {
                setProduction(data);
            }).catch(err => {
            console.log(err.response)
            err.response.json().then(res => {
                console.log(res);
                errorNotification(
                    "There was an issue",
                    `${res.message} [${res.status}] [${res.error}]`
                )
            });
        }).finally(() => setFetching(false))

    useEffect(() => {
        fetchProduction();
    }, []);


    const renderProduction = () => {
        if (fetching) {
            return <Spin indicator={antIcon}/>
        }
        if (production.length <= 0) {
            return <>
                <Empty/>
            </>
        }
        return <>
            <FilterProduction/>
            <Table
                dataSource={production}
                columns={columns()}
                bordered
                title={() =>
                    <>

                        <br/><br/>
                    </>
                }
                pagination={{pageSize: 50}}
                scroll={{y: 500}}
                rowKey={cows => cows.id}
            />
        </>
    }
    return(
        <>
            <div className="cows">
                {renderProduction()}
            </div>

        </>
    )
}
export default Production