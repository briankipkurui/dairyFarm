import React, { useState } from "react";

const AdaptiveValueChainFilter = () => {
    const [filters, setFilters] = useState([{ field: "Name", condition: "Equals", value: "" }]);

    // Options for fields and conditions
    const fieldOptions = ["Name", "CreatedAt", "UpdatedAt"];
    const conditionOptions:any = {
        Name: ["Equals", "Contains"],
        CreatedAt: ["Equals", "Before", "After", "Between"],
        UpdatedAt: ["Equals", "Before", "After", "Between"],
    };

    // Handle adding a new filter
    const addFilter = () => {
        setFilters([...filters, { field: "Name", condition: "Equals", value: "" }]);
    };

    // Handle filter changes
    const handleFilterChange = (index:any, key:any, value:any) => {
        const updatedFilters:any = [...filters];
        updatedFilters[index][key] = value;
        if (key === "field") {
            updatedFilters[index].condition = "Equals"; // Reset condition when field changes
            updatedFilters[index].value = ""; // Reset value
        }
        setFilters(updatedFilters);
    };

    // Render dynamic inputs
    const renderInput = (filter:any, index:any) => {
        if (filter.condition === "Between") {
            return (
                <div style={{ display: "flex", gap: "10px" }}>
                    <input
                        type="date"
                        placeholder="Start Date"
                        value={filter.value.start || ""}
                        onChange={(e) =>
                            handleFilterChange(index, "value", { ...filter.value, start: e.target.value })
                        }
                    />
                    <input
                        type="date"
                        placeholder="End Date"
                        value={filter.value.end || ""}
                        onChange={(e) =>
                            handleFilterChange(index, "value", { ...filter.value, end: e.target.value })
                        }
                    />
                </div>
            );
        }
        return (
            <input
                type={filter.field === "Name" ? "text" : "date"}
                placeholder={filter.field === "Name" ? "Enter value" : "Select date"}
                value={filter.value}
                onChange={(e) => handleFilterChange(index, "value", e.target.value)}
            />
        );
    };

    return (
        <div>
            <h2>Custom Loan Accounts Filter</h2>
            {filters.map((filter, index) => (
                <div key={index} style={{ marginBottom: "20px" }}>
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
                        {conditionOptions[filter.field].map((condition:any) => (
                            <option key={condition} value={condition}>
                                {condition}
                            </option>
                        ))}
                    </select>
                    {renderInput(filter, index)}
                </div>
            ))}
            <button onClick={addFilter}>Add Filter</button>
            <button onClick={() => console.log(filters)}>Apply</button>
        </div>
    );
};

export default AdaptiveValueChainFilter;
