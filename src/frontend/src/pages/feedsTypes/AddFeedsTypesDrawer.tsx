import {Drawer, Input, Col, Form, Row, Button, Spin} from 'antd';
import {LoadingOutlined} from "@ant-design/icons";
import React, {useState} from 'react';
import {addBreeds, addFeedsTypes, addLivestock} from "@/apiCalls/apiCalls";
import {errorNotification, successNotification} from "@/utils/Notification";



const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;
const { TextArea } = Input;
interface LiveStockDrawerProps {
    showAddFeedTypeDrawer: boolean;
    setShowAddFeedTypeDrawer: React.Dispatch<React.SetStateAction<boolean>>
    fetchFeedsTypes: any
}

const AddFeedsTypesDrawer: React.FC<LiveStockDrawerProps> = ({
                                                                 showAddFeedTypeDrawer,
                                                                 setShowAddFeedTypeDrawer,
                                                                 fetchFeedsTypes
                                                             }) => {
    const onCLose = () => {
        setShowAddFeedTypeDrawer(false)
    }
    const [submitting, setSubmitting] = useState(false);

    const onFinish = (feedType: any) => {
        setSubmitting(true)
        addFeedsTypes(feedType)
            .then(() => {
                onCLose();
                fetchFeedsTypes()
                successNotification(
                    "Breed successfully added",
                    `${feedType.name} was added to the system`,
                    'topRight'
                )

            }).catch(err => {

            err.response.json().then((res: any) => {
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
        title="Create new livestock"
        width={720}
        onClose={onCLose}
        visible={showAddFeedTypeDrawer}
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
                        name="description"
                        label="description"
                        rules={[{required: true, message: 'Please enter description'}]}
                    >
                        <TextArea rows={2} placeholder="Enter a description here" />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="proteinPct"
                        label="proteinPct"
                        rules={[{required: true, message: 'Please enter proteinPct'}]}
                    >
                        <Input placeholder="Please enter proteinPct"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="fatPct"
                        label="fatPct"
                        rules={[{required: true, message: 'Please enter fatPct'}]}
                    >
                        <Input placeholder="Please enter fatPct"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="energy"
                        label="energy"
                        rules={[{required: true, message: 'Please enter energy'}]}
                    >
                        <Input placeholder="Please enter energy"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="costPerKg"
                        label="costPerKg"
                        rules={[{required: true, message: 'Please enter costPerKg'}]}
                    >
                        <Input placeholder="Please enter costPerKg"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="fiberPct"
                        label="fiberPct"
                        rules={[{required: true, message: 'Please enter fiberPct'}]}
                    >
                        <Input placeholder="Please enter fiberPct"/>
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

export default AddFeedsTypesDrawer;