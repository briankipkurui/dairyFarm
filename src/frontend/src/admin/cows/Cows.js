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
import {addBirths, addToProduction, getAllCows, SearchCattle} from "../adminUrlCall/AdminUrlCalls";
import './Cows.css'
import CowDrawerForm from "./CowDrawerForm";
import {CgArrowsMergeAltH} from "react-icons/cg";
import {FaCow} from "react-icons/fa6";
import {useDebounce} from "../utils/DebounceHook";
import {Link} from "react-router-dom";
import {LuNetwork} from "react-icons/lu";
import moment from "moment/moment";
import {MdMoreHoriz} from "react-icons/md";
import MoreCowDetailsDrawerForm from "./MoreCowDetailsDrawerForm";
import CowSearchBar from "./CowSearchBar";

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;
const {Option} = Select;
const Cows = () => {
    const [cows, setCows] = useState([]);
    const [cowsToDisplay, setCowsToDisplay] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);
    const [showMDDrawer, setShowMDDrawer] = useState(false);
    const [selectedCow, setSelectedCow] = useState(null);
    const [selectedCowForRelationShip, setSelectedCowForRelationShip] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalForRelationShipVisible, setIsModalForRelationShipVisible] = useState(false);
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

        // {
        //     title: 'age',
        //     dataIndex: 'dateOfBirth',
        //     key: 'dateOfBirth',
        //     render: (text) => {
        //         const dateOfBirth = moment(text);
        //         const currentDate = moment();
        //         const years = currentDate.diff(dateOfBirth, 'years');
        //         dateOfBirth.add(years, 'years');
        //
        //         const months = currentDate.diff(dateOfBirth, 'months');
        //         dateOfBirth.add(months, 'months');
        //
        //         const days = currentDate.diff(dateOfBirth, 'days')
        //         return `${years} years, ${months} months, and ${days} days`;
        //     },
        // },
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
                    <Tooltip title="add relationship">
                        <Radio.Button
                            onClick={() => {
                                setSelectedCow(cows);
                                setIsModalForRelationShipVisible(true);
                            }}
                            style={{border: 'none'}}
                            value="small">
                            <CgArrowsMergeAltH style={{fontSize: '20px'}}/>
                        </Radio.Button>
                    </Tooltip>
                    <Tooltip title={`view family tree of  ${cows.name}`}>
                        <Link to={`/admin/${cows.cattleId}`}>
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
                        }
                        }

                        style={{border: 'none'}}
                        value="small">
                        <MdMoreHoriz/>
                    </Radio.Button>
                </Space>
        },
    ];


    const fetchStudents = () =>
        getAllCows()
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
        addToProduction(product)
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
    const handleCancelForRelationShip = () => {
        setSelectedCowForRelationShip(null)
        setIsModalForRelationShipVisible(false);
    };
    const handleSexChange = (value) => {
        setSearchTerm(value)
    }

    const searchCattleBySearchTerm = (query) => {
        SearchCattle(searchTerm)
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

    const makeRelationShip = (births) => {
        addBirths(births)
            .then(() => {
                successNotification(
                    "relationship successfully added",
                    ` for calve with id  ${births.name}`
                )
                setIsModalForRelationShipVisible(false)
                setSelectedCow(null)
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
    }


    const renderStudents = () => {


        if (fetching) {
            return <Spin indicator={antIcon}/>
        }
        if (cows.length <= 0) {
            return <>
                <Button
                    onClick={() => setShowDrawer(!showDrawer)}
                    type="primary" shape="round" icon={<PlusOutlined/>} size="small">
                    Add New Cow
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
            <MoreCowDetailsDrawerForm
                showDrawer={showMDDrawer}
                setShowDrawer={setShowMDDrawer}
                cows={moreCows}
            />
            <CowDrawerForm
                showDrawer={showDrawer}
                setShowDrawer={setShowDrawer}
                fetchStudents={fetchStudents}
            />
            <CowSearchBar fun={setCows}/>
            <Table
                dataSource={cows}
                columns={columns(fetchStudents)}
                bordered
                title={() =>
                    <>
                        <Tag>Number of cows</Tag>
                        <Badge count={cows.length} className="site-badge-count-4"/>
                        <Button
                            onClick={() => setShowDrawer(!showDrawer)}
                            type="primary" shape="round" icon={<PlusOutlined/>} size="small">
                            Add New Cow
                        </Button>

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
            <Modal
                title="Add relationship"
                visible={isModalForRelationShipVisible}
                onCancel={handleCancelForRelationShip}
                footer={null}
            >
                {selectedCow && (
                    <Form
                        form={form}
                        onFinish={makeRelationShip}
                        initialValues={selectedCow}
                    >
                        <Row gutter={16}>
                            {/*<Col span={12}>*/}
                            <Form.Item
                                name="cattleId"
                                label="perent Cow id"
                                // hidden={true}
                                rules={[{required: true, message: 'Please enter availableQuantity'}]}
                            >
                                <Input readOnly={true}/>
                            </Form.Item>
                            {/*</Col>*/}
                        </Row>
                        <Form.Item
                            name="name"
                            label="calve name"
                            rules={[{required: true, message: 'Please select a sex'}]}
                        >
                            <Select
                                placeholder="Please select a sex"
                                showSearch
                                onSearch={handleSexChange}
                                filterOption={hanfafa}
                            >
                                {cattleOptions.map(option => (
                                    <Option key={option.value} value={option.value}>{option.label}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                submit
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
export default Cows