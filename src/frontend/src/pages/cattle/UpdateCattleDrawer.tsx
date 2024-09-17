import {Drawer, Input, Col, Select, Form, Row, Button, Spin} from 'antd';
import {LoadingOutlined} from "@ant-design/icons";
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {errorNotification, successNotification} from "../../utils/Notification";
import {
    addNewCattle,
    getBreeds,
    getLivestock,
    SearchBreed,
    SearchBreedById,
    SearchLivestock, SearchLiveStockById, updateCattle
} from "@/apiCalls/apiCalls";
import {useDebounce} from "@/utils/DebounceHook";
import {Breeds, Cattle, Livestock} from "@/pages/types/Types";
import moment from 'moment';


const {Option} = Select;

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

interface CattleDrawerProps {
    updateCattleDrawer: boolean;
    showUpdateCattleDrawer: React.Dispatch<React.SetStateAction<boolean>>
    cattle: Cattle,
    setCattleData: React.Dispatch<React.SetStateAction<Cattle | undefined>>
    getAllCows: any
}

const UpdateCattleDrawer: React.FC<CattleDrawerProps> = ({
                                                             updateCattleDrawer,
                                                             showUpdateCattleDrawer,
                                                             cattle,
                                                             setCattleData,
                                                             getAllCows
                                                         }) => {
    const onCLose = () => {
        setCattleData(undefined)
        showUpdateCattleDrawer(false);
    }
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


    useLayoutEffect(() => {
        const setFormValues = async () => {
            const liveStock: Livestock = livestockToDisplay.find((c: Livestock) => c.id === cattle.livestock.id) ||
                await getSpecificLiveStockById(cattle.livestock.id)
            const breed: Breeds = breedsToDisplay.find((p: Breeds) => p.id === cattle.breeds.id) ||
                await getSpecificBreedById(cattle.breeds.id);

            form.setFieldsValue({
                livestockId: liveStock ? {value: liveStock.id, label: liveStock.name} : undefined,
                breedId: breed ? {value: breed.id, label: breed.name} : undefined,
                dateServed: cattle.dateServed ? moment(cattle.dateServed).format('YYYY-MM-DD') : null,
                dateDewormed: cattle.dateDewormed ? moment(cattle.dateDewormed).format('YYYY-MM-DD') : null,
                dateOfBirth: cattle.dateOfBirth ? moment(cattle.dateOfBirth).format('YYYY-MM-DD') : null,
                sex: cattle.sex,
                name: cattle.name

            })
        };
        if (cattle) {
            setFormValues()
        }
    }, [cattle, livestockToDisplay, breedsToDisplay, form])

    const fetchBreeds = () =>
        getBreeds()
            .then(res => res.json())
            .then(data => {
                setBreedToDisplay(data);
            }).catch(err => {
            console.log(err.response)
            err.response.json().then((res: any) => {
                console.log(res);
                errorNotification(
                    "There was an issue",
                    `${res.message} [${res.status}] [${res.error}]`,
                    'topRight'
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
            err.response.json().then((res: any) => {
                console.log(res);
                errorNotification(
                    "There was an issue",
                    `${res.message} [${res.status}] [${res.error}]`,
                    'topRight'
                )
            });
        })

    useEffect(() => {
        fetchLivestock();
    }, []);


    const getSpecificBreedById = async (id: any) => {
        try {
            const res = await SearchBreedById(id)
            const data = await res.json()
            return data && data.length > 0 ? data[0] : null;
        } catch (err: any) {
            if (err.response) {
                const errorResponse = await err.response.json();
                console.error(errorResponse)
                errorNotification(
                    "There was an issue",
                    `${errorResponse.message} [${errorResponse.status}] [${errorResponse.error}]`,
                    'topRight'
                );
            } else {
                errorNotification(
                    "Unexpected Error",
                    "An unexpected error occurred.",
                    'topRight'
                );
            }
            return null;
        }
    }

    const getSpecificLiveStockById = async (id: any) => {
        try {
            const res = await SearchLiveStockById(id)
            const data = await res.json()
            return data && data.length > 0 ? data[0] : null;
        } catch (err: any) {
            if (err.response) {
                const errorResponse = await err.response.json();
                console.error(errorResponse)
                errorNotification(
                    "There was an issue",
                    `${errorResponse.message} [${errorResponse.status}] [${errorResponse.error}]`,
                    'topRight'
                );
            } else {
                errorNotification(
                    "Unexpected Error",
                    "An unexpected error occurred.",
                    'topRight'
                );
            }
            return null;
        }
    }

    const onFinish = (student: any) => {
        setSubmitting(true)
        const extractedAssets = {
            ...student,
            livestockId: student.livestockId?.value ? student.livestockId.value : student.livestockId,
            breedId: student.breedId?.value ? student.breedId.value : student.breedId
        }
        console.log(JSON.stringify(student, null, 2))
        console.log("this is what is going to the server", student)
        updateCattle(extractedAssets)
            .then(() => {
                console.log("cow added")
                onCLose();
                successNotification(
                    "Cow successfully added",
                    `${student.name} was added to the system`,
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
            });
        }).finally(() => {
            setSubmitting(false);
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        alert(JSON.stringify(errorInfo, null, 2));
    };
    const handleBreedChange = (value: any) => {
        setSearchTerm(value)
    }
    const handleLivestockChange = (value: any) => {
        setSearchTermForLivestock(value)
    }
    const searchBreedBySearchTerm = (query: any) => {
        SearchBreed(searchTerm)
            .then(res => res.json())
            .then(data => {
                setBreedToDisplay(data)
            }).catch(err => {
            console.log(err.response)
            err.response.json().then((res: any) => {
                console.log(res);
                errorNotification(
                    "There was an issue",
                    `${res.message} [${res.status}] [${res.error}]`,
                    "bottomLeft"
                )
            });
        })
    }
    useDebounce(searchTerm, 50, searchBreedBySearchTerm)

    const searchLivestockBySearchTerm = (query: any) => {
        SearchLivestock(searchTermForLivestock)
            .then(res => res.json())
            .then(data => {
                setLivestockToDisplay(data)
            }).catch(err => {
            console.log(err.response)
            err.response.json().then((res: any) => {
                console.log(res);
                errorNotification(
                    "There was an issue",
                    `${res.message} [${res.status}] [${res.error}]`,
                    "bottomLeft"
                )
            });
        })
    }
    useDebounce(searchTermForLivestock, 50, searchLivestockBySearchTerm)

    useEffect(() => {
        const updatedBreedOptions: any = breedsToDisplay.map((breed: Breeds) => ({
            label: breed.name,
            value: breed.id
        }));
        setBreedOptions(updatedBreedOptions);
    }, [breedsToDisplay]);

    useEffect(() => {
        const updatedLivestockOptions: any = livestockToDisplay.map((breed: Livestock) => ({
            label: breed.name,
            value: breed.id
        }));
        setLivestockOptions(updatedLivestockOptions);
    }, [livestockToDisplay]);

    const filterBreedOptions = (inputValue: any, option: any) => {
        const label = option.props.children;
        if (label && typeof label === 'string') {
            return label.toLowerCase().includes(inputValue.toLowerCase());
        }
        return false;
    };
    const filterLivestockOptions = (inputValue: any, option: any) => {
        const label = option.props.children;
        if (label && typeof label === 'string') {
            return label.toLowerCase().includes(inputValue.toLowerCase());
        }
        return false;
    };

    const handleLivestockSelect = (value: any) => {
        console.log("Selected livestock ID:", value)
    };
    return <Drawer
        title="Create new student"
        width={720}
        onClose={onCLose}
        visible={updateCattleDrawer}
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
              form={form}
              initialValues={{
                  livestockId: cattle.livestock.id,
                  breedId: cattle.breeds.id,
                  dateServed: cattle.dateServed ? moment(cattle.dateServed).format('YYYY-MM-DD') : null,
                  dateDewormed: cattle.dateDewormed ? moment(cattle.dateDewormed).format('YYYY-MM-DD') : null,
                  dateOfBirth: cattle.dateOfBirth ? moment(cattle.dateOfBirth).format('YYYY-MM-DD') : null,
                  sex: cattle.sex,
                  name: cattle.name,
                  id:cattle.id
              }}
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
                        name="livestockId"
                        label="livestock type"
                        rules={[{required: true, message: 'Please select a sex'}]}
                    >
                        <Select
                            placeholder="Please select a sex"
                            showSearch
                            onSearch={handleLivestockChange}
                            filterOption={filterLivestockOptions}
                            onSelect={handleLivestockSelect}
                        >
                            {livestockOptions.map((option: any) => (
                                <Option key={option.value} value={option.value}>{option.label}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="breedId"
                        label="breed"
                        rules={[{required: true, message: 'Please select a sex'}]}
                    >
                        <Select
                            placeholder="Please select a sex"
                            showSearch
                            onSearch={handleBreedChange}
                            filterOption={filterBreedOptions}
                        >
                            {breedOptions.map((option: any) => (
                                <Option key={option.value} value={option.value}>{option.label}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>


            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="dateOfBirth"
                        label="Date Of Birth"
                    >
                        <Input type="date"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="dateDewormed"
                        label="Date  Dewormed"
                    >
                        <Input type="date"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="dateServed"
                        label="Date  Served"
                    >
                        <Input type="date"/>
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        name="id"
                        label="Id"
                    >
                        <Input />
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

export default UpdateCattleDrawer;