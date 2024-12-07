import React, {useState} from "react";
import {ValueChains} from "@/pages/types/Types";

interface AdaptiveValueChainFilterProps {
    setData: (data: any[]) => void
}
const AdaptiveValueChainFilter: React.FC<AdaptiveValueChainFilterProps> = ({setData}) => {
    const [filters, setFilters] = useState([{field: "name", condition: "Equals", value: ""}]);

    // Options for fields and conditions
    const fieldOptions = ["name", "createdAt", "updatedAt"];
    const conditionOptions: any = {
        name: ["Equals", "Contains",'StartsWith'],
        createdAt: ["Equals", "Before", "After", "Between"],
        updatedAt: ["Equals", "Before", "After", "Between"],
    };

    // Handle adding a new filter
    const addFilter = () => {
        setFilters([...filters, {field: "name", condition: "Equals", value: ""}]);
    };

    // Handle filter changes
    const handleFilterChange = (index: any, key: any, value: any) => {
        const updatedFilters: any = [...filters];
        updatedFilters[index][key] = value;
        if (key === "field") {
            updatedFilters[index].condition = "Equals"; // Reset condition when field changes
            updatedFilters[index].value = ""; // Reset value
        }
        setFilters(updatedFilters);
    };

    // Render dynamic inputs
    const renderInput = (filter: any, index: any) => {
        if (filter.condition === "Between") {
            return (
                <div style={{display: "flex", gap: "10px"}}>
                    <input
                        type="date"
                        placeholder="Start Date"
                        value={filter.value?.start || ""}
                        onChange={(e) =>
                            handleFilterChange(index, "value", {...filter.value, start: e.target.value})
                        }
                    />
                    <input
                        type="date"
                        placeholder="End Date"
                        value={filter.value?.end || ""}
                        onChange={(e) =>
                            handleFilterChange(index, "value", {...filter.value, end: e.target.value})
                        }
                    />
                </div>
            );
        }
        return (
            <input
                type={filter.field === "name" ? "text" : "date"}
                placeholder={filter.field === "name" ? "Enter value" : "Select date"}
                value={filter.value}
                onChange={(e) => handleFilterChange(index, "value", e.target.value)}
            />
        );
    };

    // Submit filters to the backend
    const applyFilters = async () => {
        try {
            const response = await fetch("/api/v1/valueChains/filter", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(filters),
            });
   console.log("this are the filters sssssssssssssssss",filters)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data:ValueChains[] = await response.json();
            setData(data)
            console.log("Filtered Data:", data);
        } catch (error) {
            console.error("Error applying filters:", error);
        }
    };

    return (
        <div>
            <h2>Custom Loan Accounts Filter</h2>

            {filters.map((filter, index) => (
                <div key={index} style={{marginBottom: "20px"}}>
                    <select
                        value={filter.field}
                        onChange={(e) => handleFilterChange(index, "field", e.target.value)}
                    >
                        {fieldOptions.map((field) => (
                            <option key={field} value={field}>
                                {field}
                            </option>
                        ))}
                    </select>
                    <select
                        value={filter.condition}
                        onChange={(e) => handleFilterChange(index, "condition", e.target.value)}
                    >
                        {conditionOptions[filter.field].map((condition: any) => (
                            <option key={condition} value={condition}>
                                {condition}
                            </option>
                        ))}
                    </select>
                    {renderInput(filter, index)}
                </div>
            ))}
            <div className="flex space-x-4">
                <button
                    onClick={addFilter}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    Add Filter
                </button>
                <button
                    onClick={applyFilters}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
                    Apply
                </button>
            </div>
        </div>
    );
};

export default AdaptiveValueChainFilter;
