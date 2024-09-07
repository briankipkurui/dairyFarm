import {Button, Col, Form, Input, Row, Select} from "antd";
import './FilterProduction.css'
import React, {useEffect, useState} from "react";
import {addNewCattle, SearchCattle, SearchCattleById} from "../adminUrlCall/AdminUrlCalls";
import {errorNotification, successNotification} from "../../utils/Notification";
import {useDebounce} from "../utils/DebounceHook";

const {Option} = Select;
const FilterProduction = () => {
    const [cowsToDisplay, setCowsToDisplay] = useState([])
    const [cowOptions, setCowOptions] = useState([])
    const [searchTerm, setSearchTerm] = useState('')


    const searchCowBySearchTerm = (query) => {
        SearchCattle(searchTerm)
            .then(res => res.json())
            .then(data => {
                setCowsToDisplay(data)
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
    useDebounce(searchTerm, 500, searchCowBySearchTerm)

    useEffect(() => {
        const updatedCowOptions = cowsToDisplay.map(breed => ({
            label: breed.name,
            value: breed.cattleId
        }));
        setCowOptions(updatedCowOptions);
    }, [cowsToDisplay]);

    const filterCowOptions = (inputValue, option) => {
        const label = option.props.children;
        if (label && typeof label === 'string') {
            return label.toLowerCase().includes(inputValue.toLowerCase());
        }
        return false;
    };

    const fetchCattleByCattleId = (id) =>
        SearchCattleById(id)
            .then(res => res.json())
            .then(data => {
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

    const handleCowSelect = (value) => {
        fetchCattleByCattleId(value)
    }
    const handleLivestockChange = (value) => {
        setSearchTerm(value)
        console.log("livestock to change................", value)
    }
    const onFinish = student => {
       console.log("this is the student that is been submitted.....",student)
    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };
    return (
        <>
            <div>
                <Form layout="vertical"
                      onFinishFailed={onFinishFailed}
                      onFinish={onFinish}

                      hideRequiredMark>
                    <Row gutter={16} className="rowName">
                        <Col span={18}>
                            <Form.Item
                                name="cattaleId"
                                label="filter-by"
                                rules={[{required: true, message: 'Please select a sex'}]}
                            >
                                <Select
                                    placeholder="search cattle"
                                    showSearch
                                    onSearch={handleLivestockChange}
                                    filterOption={filterCowOptions}
                                    onSelect={handleCowSelect}
                                >
                                    {cowOptions.map(option => (
                                        <Option key={option.value} value={option.value}>{option.label}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={15}>
                            <Form.Item
                                name="fromDate"
                                label="fromDate"
                            >
                                <Input type="date"/>
                            </Form.Item>
                        </Col>
                        <Col span={15}>
                            <Form.Item
                                name="toDate"
                                label="toDate"
                            >
                                <Input type="date"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item className="submit">
                                <Button type="primary" htmlType="submit">
                                    generate
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    )
}
export default FilterProduction