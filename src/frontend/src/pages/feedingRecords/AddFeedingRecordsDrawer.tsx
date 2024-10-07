import {Drawer, Input, Col, Select, Form, Row, Button, Spin} from 'antd';
import {LoadingOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from 'react';
import {
    addFeedingFormula, addFeedingRecords,
    getAllCows,
    getAllFeedingFormulas, searchFeedingFormulas,
    SearchFeedsTypes,
    SearchLivestock
} from "@/apiCalls/apiCalls";
import {useDebounce} from "@/utils/DebounceHook";
import {Cattle, FeedingFormulas, FeedsTypes, Livestock} from "@/pages/types/Types";
import {errorNotification, successNotification} from "@/utils/Notification";


const {Option} = Select;

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

interface CattleDrawerProps {
    showAddFeedingRecordsDrawer: boolean;
    setShowAddFeedingRecordsDrawer: React.Dispatch<React.SetStateAction<boolean>>
    fetchFeedingRecords: any
}

const AddFeedingRecordsDrawer: React.FC<CattleDrawerProps> = ({
                                                                  showAddFeedingRecordsDrawer,
                                                                  setShowAddFeedingRecordsDrawer,
                                                                  fetchFeedingRecords
                                                               }) => {
    const onCLose = () => {
        setShowAddFeedingRecordsDrawer(false);
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
        getAllFeedingFormulas()
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
        getAllCows()
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


    const onFinish = (feedingRecords: any) => {
        setSubmitting(true)
        addFeedingRecords(feedingRecords)
            .then(() => {
                onCLose();
                successNotification(
                    "Cow successfully added",
                    `${feedingRecords.name} was added to the system`,
                    'topRight'
                )
                fetchFeedingRecords();
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
    const handleFormulaChange = (value: any) => {
        setFormulaSearchTerm(value)
    }
    const handleCattleChange = (value: any) => {
        setCattleSearchTerm(value)
    }

    const searchFeedingFormulasBySearchTerm = () => {
        searchFeedingFormulas(formulaSearchTerm)
            .then(res => res.json())
            .then((data:FeedingFormulas[]) => {
                setFormulaToDisplay(data)
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
    useDebounce(formulaSearchTerm, 500, searchFeedingFormulasBySearchTerm)

    const searchCattleBySearchTerm = (query: any) => {
        SearchLivestock(cattleSearchTerm)
            .then(res => res.json())
            .then((data:Cattle[]) => {
                setCattleToDisplay(data)
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
    useDebounce(cattleSearchTerm, 500, searchCattleBySearchTerm)

    useEffect(() => {
        const updatedFeedingFormula: any = formulaToDisplay.map((feedingFormulas: FeedingFormulas) => ({
            label: feedingFormulas.feedsTypes.name,
            value: feedingFormulas.id
        }));
        setFormulaOptions(updatedFeedingFormula);
    }, [formulaToDisplay]);

    useEffect(() => {
        const updatedCattleOptions: any = cattleToDisplay.map((cattle: Cattle) => ({
            label: cattle.name,
            value: cattle.id
        }));
        setCattleOptions(updatedCattleOptions);
    }, [cattleToDisplay]);

    const filterFormulaOptions = (inputValue: any, option: any) => {
        const label = option.props.children;
        if (label && typeof label === 'string') {
            return label.toLowerCase().includes(inputValue.toLowerCase());
        }
        return false;
    };
    const filterCattleOptions = (inputValue: any, option: any) => {
        const label = option.props.children;
        if (label && typeof label === 'string') {
            return label.toLowerCase().includes(inputValue.toLowerCase());
        }
        return false;
    };

    const handleLivestockSelect = (value: any) => {};

    return <Drawer
        title="Create new student"
        width={720}
        onClose={onCLose}
        visible={showAddFeedingRecordsDrawer}
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
                        name="feedingFormulaId"
                        label="Formula"
                        rules={[{required: true, message: 'Please select livestock type'}]}
                    >
                        <Select
                            placeholder="Please select a sex"
                            showSearch
                            onSearch={handleFormulaChange}
                            filterOption={filterFormulaOptions}
                            onSelect={handleLivestockSelect}
                        >
                            {formulaOptions.map((option: any) => (
                                <Option key={option.value} value={option.value}>{option.label}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="cattleId"
                        label="cattle"
                        rules={[{required: true, message: 'Please select feed Types'}]}
                    >
                        <Select
                            placeholder="Please select feed Types"
                            showSearch
                            onSearch={handleCattleChange}
                            filterOption={filterCattleOptions}
                        >
                            {cattleOptions.map((option: any) => (
                                <Option key={option.value} value={option.value}>{option.label}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="feedGivenKg"
                        label="feed Given(Kg)"
                    >
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="waterGivenLiters"
                        label="waterGiven(Liters)"
                    >
                        <Input/>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="remarks"
                        label="remarks"
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