import React, {useEffect, useState} from "react";
import {ValueChains} from "@/pages/types/Types";

interface AdaptiveValueChainFilterProps {
    setData: (data: any[]) => void;
}

const AdaptiveBreedsFilter: React.FC<AdaptiveValueChainFilterProps> = ({setData}) => {
    const [filters, setFilters] = useState([{field: "", condition: "Equals", value: ""}]);
    const [metadata, setMetadata] = useState<{ [key: string]: string[] }>({});

    // Fetch metadata from the backend
    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const response = await fetch("/api/v1/breeds/metadata");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setMetadata(data);
            } catch (error) {
                console.error("Error fetching metadata:", error);
            }
        };

        fetchMetadata();
    }, []);

    const addFilter = () => {
        setFilters([...filters, {field: "", condition: "Equals", value: ""}]);
    };

    const handleFilterChange = (index: number, key: string, value: any) => {
        const updatedFilters: any = [...filters];
        updatedFilters[index][key] = value;
        if (key === "field") {
            updatedFilters[index].condition = metadata[value]?.[0] || "Equals"; // Default to the first condition
            updatedFilters[index].value = ""; // Reset value
        }
        setFilters(updatedFilters);
    };

    const renderInput = (filter: any, index: number) => {
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
                type={["Equals", "StartsWith", "Contains"].includes(filter.condition) ? "text" : "date"}
                placeholder={
                    filter.condition === "Equals"
                        ? "Enter exact value"
                        : filter.condition === "StartsWith"
                            ? "Enter starting value"
                            : filter.condition === "Contains"
                                ? "Enter partial value"
                                : "Select date"
                }
                value={filter.value}
                onChange={(e) => handleFilterChange(index, "value", e.target.value)}
            />
        );
    };

    const applyFilters = async () => {
        try {
            const response = await fetch("/api/v1/breeds/filter", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(filters),
            });
            const data: ValueChains[] = await response.json();
            setData(data);
        } catch (error) {
            console.error("Error applying filters:", error);
        }
    };

    return (
        <div>
            <h2>Adaptive Filter</h2>
            {filters.map((filter, index) => (
                <div key={index} style={{marginBottom: "20px"}}>
                    <select
                        value={filter.field}
                        onChange={(e) => handleFilterChange(index, "field", e.target.value)}
                    >
                        <option value="" disabled>Select Field</option>
                        {Object.keys(metadata).map((field) => (
                            <option key={field} value={field}>
                                {field}
                            </option>
                        ))}
                    </select>
                    <select
                        value={filter.condition}
                        onChange={(e) => handleFilterChange(index, "condition", e.target.value)}
                    >
                        {metadata[filter.field]?.map((condition) => (
                            <option key={condition} value={condition}>
                                {condition}
                            </option>
                        ))}
                    </select>
                    {renderInput(filter, index)}
                </div>
            ))}
            <button onClick={addFilter}>Add Filter</button>
            <button onClick={applyFilters}>Apply Filters</button>
        </div>
    );
};

export default AdaptiveBreedsFilter;
