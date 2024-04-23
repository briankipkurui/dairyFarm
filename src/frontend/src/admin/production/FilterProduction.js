import {Button, Col, Form, Input, Row, Select} from "antd";
import './FilterProduction.css'
import React from "react";

const {Option} = Select;
const FilterProduction = () => {
    return (
        <>
            <div>
                <Row gutter={16} className="rowName">
                    <Col span={5}>
                        <p>Filter by :</p>
                        <Select placeholder="Please select a sex">
                            <Option value="MALE">MALE</Option>
                            <Option value="FEMALE">FEMALE</Option>
                        </Select>
                    </Col>
                    <Col span={15}>
                        <Form.Item
                            name="dateOfBirth"
                            label="Date Of Birth"
                        >
                        <Input type="date"  />
                        </Form.Item>
                    </Col>
                    <Col span={15}>
                        <Form.Item
                            name="DateDewormed"
                            label="Date  Dewormed"
                        >
                            <Input type="date"  />
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
            </div>
        </>
    )
}
export default FilterProduction