import {Drawer, Input, Col, Select, Form, Row, Button, Spin} from 'antd';
import {LoadingOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from 'react';
import {
    addExpense,
    addFeedingFormula, addIncomes, getAllExpenseTypes,
    getAllIncomesTypes, getAllValueChains, SearchExpenseTypes,
    SearchIncomesTypes, SearchValueChains,
} from "@/apiCalls/apiCalls";
import {useDebounce} from "@/utils/DebounceHook";
import {ExpenseTypes, IncomeTypes, ValueChains} from "@/pages/types/Types";
import {errorNotification, successNotification} from "@/utils/Notification";


const {Option} = Select;

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

interface CattleDrawerProps {
    showAddExpenseDrawer: boolean;
    setShowAddExpensesDrawer: React.Dispatch<React.SetStateAction<boolean>>
    fetchExpenses: any
}

const AddExpenseDrawer: React.FC<CattleDrawerProps> = ({
                                                           showAddExpenseDrawer,
                                                           setShowAddExpensesDrawer,
                                                           fetchExpenses
                                                      }) => {
    const onCLose = () => {
        setShowAddExpensesDrawer(false);
    }
    const [submitting, setSubmitting] = useState(false);
    const [expensesTypeToDisplay, setExpensesTypeToDisplay] = useState([])
    const [valueChainsToDisplay, setValueChainsToDisplay] = useState([])
    const [ExpensesTypeSearchTerm, setExpensesTypeSearchTerm] = useState('')
    const [ValueChainsSearchTerm, setValueChainsSearchTerm] = useState('')
    const [ExpensesTypesOptions, setExpensesTypesOptions] = useState([])
    const [valueChainsOptions, setValueChainsOptions] = useState([])
    const [form] = Form.useForm();


    const fetchAllExpenseTypes = () =>
        getAllExpenseTypes()
            .then(res => res.json())
            .then(data => {
                setExpensesTypeToDisplay(data);
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
        fetchAllExpenseTypes();
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
        addExpense(student)
            .then(() => {
                console.log("cow added")
                onCLose();
                successNotification(
                    "Cow successfully added",
                    `${student.name} was added to the system`,
                    'topRight'
                )
                fetchExpenses();
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
    const handleExpenseTypeChange = (value: any) => {
        setExpensesTypeSearchTerm(value)
    }

    const handleValueChainChange = (value: any) => {
        setValueChainsSearchTerm(value)
    }

    const searchExpenseTypesBySearchTerm = () => {
        SearchExpenseTypes(ExpensesTypeSearchTerm)
            .then(res => res.json())
            .then(data => {
                setExpensesTypeToDisplay(data)
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
    useDebounce(ExpensesTypeSearchTerm, 500, searchExpenseTypesBySearchTerm)


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
        const updatedExpenseTypesOptions: any = expensesTypeToDisplay.map((expenseTypes: ExpenseTypes) => ({
            label: expenseTypes.name,
            value: expenseTypes.id
        }));
        setExpensesTypesOptions(updatedExpenseTypesOptions);
    }, [expensesTypeToDisplay]);


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
        visible={showAddExpenseDrawer}
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
                        name="expenseTypeId"
                        label="Expense Type"
                        rules={[{required: true, message: 'Please select livestock type'}]}
                    >
                        <Select
                            placeholder="Please select a sex"
                            showSearch
                            onSearch={handleExpenseTypeChange}
                            filterOption={filterIncomeTypesOptions}
                            onSelect={handleLivestockSelect}
                        >
                            {ExpensesTypesOptions.map((option: any) => (
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

export default AddExpenseDrawer;