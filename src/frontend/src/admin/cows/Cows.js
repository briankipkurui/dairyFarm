import {
    Table,
    Spin,
    Empty,
    Button,
    Badge,
    Tag,
    Radio,
    Popconfirm, Form, Modal, Row, Col, Input, Space,
} from 'antd';
import {
    LoadingOutlined,
    PlusOutlined
} from '@ant-design/icons';
import React, {useEffect, useState} from "react";
import {errorNotification, successNotification} from "../../utils/Notification";
import {addToProduction, getAllCows} from "../adminUrlCall/AdminUrlCalls";
import './Cows.css'
import CowDrawerForm from "./CowDrawerForm";
import {Link} from "react-router-dom";
import {MdEdit, MdMoreHoriz} from 'react-icons/md';
const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;
const Cows = () => {
    const [cows, setCows] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);
    const [selectedCow, setSelectedCow] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [form] = Form.useForm();

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
            title: 'Sex',
            dataIndex: 'sex',
            key: 'sex',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, cows) =>
                <Space>
                    <Radio.Button
                        onClick={() => {
                            setSelectedCow(cows);
                            setIsModalVisible(true);
                        }}
                        style={{border: 'none'}}
                        value="small">
                        add Production
                    </Radio.Button>
                </Space>
        },
    ];


    const fetchStudents = () =>
        getAllCows()
            .then(res => res.json())
            .then(data => {
                setCows(data);
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
    }, [selectedCow,form]);


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
        //     .finally(() => {
        //     setSubmitting(false);
        // })

    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedCow(null)
    };
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
  return(
      <>
          <div className="cows">
              {renderStudents()}
          </div>

      </>
  )
}
export default Cows