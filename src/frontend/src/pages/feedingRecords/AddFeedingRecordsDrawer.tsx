import {Drawer, Input, Col, Select, Form, Row, Button, Spin} from 'antd';
import {LoadingOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from 'react';
import {
    addFeedingFormula,
    addNewCattle, getAllFeedingFormulas, getAllFeedsTypes,
    getLivestock,
    SearchFeedsTypes,
    SearchLivestock
} from "@/apiCalls/apiCalls";
import {useDebounce} from "@/utils/DebounceHook";
import {Cattle, FeedingFormulas, FeedsTypes, Livestock} from "@/pages/types/Types";
import {errorNotification, successNotification} from "@/utils/Notification";


const {Option} = Select;

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

interface CattleDrawerProps {
    showAddFeedingFormulasDrawer: boolean;
    setShowAddFeedingFormulasDrawer: React.Dispatch<React.SetStateAction<boolean>>
    fetchFeedsFormulas: any
}

const AddFeedingRecordsDrawer: React.FC<CattleDrawerProps> = ({
                                                                   showAddFeedingFormulasDrawer,
                                                                   setShowAddFeedingFormulasDrawer,
                                                                   fetchFeedsFormulas
                                                               }) => {
    const onCLose = () => {
        setShowAddFeedingFormulasDrawer(false);
    }
    const [submitting, setSubmitting] = useState(false);
    const [formulaToDisplay, setFormulaToDisplay] = useState<FeedingFormulas[]>([])
    const [formulaOptions, setFormulaOptions] = useState([])
    const [cattleToDisplay, setCattleToDisplay] = useState<Cattle[]>([])
    const [cattleOptions, setCattleOptions] = useState([])
    const [formulaSearchTerm, setFormulaSearchTerm] = useState('')
    const [cattleSearchTerm, setCattleSearchTerm] = useState('')
    const [form] = Form.useForm();


    const fetchFeedingFormulas = () =>
        getLivestock()
            .then(res => res.json())
            .then((data:FeedingFormulas[]) => {
                setFormulaToDisplay(data);
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
        fetchFeedingFormulas();
    }, []);

    const fetchCattle = () =>
        getAllFeedsTypes()
            .then(res => res.json())
            .then((data:Cattle[]) => {
                setCattleToDisplay(data);
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
        fetchCattle();
    }, []);


    const onFinish = (student: any) => {
        setSubmitting(true)
        console.log(JSON.stringify(student, null, 2))
        console.log("this is what is going to the server", student)
        addFeedingFormula(student)
            .then(() => {
                console.log("cow added")
                onCLose();
                successNotification(
                    "Cow successfully added",
                    `${student.name} was added to the system`,
                    'topRight'
                )
                fetchFeedsFormulas();
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
        setFeedTypeSearchTerm(value)
    }
    const handleLivestockChange = (value: any) => {
        setSearchTermForLivestockType(value)
    }

    const searchFeedsTypesBySearchTerm = (query: any) => {
        SearchFeedsTypes(feedTypeSearchTerm)
            .then(res => res.json())
            .then(data => {
                setFeedingTypesToDisplay(data)
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
    useDebounce(feedTypeSearchTerm, 500, searchFeedsTypesBySearchTerm)

    const searchLivestockTypeBySearchTerm = (query: any) => {
        SearchLivestock(searchTermForLivestockType)
            .then(res => res.json())
            .then(data => {
                setLivestockTypeToDisplay(data)
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
    useDebounce(searchTermForLivestockType, 500, searchLivestockTypeBySearchTerm)

    useEffect(() => {
        const updatedFeedsTypesOptions: any = feedingTypesToDisplay.map((feedsTypes: FeedsTypes) => ({
            label: feedsTypes.name,
            value: feedsTypes.id
        }));
        setFeedingTypesOptions(updatedFeedsTypesOptions);
    }, [feedingTypesToDisplay]);

    useEffect(() => {
        const updatedLivestockOptions: any = livestockTypeToDisplay.map((livestock: Livestock) => ({
            label: livestock.name,
            value: livestock.id
        }));
        setLivestockOptions(updatedLivestockOptions);
    }, [livestockTypeToDisplay]);

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
        visible={showAddFeedingFormulasDrawer}
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
              hideRequiredMark>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="livestockTypeId"
                        label="livestock type"
                        rules={[{required: true, message: 'Please select livestock type'}]}
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
                        name="feedsTypesId"
                        label="feed Types"
                        rules={[{required: true, message: 'Please select feed Types'}]}
                    >
                        <Select
                            placeholder="Please select feed Types"
                            showSearch
                            onSearch={handleBreedChange}
                            filterOption={filterBreedOptions}
                        >
                            {feedingTypesOptions.map((option: any) => (
                                <Option key={option.value} value={option.value}>{option.label}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="quantityKg"
                        label="quantityKg"
                    >
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="feedingFrequency"
                        label="feedingFrequency"
                    >
                        <Input/>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="feedingTime"
                        label="feedingTime"
                    >
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="waterLiters"
                        label="waterLiters"
                    >
                        <Input/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="supplements"
                        label="supplements"
                    >
                        <Input/>
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

export default AddFeedingRecordsDrawer;