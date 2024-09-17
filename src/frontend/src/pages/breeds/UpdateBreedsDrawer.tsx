import {Drawer, Input, Col, Form, Row, Button, Spin} from 'antd'
import {LoadingOutlined} from "@ant-design/icons"
import React, {useState} from 'react'
import {addBreeds, updateBreeds} from "@/apiCalls/apiCalls"
import {errorNotification, successNotification} from "@/utils/Notification"
import {Breeds} from "@/pages/types/Types";


const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>

interface BreedsDrawerProps {
    showUpdateBreedsDrawer: boolean;
    setShowUpdateBreedsDrawer: React.Dispatch<React.SetStateAction<boolean>>
    fetchBreeds: any
    breeds: Breeds
    setBreedsData: React.Dispatch<React.SetStateAction<Breeds | undefined>>
}

const UpdateBreedsDrawer: React.FC<BreedsDrawerProps> = ({
                                                             showUpdateBreedsDrawer,
                                                             setShowUpdateBreedsDrawer,
                                                             fetchBreeds,
                                                             breeds,
                                                             setBreedsData
                                                         }) => {
    const onCLose = () => {
        setBreedsData(undefined)
        setShowUpdateBreedsDrawer(false)
    }
    const [submitting, setSubmitting] = useState(false);

    const onFinish = (Breeds: any) => {
        setSubmitting(true)
        updateBreeds(Breeds)
            .then(() => {
                onCLose();
                fetchBreeds()
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
        title="Update Breeds"
        width={720}
        onClose={onCLose}
        visible={showUpdateBreedsDrawer}
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
              initialValues={breeds}
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
                        name="breedId"
                        label="breedId"
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

export default UpdateBreedsDrawer;