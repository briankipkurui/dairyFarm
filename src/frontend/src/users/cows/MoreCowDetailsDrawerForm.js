import {Drawer, Input, Col, Select, Form, Row, Button, Spin} from 'antd';
import {LoadingOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from 'react';
import {errorNotification, successNotification} from "../../utils/Notification";

import moment from "moment/moment";
import {
    addNewCattle,
    getBreeds,
    getLivestock,
    SearchBreed,
    SearchLivestock
} from "../../admin/adminUrlCall/AdminUrlCalls";
import {useDebounce} from "../../admin/utils/DebounceHook";

const {Option} = Select;

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

function CowDrawerForm({showDrawer, setShowDrawer, cows}) {
    const onCLose = () => setShowDrawer(false);
    const [submitting, setSubmitting] = useState(false);
    const [breedsToDisplay, setBreedToDisplay] = useState([])
    const [livestockToDisplay, setLivestockToDisplay] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [searchTermForLivestock, setSearchTermForLivestock] = useState('')
    const [breedOptions, setBreedOptions] = useState([])
    const [livestockOptions, setLivestockOptions] = useState([])
    const [maxId, setMaxId] = useState(0)
    const [liveStockType, setLiveStockType] = useState('')
    const [serialNumber, setSerialNumber] = useState('')
    const [form] = Form.useForm();

    console.log("this is calles ,dddddddddddddddddddddd")

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

    const fetchLivestock = () =>
        getLivestock()
            .then(res => res.json())
            .then(data => {
                setLivestockToDisplay(data);
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
        fetchLivestock();
    }, []);


    const onFinish = student => {
        setSubmitting(true)
        console.log(JSON.stringify(student, null, 2))
        console.log("this is what is going to the server", student)
        addNewCattle(student)

            .then(() => {
                console.log("cow added")
                onCLose();
                successNotification(
                    "Cow successfully added",
                    `${student.name} was added to the system`
                )
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
    const handleLivestockChange = (value) => {
        setSearchTermForLivestock(value)
        console.log("livestock to change................", value)
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

    const searchLivestockBySearchTerm = (query) => {
        SearchLivestock(searchTermForLivestock)
            .then(res => res.json())
            .then(data => {
                setLivestockToDisplay(data)
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
    useDebounce(searchTermForLivestock, 50, searchLivestockBySearchTerm)

    useEffect(() => {
        const updatedBreedOptions = breedsToDisplay.map(breed => ({
            label: breed.name,
            value: breed.breedId
        }));
        setBreedOptions(updatedBreedOptions);
    }, [breedsToDisplay]);

    useEffect(() => {
        const updatedLivestockOptions = livestockToDisplay.map(breed => ({
            label: breed.name,
            value: breed.livestockId
        }));
        setLivestockOptions(updatedLivestockOptions);
    }, [livestockToDisplay]);

    const filterBreedOptions = (inputValue, option) => {
        const label = option.props.children;
        if (label && typeof label === 'string') {
            return label.toLowerCase().includes(inputValue.toLowerCase());
        }
        return false;
    };
    const filterLivestockOptions = (inputValue, option) => {
        const label = option.props.children;
        if (label && typeof label === 'string') {
            return label.toLowerCase().includes(inputValue.toLowerCase());
        }
        return false;
    };

    const transformData = (text) => {
        const dateOfBirth = moment(text);
        const currentDate = moment();
        const years = currentDate.diff(dateOfBirth, 'years');
        dateOfBirth.add(years, 'years');

        const months = currentDate.diff(dateOfBirth, 'months');
        dateOfBirth.add(months, 'months');

        const days = currentDate.diff(dateOfBirth, 'days')
        return `${years} years, ${months} months, and ${days} days`;

    }


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


        <Row gutter={16} style={{marginBottom: '20px'}}>
            <Col span={12}>
                <p><span  style={{ color: 'purple' }}><b>Name:</b></span> {cows.name}</p>
            </Col>
            <Col span={12}>
                <p><span  style={{color: 'purple'}}><b>Sex:</b></span> {cows.sex}</p>
            </Col>
        </Row>
        <Row gutter={16} style={{marginBottom: '20px'}}>
            <Col span={12}>
                <p><span  style={{color: 'purple'}}><b>serialNumber:</b></span> {cows.serialNumber}</p>
            </Col>
            <Col span={12}>
                <p><span  style={{color: 'purple'}}><b>dateOfBirth:</b></span> {transformData(cows.dateOfBirth)}</p>
            </Col>
        </Row>
        <Row gutter={16} style={{marginBottom: '20px'}}>
            <Col span={12}>
                <p><span style={{color: 'purple'}}><b>dateDewormed:</b></span> {transformData(cows.dateDewormed)}</p>
            </Col>
            <Col span={12}>
                <p><span style={{color: 'purple'}}><b>dateServed:</b></span> {transformData(cows.dateServed)}</p>
            </Col>
        </Row>
        <Row gutter={16}>
            <Col span={12}>
                {/*<p><span style={{color: 'purple'}}><b>liveStockType :</b></span> {cows.livestock.name}</p>*/}
            </Col>
            <Col span={12}>
                {/*<p><span style={{color: 'purple'}}><b>breed :</b></span> {cows.breeds.name}</p>*/}
            </Col>
        </Row>


    </Drawer>
}

export default CowDrawerForm;