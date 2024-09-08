import {Drawer, Input, Col, Form, Row, Button, Spin} from 'antd';
import {LoadingOutlined} from "@ant-design/icons";
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {addLivestock, updateLivestock} from "@/apiCalls/apiCalls";
import {errorNotification, successNotification} from "@/utils/Notification";
import {Cattle, Livestock} from "@/pages/types/Types";


const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

interface LiveStockDrawerProps {
    showUpdateLiveStockDrawer: boolean;
    setShowUpdateLiveStockDrawer: React.Dispatch<React.SetStateAction<boolean>>
    LiveStock: Livestock
    fetchLiveStocks: any,
    setLiveStockData: React.Dispatch<React.SetStateAction<Livestock | undefined>>
}

const UpdateLivestockDrawerForm: React.FC<LiveStockDrawerProps> = ({
                                                                       showUpdateLiveStockDrawer,
                                                                       setShowUpdateLiveStockDrawer,
                                                                       LiveStock,
                                                                       fetchLiveStocks,
                                                                       setLiveStockData
                                                                   }) => {
    const onCLose = () => {
        setShowUpdateLiveStockDrawer(false);
        setLiveStockData(undefined)
    }
    const [submitting, setSubmitting] = useState(false);
    const [form] = Form.useForm()


    useEffect(() => {
        if (LiveStock) {
            form.setFieldsValue(LiveStock);
        }
    }, [LiveStock, form]);


    const onFinish = (user: any) => {
        setSubmitting(true)
        console.log(JSON.stringify(user, null, 2))
        updateLivestock(user)
            .then(() => {
                console.log("student added")
                onCLose();
                fetchLiveStocks()
                successNotification(
                    "Student successfully added",
                    `${user.firstName} was added to the system`,
                    'topRight'
                )

            }).catch(err => {
            console.log(err);
            err.response.json().then((res: any) => {
                console.log(res);
                errorNotification(
                    "There was an issue",
                    `${res.message} [${res.status}] [${res.error}]`,
                    "bottomLeft"
                )
            })
        }).finally(() => {
            setSubmitting(false);
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    return <Drawer
        title="Update livestock"
        width={720}
        onClose={onCLose}
        visible={showUpdateLiveStockDrawer}
        bodyStyle={{paddingBottom: 80}}
        footer={
            <div
                style={{
                    textAlign: 'right',
                }}
            >
                <Button onClick={onCLose} style={{marginRight: 8}}>
                    Cancel
                </Button>
            </div>
        }
    >
        <Form layout="vertical"
              onFinishFailed={onFinishFailed}
              onFinish={onFinish}
              initialValues={{
                  name: LiveStock.name,
                  livestockId: LiveStock.livestockId
              }}
              hideRequiredMark>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="name"
                        label="name"
                        rules={[{required: true, message: 'Please enter name'}]}
                    >
                        <Input placeholder="Please enter name"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="livestockId"
                        label="livestockId"
                        rules={[{required: true, message: 'Please enter name'}]}
                    >
                        <Input placeholder="Please enter name"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{backgroundColor: 'green'}}>
                            Submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                {submitting && <Spin indicator={antIcon}/>}
            </Row>
        </Form>
    </Drawer>
}

export default UpdateLivestockDrawerForm;