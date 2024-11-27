import React from "react";
import { motion } from "framer-motion";
import { Filter as FilterIcon, X } from "lucide-react";
// import { Filter } from "../types";

interface FilterSidebarProps {
  filters: {
    id: string;
    name: string;
    options: string[];
  }[];
  selectedFilters: {
    [filterId: string]: string[]; // The selected options for each filter
  };
  onFilterChange: (filterId: string, selectedOptions: string[]) => void; // Accepts an array of strings
  onApplyFilters: () => void; // Callback for applying the filters
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  selectedFilters,
  onFilterChange,
  onApplyFilters,
}) => {
  const handleCheckboxChange = (filterId: string, option: string) => {
    const newSelectedFilters = { ...selectedFilters };

    if (newSelectedFilters[filterId]) {
      // Toggle the selection (add/remove)
      if (newSelectedFilters[filterId].includes(option)) {
        newSelectedFilters[filterId] = newSelectedFilters[filterId].filter(
          (v) => v !== option
        );
      } else {
        newSelectedFilters[filterId].push(option);
      }
    } else {
      newSelectedFilters[filterId] = [option];
    }

    // Pass the updated array of selected options for the filter
    onFilterChange(filterId, newSelectedFilters[filterId]);
  };

  const handleSliderChange = (filterId: string, value: string) => {
    const newSelectedFilters = { ...selectedFilters };
    newSelectedFilters[filterId] = [value];
    onFilterChange(filterId, newSelectedFilters[filterId]);
  };

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-64 bg-white h-screen fixed left-0 top-16 p-4 shadow-lg overflow-y-auto pb-20" // Added pb-20 for bottom padding
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <FilterIcon className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onApplyFilters} // Button for applying filters
          className="text-sm text-gray-500 hover:text-indigo-600 flex items-center space-x-1"
        >
          <X className="h-4 w-4" />
          <span>Apply Filters</span>
        </motion.button>
      </div>

      {filters.map((filter) => {
        if (filter.name.toLowerCase() === "price") {
          return (
            <div key={filter.id} className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                {filter.name}
              </h3>
              <div className="space-y-2">
                {filter.options.map((priceOption) => (
                  <label
                    key={priceOption}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={
                        selectedFilters[filter.id]?.includes(priceOption) ||
                        false
                      }
                      onChange={() =>
                        handleCheckboxChange(filter.id, priceOption)
                      }
                      className="rounded text-indigo-600 focus:ring-indigo-600"
                    />
                    <span className="text-sm text-gray-600">
                      {priceOption.charAt(0).toUpperCase() +
                        priceOption.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          );
        }

        if (filter.id === "rating") {
          return (
            <div key={filter.id} className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                {filter.name}
              </h3>
              <div className="space-y-2">
                <input
                  className="w-full h-2 bg-indigo-600 rounded-full focus:outline-none"
                  type="range"
                  min="1"
                  max="5"
                  value={selectedFilters[filter.id]?.[0] || 3} // Default value of 3
                  onChange={(e) =>
                    handleSliderChange(filter.id, e.target.value)
                  }
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>1</span>
                  <span>5</span>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div key={filter.id} className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              {filter.name}
            </h3>
            <div className="space-y-2">
              {filter.options.map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={
                      selectedFilters[filter.id]?.includes(option) || false
                    }
                    onChange={() => handleCheckboxChange(filter.id, option)}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-600">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );
      })}
    </motion.div>
  );
};
