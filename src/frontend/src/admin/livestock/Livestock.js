import {
    Button, Empty, Form, Input, Modal, Popconfirm, Radio, Row, Space, Spin, Table, Tooltip,
} from 'antd'
import React, {useEffect, useState} from "react";
import {errorNotification, successNotification} from "../../utils/Notification";
import {FaTrash} from 'react-icons/fa';
import {MdEdit, MdMoreHoriz} from 'react-icons/md';
import {BiUserCheck, BiUserX} from "react-icons/bi";
import {Link} from "react-router-dom";
import LivestockDrawerForm from "./LivestockDrawerForm";
import {getAllCows, getBreeds, getLivestock, updateBreeds} from "../adminUrlCall/AdminUrlCalls";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import CowDrawerForm from "../cows/CowDrawerForm";

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

const Livestock = () => {
    const [showDrawer, setShowDrawer] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [firstNameEdit, setFirstNameEdit] = useState(false)
    const [breeds,setBreeds] = useState([])
    const [fetching,setFetching] = useState(true)


    const toggleFirstNameBtn = () => {
        setFirstNameEdit(prevState => !prevState)
    }

    const columns = () => [

            {
                title: 'livestockId',
                dataIndex: 'livestockId',
                key: 'livestockId',
            },
            {
                title: 'name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Actions',
                key: 'actions',
                render: (text, users) =>
                    <Space>
                        <Popconfirm
                            placement='topRight'
                            title={`Are you sure to delete ${users.firstName}`}
                            okText='Yes'
                            cancelText='No'>
                            <Tooltip title={`delete user  ${users.firstName}`}>
                                <Radio.Button
                                    style={{border: 'none'}}
                                    value="small"><FaTrash/></Radio.Button>
                            </Tooltip>
                        </Popconfirm>
                        <Radio.Button
                            onClick={() => {
                                setSelectedProduct(users);
                                setIsModalVisible(true);
                            }}
                            style={{border: 'none'}}
                            value="small">
                            <MdEdit/>
                        </Radio.Button>
                    </Space>
            },
        ]
    ;

    useEffect(() => {
        if (selectedProduct) {
            form.setFieldsValue(selectedProduct);
        }
    }, [selectedProduct, form]);

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedProduct(null)
        setFirstNameEdit(false)
    };

    const updateUser = async (breed) => {
        updateBreeds(breed)
            .then(() => {
                successNotification("user successfully updated", `${breed.firstName}`)
                setIsModalVisible(false)
                fetchLivestock()
            }).catch(err => {
            console.log(err);
            err.response.json().then(res => {
                console.log(res);
                errorNotification("There was an issue", `${res.message} [${res.status}] [${res.error}]`, "bottomLeft")
            });
        })

    }
    const fetchLivestock = () =>
        getLivestock()
            .then(res => res.json())
            .then(data => {
                setBreeds(data);
            }).catch(err => {
            console.log(err.response)
            err.response.json().then(res => {
                errorNotification(
                    "There was an issue",
                    `${res.message} [${res.status}] [${res.error}]`
                )
            });
        }).finally(()=>setFetching(false))

    useEffect(() => {
        fetchLivestock();
    }, []);

    const renderBreeds =()=>{
        if (fetching) {
            return <Spin indicator={antIcon}/>
        }
        if (breeds.length <= 0) {
            return <>
                <Button
                    onClick={() => setShowDrawer(!showDrawer)}
                    type="primary" shape="round" icon={<PlusOutlined/>} size="small">
                    Add livestock
                </Button>
                <LivestockDrawerForm
                    showDrawer={showDrawer}
                    setShowDrawer={setShowDrawer}
                    fetchLivestock={fetchLivestock}
                />
                <Empty/>
            </>
        }
        return <>
            <Table
                dataSource={breeds}
                columns={columns()}
                bordered
                title={() => <>
                    <Button
                        onClick={() => setShowDrawer(!showDrawer)}
                        type="primary" shape="round" icon={<PlusOutlined/>} size="small">
                        Add livestock
                    </Button>
                    <LivestockDrawerForm
                        showDrawer={showDrawer}
                        setShowDrawer={setShowDrawer}
                        fetchLivestock={fetchLivestock}
                    />

                </>}
                pagination={{pageSize: 10}}
                scroll={{x: 300}}
                rowKey={(student) => student.id}
            />

            <Modal
                title="Edit user"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                {selectedProduct && (<Form
                    form={form}
                    onFinish={updateUser}
                    initialValues={selectedProduct}
                >
                    <Row>
                        <Form.Item
                            name="breedId"
                            label="breedId"
                            // hidden={true}
                            rules={[{required: true, message: 'Please enter sellingPrice'}]}
                        >
                            <Input readOnly={true}/>
                        </Form.Item>
                    </Row>

                    <Form.Item
                        name="name"
                        label="name"
                        rules={[{required: true, message: 'Please  enter name'}]}
                    >
                        <Input
                            readOnly={!firstNameEdit}
                            suffix={<Button type="primary" onClick={toggleFirstNameBtn}>
                                {firstNameEdit ? 'disable' : 'enable'}
                            </Button>}
                        />
                    </Form.Item>


                    <Form.Item>
                        {(!firstNameEdit ) || (
                            <Button type="primary" htmlType="submit">
                                Save Changes
                            </Button>)}
                    </Form.Item>
                </Form>)}
            </Modal>

        </>
    }
    
    return (
        <>
        <div className="cows">
            {renderBreeds()}

        </div>

    </>
    )
}
export default Livestock
