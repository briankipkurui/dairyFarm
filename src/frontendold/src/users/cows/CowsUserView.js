import {
    Table,
    Spin,
    Empty,
    Button,
    Badge,
    Tag,
    Radio,
    Popconfirm, Form, Modal, Row, Col, Input, Space, Tooltip, Select,
} from 'antd';
import {
    LoadingOutlined,
    PlusOutlined
} from '@ant-design/icons';
import React, {useEffect, useState} from "react";
import {errorNotification, successNotification} from "../../utils/Notification";
import './Cows.css'
import {CgArrowsMergeAltH} from "react-icons/cg";
import {FaCow} from "react-icons/fa6";
import {Link} from "react-router-dom";
import {LuNetwork} from "react-icons/lu";
import moment from "moment/moment";
import {MdMoreHoriz} from "react-icons/md";
import MoreCowDetailsDrawerForm from "./MoreCowDetailsDrawerForm";
import CowSearchBar from "./CowSearchBar";
import {useDebounce} from "../../admin/utils/DebounceHook";
import {addToProductionUser, getAllCowsUsers, SearchCattleUsers} from "../userUrlCalls/UserUrlCalls";

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;
const {Option} = Select;
const CowsUserView = () => {
    const [cows, setCows] = useState([]);
    const [cowsToDisplay, setCowsToDisplay] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [showMDDrawer, setShowMDDrawer] = useState(false);
    const [selectedCow, setSelectedCow] = useState(null);
    const [selectedCowForRelationShip, setSelectedCowForRelationShip] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('')
    const [moreCows, setMoreCows] = useState('')

    const [cattleOptions, setCattleOptions] = useState([])


    const [selectedSex, setSelectedSex] = useState([]);


    const [form] = Form.useForm();
    const [form2] = Form.useForm();

    const columns = fetchCows => [
        {
            title: 'CowId',
            dataIndex: 'cattleId',
            key: 'cattleId',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'breed',
            dataIndex: ['breeds', 'name'],
            key: 'breed',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, cows) =>
                <Space>
                    <Tooltip title="add production">
                        <Radio.Button
                            onClick={() => {
                                setSelectedCow(cows);
                                setIsModalVisible(true);
                            }}
                            style={{border: 'none'}}
                            value="small">
                            <FaCow style={{fontSize: '20px'}}/>
                        </Radio.Button>
                    </Tooltip>
                    <Tooltip title={`view family tree of  ${cows.name}`}>
                        <Link to={`/user/${cows.cattleId}`}>
                            <Radio.Button
                                style={{border: 'none'}}
                                value="small">
                                <LuNetwork style={{fontSize: '20px', fontWeight: 'Bold'}}/>
                            </Radio.Button>
                        </Link>
                    </Tooltip>
                    <Radio.Button
                        onClick={() => {
                            setShowMDDrawer(!showMDDrawer)
                            setMoreCows(cows)
                        }}
                        style={{border: 'none'}}
                        value="small">
                        <MdMoreHoriz/>
                    </Radio.Button>
                </Space>
        },
    ];


    const fetchStudents = () =>
        getAllCowsUsers()
            .then(res => res.json())
            .then(data => {
                setCows(data);
                setCowsToDisplay(data)
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
        fetchStudents();
    }, []);

    useEffect(() => {
        if (selectedCow) {
            form.setFieldsValue(selectedCow);
        }
    }, [selectedCow, form]);


    useEffect(() => {
        if (selectedCowForRelationShip) {
            form2.setFieldsValue(selectedCowForRelationShip);
        } else {
            form2.setFieldsValue('');
        }
    }, [selectedCowForRelationShip, form2]);


    const handleAddProduction = async (product) => {
        console.log(JSON.stringify(product, null, 2))
        addToProductionUser(product)
            .then(() => {
                successNotification(
                    "production successfully added",
                    `${product.unit}`
                )
                setIsModalVisible(false);
            }).catch(err => {
            console.log(err);
            err.response.json().then(res => {
                console.log(res);
                errorNotification(
                    "There was an issue",
                    `${res.message} [${res.status}] [${res.error}]`,
                    "bottomLeft"
                )
            });
        })
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedCow(null)
    };



    const searchCattleBySearchTerm = (query) => {
        SearchCattleUsers(searchTerm)
            .then(res => res.json())
            .then(data => {
                setCowsToDisplay(data)
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
    }

    useDebounce(searchTerm, 50, searchCattleBySearchTerm)

    const hanfafa = (inputValue, option) => {
        const label = option.props.children;
        if (label && typeof label === 'string') {
            return label.toLowerCase().includes(inputValue.toLowerCase());
        }
        return false;
    };

    useEffect(() => {
        const updatedCattleOptions = cowsToDisplay.map(cattle => ({
            label: cattle.name,
            value: cattle.cattleId
        }));
        setCattleOptions(updatedCattleOptions);
    }, [cowsToDisplay]);




    const renderStudents = () => {


        if (fetching) {
            return <Spin indicator={antIcon}/>
        }
        if (cows.length <= 0) {
            return <>

                <Empty/>
            </>
        }
        return <>
            <MoreCowDetailsDrawerForm
                showDrawer={showMDDrawer}
                setShowDrawer={setShowMDDrawer}
                cows={moreCows}
            />
            <CowSearchBar fun={setCows}/>
            <Table
                dataSource={cows}
                columns={columns(fetchStudents)}
                bordered
                title={() =>
                    <>
                    </>
                }
                pagination={{pageSize: 50}}
                scroll={{y: 500}}
                rowKey={cows => cows.id}
            />
            <Modal
                title="Add Production"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >


                {selectedCow && (
                    <Form
                        form={form}
                        onFinish={handleAddProduction}
                        initialValues={selectedCow}
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="cattleId"
                                    label="cowID"
                                    // hidden={true}
                                    rules={[{required: true, message: 'Please enter availableQuantity'}]}
                                >
                                    <Input readOnly={true}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="unit"
                                    label="unit"
                                    rules={[{required: true, message: 'Please  enter unit'}]}
                                >
                                    <Input/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Add production
                            </Button>
                        </Form.Item>
                    </Form>
                )}
            </Modal>

        </>
    }
    return (
        <>
            <div className="cows">
                {renderStudents()}
            </div>

        </>
    )
}
export default CowsUserView