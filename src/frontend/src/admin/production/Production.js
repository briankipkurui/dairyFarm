import {
    Table,
    Spin,
    Empty,
    Button,
    Badge,
    Tag,
    Radio,
    Popconfirm,
} from 'antd';
import {
    LoadingOutlined,
    PlusOutlined
} from '@ant-design/icons';
import {useEffect, useState} from "react";
import {errorNotification} from "../../utils/Notification";
import {getAllCows, getAllProduction} from "../adminUrlCall/AdminUrlCalls";
import './Cows.css'
import CowDrawerForm from "./CowDrawerForm";
const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;
const Production = () => {



    const [production, setProduction] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);

    const columns = fetchCows => [
        {
            title: 'productionId',
            dataIndex: 'productionId',
            key: 'productionId',
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
        if (cows.length <= 0) {
            return <>
                <Button
                    onClick={() => setShowDrawer(!showDrawer)}
                    type="primary" shape="round" icon={<PlusOutlined/>} size="small">
                    Add prof
                </Button>
                <CowDrawerForm
                    showDrawer={showDrawer}
                    setShowDrawer={setShowDrawer}
                    fetchStudents={fetchStudents}
                />
                <Empty/>
            </>
        }
        return <>

            <Table
                dataSource={cows}
                columns={columns(fetchStudents)}
                bordered
                title={() =>
                    <>
                        <Tag>Number of cows</Tag>
                        <Badge count={cows.length} className="site-badge-count-4"/>
                        <br/><br/>

                        <CowDrawerForm
                            showDrawer={showDrawer}
                            setShowDrawer={setShowDrawer}
                            fetchStudents={fetchStudents}
                        />
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