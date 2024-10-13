import React, {useCallback, useEffect, useState} from "react";
import {getAllValueChains} from "@/apiCalls/apiCalls";
import {ExpenseTypes, ValueChains} from "@/pages/types/Types";
import {Button, Col, Form, Input, Row, Select} from "antd";

const {Option} = Select;
const ValueChainListings = () => {
    const [valueChain, setValueChain] = useState<ValueChains[]>([])
    const [valueChainsOptions, setValueChainsOptions] = useState([])
    const [form] = Form.useForm();


    const fetchValueChains = useCallback(async () => {
        try {
            const res = await getAllValueChains();
            const data = await res.json();
            setValueChain(data);
        } catch (err) {
            console.error("Error fetching breeds:", err);
        }
    }, []);

    useEffect(() => {
        fetchValueChains();
    }, [fetchValueChains]);


    useEffect(() => {
        const updatedExpenseTypesOptions: any = valueChain.map((valueChains: ValueChains) => ({
            label: valueChains.name,
            value: valueChains.id
        }));
        setValueChainsOptions(updatedExpenseTypesOptions);
    }, [valueChain]);

    const filterValueChains = (inputValue: any, option: any) => {
        const label = option.props.children;
        if (label && typeof label === 'string') {
            return label.toLowerCase().includes(inputValue.toLowerCase());
        }
        return false;
    }
    const handleValueChainsSelect = (value: any) => {
    }

    const onFinish = (student: any) => {

    }


    const onFinishFailed = (errorInfo: any) => {
        alert(JSON.stringify(errorInfo, null, 2));
    };
    return (
        <>
            <Form
                layout="vertical"
                onFinishFailed={onFinishFailed}
                onFinish={onFinish}
                form={form}
                hideRequiredMark
            >
                <Row gutter={12}>
                    <Col span={4}>
                        <Form.Item
                            name="valueChainId"
                            label="Value Chain"
                            rules={[{ required: true, message: 'Select Value Chain' }]}
                        >
                            <Select
                                placeholder="Select Value Chain"
                                showSearch
                                filterOption={filterValueChains}
                                onSelect={handleValueChainsSelect}
                                className="border-gray-300 rounded-md shadow-sm"
                            >
                                {valueChainsOptions.map((option: any) => (
                                    <Option key={option.value} value={option.value}>
                                        {option.label}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={4}>
                        <Form.Item name="dateServed" label="Date Served">
                            <Input
                                type="date"
                                className="border-gray-300 rounded-md shadow-sm"
                            />
                        </Form.Item>
                    </Col>

                    <Col span={4}>
                        <Form.Item name="dateServed" label="Date Served">
                            <Input
                                type="date"
                                className="border-gray-300 rounded-md shadow-sm"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Col span={3}>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="bg-blue-500 text-white hover:bg-blue-600 rounded-md px-4 py-2"
                        >
                            Fetch Dashboard Items
                        </Button>
                    </Form.Item>
                </Col>
            </Form>


        </>
    )
}
export default ValueChainListings