import {Drawer, Input, Col, Select, Form, Row, Button, Spin} from 'antd';
import {LoadingOutlined} from "@ant-design/icons";
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {errorNotification, successNotification} from "../../utils/Notification";
import {
    addBirths,
    addNewCattle, getAllCows,
    getBreeds,
    getLivestock,
    SearchBreed,
    SearchBreedById, SearchCattle,
    SearchLivestock, SearchLiveStockById, updateCattle
} from "@/apiCalls/apiCalls";
import {useDebounce} from "@/utils/DebounceHook";
import {Breeds, Cattle, livestockTypes} from "@/pages/types/Types";
import moment from 'moment';


const {Option} = Select;

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

interface AddRelationShipDrawerProps {
    addRelationShipDrawer: boolean;
    showRelationShipDrawer: React.Dispatch<React.SetStateAction<boolean>>
    cattle: Cattle,
    setCattleData: React.Dispatch<React.SetStateAction<Cattle | undefined>>
}

const AddRelationShipDrawer: React.FC<AddRelationShipDrawerProps> = ({
                                                                         addRelationShipDrawer,
                                                                         showRelationShipDrawer,
                                                                         cattle,
                                                                         setCattleData,
                                                                     }) => {
    const onCLose = () => {
        setCattleData(undefined)
        showRelationShipDrawer(false);
    }
    const [form] = Form.useForm();
    const [cattleOptions, setCattleOptions] = useState<any>([])
    const [cowsToDisplay, setCowsToDisplay] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')


    const fetchCattle = () =>
        getAllCows()
            .then(res => res.json())
            .then(data => {
                setCowsToDisplay(data);
                setCowsToDisplay(data)
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


    const searchCattleBySearchTerm = () => {
        SearchCattle(searchTerm)
            .then(res => res.json())
            .then(data => {
                setCowsToDisplay(data)
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
    }

    useDebounce(searchTerm, 50, searchCattleBySearchTerm)


    const onFinish = (births:any) => {
        console.log("tgis aaaaaaaaaaaaaaa",births)
        addBirths(births)
            .then(() => {
                successNotification(
                    "relationship successfully added",
                    ` for calve with id  ${births.name}`,
                    'topRight'
                )
                onCLose()
            }).catch(err => {
            console.log(err);
            err.response.json().then((res:any) => {
                console.log(res);
                errorNotification(
                    "There was an issue",
                    `${res.message} [${res.status}] [${res.error}]`,
                    'topRight'
                )
            });
        })
    }

    const onFinishFailed = (errorInfo: any) => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    const filterCattleOptions = (inputValue: any, option: any) => {
        const label = option.props.children;
        if (label && typeof label === 'string') {
            return label.toLowerCase().includes(inputValue.toLowerCase());
        }
        return false;
    };

    useEffect(() => {
        const updatedCattleOptions = cowsToDisplay.map((cattle: Cattle) => ({
            label: cattle.name,
            value: cattle.id
        }));
        setCattleOptions(updatedCattleOptions);
    }, [cowsToDisplay]);

    const handleSexChange = (value: any) => {
        setSearchTerm(value)
    }

    return <Drawer
        title={`add RelationShip to Cattle ${cattle.name}`}
        width={720}
        onClose={onCLose}
        visible={addRelationShipDrawer}
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
              initialValues={cattle}
              hideRequiredMark
        >
            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item
                        name="id"
                        label="Parent Cow"
                        rules={[{required: true, message: 'Please select a sex'}]}

                    >
                        <Select
                            placeholder="Please select a sex"
                            showSearch
                            onSearch={handleSexChange}
                            filterOption={filterCattleOptions}
                            disabled={true}
                        >
                            {cattleOptions.map((option: any) => (
                                <Option key={option.value} value={option.value}>{option.label}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Col span={8}>
                <Form.Item
                    name="calveId"
                    label="calve name"
                    rules={[{required: true, message: 'Please select a Calve name'}]}
                >
                    <Select
                        placeholder="Please select a Calve name"
                        showSearch
                        onSearch={handleSexChange}
                        filterOption={filterCattleOptions}
                    >
                        {cattleOptions.map((option: any) => (
                            <Option key={option.value} value={option.value}>{option.label}</Option>
                        ))}
                    </Select>
                </Form.Item>
            </Col>
            <Form.Item>
                <Button type="primary" htmlType="submit" style={{backgroundColor: 'green'}}>
                    Submit
                </Button>
            </Form.Item>

        </Form>
    </Drawer>
}

export default AddRelationShipDrawer;