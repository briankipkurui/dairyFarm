import {Drawer, Input, Col, Select, Form, Row, Button, Spin} from 'antd';
import {LoadingOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from 'react';
import {errorNotification, successNotification} from "../../utils/Notification";
import {addNewCattle, getBreeds, SearchBreed, SearchCattle} from "../adminUrlCall/AdminUrlCalls";
import {useDebounce} from "../utils/DebounceHook";

const {Option} = Select;

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

function CowDrawerForm({showDrawer, setShowDrawer, fetchStudents}) {
    const onCLose = () => setShowDrawer(false);
    const [submitting, setSubmitting] = useState(false);
    const [breedsToDisplay, setBreedToDisplay] = useState([])
    const [searchTerm,setSearchTerm] = useState('')
    const [breedOptions, setBreedOptions] = useState([])

    const fetchBreeds = () =>
        getBreeds()
            .then(res => res.json())
            .then(data => {
                setBreedToDisplay(data);
            }).catch(err => {
            console.log(err.response)
            err.response.json().then(res => {
                console.log(res);
                errorNotification(
                    "There was an issue",
                    `${res.message} [${res.status}] [${res.error}]`
                )
            });
        })

    useEffect(() => {
        fetchBreeds();
    }, []);

    const onFinish = student => {
        setSubmitting(true)
        console.log(JSON.stringify(student, null, 2))
        addNewCattle(student)
            .then(() => {
                console.log("cow added")
                onCLose();
                successNotification(
                    "Cow successfully added",
                    `${student.name} was added to the system`
                )
                fetchStudents();
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
        }).finally(() => {
            setSubmitting(false);
        })
    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };
    const handleBreedChange = (value) => {
        setSearchTerm(value)
    }
    const searchBreedBySearchTerm = (query) => {
        SearchBreed(searchTerm)
            .then(res => res.json())
            .then(data => {
                setBreedToDisplay(data)
            }).catch(err => {
            console.log(err.response)
            err.response.json().then(res => {
                console.log(res);
                errorNotification(
                    "There was an issue",
                    `${res.message} [${res.status}] [${res.error}]`
                )
            });
        })
    }

    useDebounce(searchTerm, 50, searchBreedBySearchTerm)

    useEffect(() => {
        const updatedBreedOptions = breedsToDisplay.map(breed => ({
            label: breed.name,
            value: breed.breedId
        }));
        setBreedOptions(updatedBreedOptions);
    }, [breedsToDisplay]);

    const filterBreedOptions = (inputValue, option) => {
        const label = option.props.children;
        if (label && typeof label === 'string') {
            return label.toLowerCase().includes(inputValue.toLowerCase());
        }
        return false;
    };

    return <Drawer
        title="Create new student"
        width={720}
        onClose={onCLose}
        visible={showDrawer}
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
                        label="Name"
                        rules={[{required: true, message: 'Please enter student name'}]}
                    >
                        <Input placeholder="Please enter student name"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="sex"
                        label="sex"
                        rules={[{required: true, message: 'Please select a sex'}]}
                    >
                        <Select placeholder="Please select a sex">
                            <Option value="MALE">MALE</Option>
                            <Option value="FEMALE">FEMALE</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="breed"
                        label="breed"
                        rules={[{required: true, message: 'Please select a sex'}]}
                    >
                        <Select
                            placeholder="Please select a sex"
                            showSearch
                            onSearch={handleBreedChange}
                            filterOption={filterBreedOptions}
                        >
                            {breedOptions.map(option => (
                                <Option key={option.value} value={option.value}>{option.label}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

            </Row>

            <Row>
                <Col span={12}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
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

export default CowDrawerForm;