import {Drawer, Input, Col, Form, Row, Button, Spin} from 'antd';
import {LoadingOutlined} from "@ant-design/icons";
import React, {useState} from 'react';
import {addRoles, addValueChains} from "@/apiCalls/apiCalls";
import {errorNotification, successNotification} from "@/utils/Notification";


const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

interface LiveStockDrawerProps {
    showAddValueChainsDrawer: boolean;
    setShowAddValueChainsDrawer: React.Dispatch<React.SetStateAction<boolean>>
    fetchValueChains: any
}

const AddValueChainsDrawer: React.FC<LiveStockDrawerProps> = ({
                                                                  showAddValueChainsDrawer,
                                                                  setShowAddValueChainsDrawer,
                                                                  fetchValueChains
                                                        }) => {
    const onCLose = () => {
        setShowAddValueChainsDrawer(false)
    }
    const [submitting, setSubmitting] = useState(false);

    const onFinish = (Breeds: any) => {
        setSubmitting(true)
        addValueChains(Breeds)
            .then(() => {
                onCLose();
                fetchValueChains()
                successNotification(
                    "Breed successfully added",
                    `${Breeds.name} was added to the system`,
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
        visible={showAddValueChainsDrawer}
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

export default AddValueChainsDrawer