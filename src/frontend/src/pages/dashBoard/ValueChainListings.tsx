import React, {useCallback, useEffect, useState} from "react";
import {getAllValueChains} from "@/apiCalls/apiCalls";
import {FilterValues, ValueChains} from "@/pages/types/Types";
import {Button, Col, Form, Input, Row, Select} from "antd";

const {Option} = Select;

interface ValueChainListingsProps {
    setSelectedFilterValue: React.Dispatch<React.SetStateAction<FilterValues | undefined>>
}

const ValueChainListings: React.FC<ValueChainListingsProps> = ({setSelectedFilterValue}) => {
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

    const onFinish = (filterValues: FilterValues) => {
        console.log("this are the value..............", filterValues)
        setSelectedFilterValue(filterValues)
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
                        <Form.Item name="startDate" label="startDate">
                            <Input
                                type="date"
                                className="border-gray-300 rounded-md shadow-sm"
                            />
                        </Form.Item>
                    </Col>

                    <Col span={4}>
                        <Form.Item name="endDate" label="endDate">
                            <Input
                                type="date"
                                className="border-gray-300 rounded-md shadow-sm"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="bg-blue-500 text-white hover:bg-blue-600 rounded-md px-4 py-2 mt-8"
                            >
                                Fetch Dashboard Items
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>


        </>
    )
}
export default ValueChainListings