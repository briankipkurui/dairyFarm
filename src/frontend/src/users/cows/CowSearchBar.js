import {Form, Select} from "antd";
import React, {useEffect, useState} from "react";
import './CowSearchBar.css'
import {errorNotification} from "../../utils/Notification";
import {SearchCattle, SearchCattleById} from "../../admin/adminUrlCall/AdminUrlCalls";
import {useDebounce} from "../../admin/utils/DebounceHook";


const {Option} = Select;
const CowSearchBar = ({fun}) => {
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
                fun(data);
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

    return (
        <>
            <div className="cowSearchBar">
                <Select
                    placeholder="Search cow"
                    showSearch
                    onSearch={handleLivestockChange}
                    filterOption={filterCowOptions}
                    onSelect={handleCowSelect}
                >
                    {cowOptions.map(option => (
                        <Option key={option.value} value={option.value}>{option.label}</Option>
                    ))}
                </Select>
            </div>
        </>
    )
}
export default CowSearchBar