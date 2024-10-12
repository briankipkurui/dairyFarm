import {Drawer, Input, Col, Select, Form, Row, Button, Spin} from 'antd';
import {LoadingOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from 'react';
import {
    addFeedingFormula, addIncomes,
    getAllIncomesTypes, getAllValueChains,
    SearchIncomesTypes, SearchValueChains,
} from "@/apiCalls/apiCalls";
import {useDebounce} from "@/utils/DebounceHook";
import {IncomeTypes, ValueChains} from "@/pages/types/Types";
import {errorNotification, successNotification} from "@/utils/Notification";


const {Option} = Select;

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

interface CattleDrawerProps {
    showAddIncomeDrawer: boolean;
    setShowAddIncomeDrawer: React.Dispatch<React.SetStateAction<boolean>>
    fetchIncomes: any
}

const AddIncomeDrawer: React.FC<CattleDrawerProps> = ({
                                                          showAddIncomeDrawer,
                                                          setShowAddIncomeDrawer,
                                                          fetchIncomes
                                                      }) => {
    const onCLose = () => {
        setShowAddIncomeDrawer(false);
    }
    const [submitting, setSubmitting] = useState(false);
    const [incomeTypeToDisplay, setIncomeTypeToDisplay] = useState([])
    const [valueChainsToDisplay, setValueChainsToDisplay] = useState([])
    const [incomeTypeSearchTerm, setIncomeTypeSearchTerm] = useState('')
    const [ValueChainsSearchTerm, setValueChainsSearchTerm] = useState('')
    const [incomeTypesOptions, setIncomeTypesOptions] = useState([])
    const [valueChainsOptions, setValueChainsOptions] = useState([])
    const [form] = Form.useForm();


    const fetchAllIncomesTypes = () =>
        getAllIncomesTypes()
            .then(res => res.json())
            .then(data => {
                setIncomeTypeToDisplay(data);
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
        fetchAllIncomesTypes();
    }, []);


    const fetchAllValueChains = () =>
        getAllValueChains()
            .then(res => res.json())
            .then(data => {
                setValueChainsToDisplay(data);
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
        fetchAllValueChains();
    }, []);


    const onFinish = (student: any) => {
        setSubmitting(true)
        addIncomes(student)
            .then(() => {
                console.log("cow added")
                onCLose();
                successNotification(
                    "Cow successfully added",
                    `${student.name} was added to the system`,
                    'topRight'
                )
                fetchIncomes();
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
    const handleIncomeTypeChange = (value: any) => {
        setIncomeTypeSearchTerm(value)
    }
    const handleValueChainChange = (value: any) => {
        setValueChainsSearchTerm(value)
    }

    const searchIncomesTypesBySearchTerm = (query: any) => {
        SearchIncomesTypes(incomeTypeSearchTerm)
            .then(res => res.json())
            .then(data => {
                setIncomeTypeToDisplay(data)
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
    useDebounce(incomeTypeSearchTerm, 500, searchIncomesTypesBySearchTerm)

    const searchValueChainsBySearchTerm = () => {
        SearchValueChains(ValueChainsSearchTerm)
            .then(res => res.json())
            .then(data => {
                setValueChainsToDisplay(data)
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
    useDebounce(ValueChainsSearchTerm, 500, searchValueChainsBySearchTerm)


    useEffect(() => {
        const updatedIncomesTypesOptions: any = incomeTypeToDisplay.map((incomeTypes: IncomeTypes) => ({
            label: incomeTypes.name,
            value: incomeTypes.id
        }));
        setIncomeTypesOptions(updatedIncomesTypesOptions);
    }, [incomeTypeToDisplay]);

    useEffect(() => {
        const updatedValueChainsOptions: any = valueChainsToDisplay.map((valueChains: ValueChains) => ({
            label: valueChains.name,
            value: valueChains.id
        }));
        setValueChainsOptions(updatedValueChainsOptions);
    }, [valueChainsToDisplay]);


    const filterIncomeTypesOptions = (inputValue: any, option: any) => {
        const label = option.props.children;
        if (label && typeof label === 'string') {
            return label.toLowerCase().includes(inputValue.toLowerCase());
        }
        return false;
    };

    const filterValueChainsOptions = (inputValue: any, option: any) => {
        const label = option.props.children;
        if (label && typeof label === 'string') {
            return label.toLowerCase().includes(inputValue.toLowerCase());
        }
        return false;
    };


    const handleLivestockSelect = (value: any) => {
    }


    return <Drawer
        title="Create new Income"
        width={720}
        onClose={onCLose}
        visible={showAddIncomeDrawer}
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
                        name="incomeTypeId"
                        label="Income type"
                        rules={[{required: true, message: 'Please select livestock type'}]}
                    >
                        <Select
                            placeholder="Please select a sex"
                            showSearch
                            onSearch={handleIncomeTypeChange}
                            filterOption={filterIncomeTypesOptions}
                            onSelect={handleLivestockSelect}
                        >
                            {incomeTypesOptions.map((option: any) => (
                                <Option key={option.value} value={option.value}>{option.label}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="valueChainsId"
                        label="Value Chain"
                        rules={[{required: true, message: 'Please select livestock type'}]}
                    >
                        <Select
                            placeholder="Please select a sex"
                            showSearch
                            onSearch={handleValueChainChange}
                            filterOption={filterValueChainsOptions}
                            onSelect={handleLivestockSelect}
                        >
                            {valueChainsOptions.map((option: any) => (
                                <Option key={option.value} value={option.value}>{option.label}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>

                <Col span={12}>
                    <Form.Item
                        name="amount"
                        label="Amount"
                        rules={[{required: true, message: 'Please enter Amount'}]}
                    >
                        <Input placeholder="enter Amount"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{required: true, message: 'Please enter description'}]}
                    >
                        <Input placeholder="enter description"/>
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

export default AddIncomeDrawer;