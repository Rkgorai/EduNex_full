// import React from 'react';
// import { Search } from 'lucide-react';
// import { motion } from 'framer-motion';

// interface SearchBarProps {
//   searchQuery: string;
//   onSearchChange: (query: string) => void;
// }
// export const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="relative w-full max-w-xl mx-auto mb-8"
//     >
//       <div className="relative">
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e) => onSearchChange(e.target.value)}
//           placeholder="Search courses..."
//           className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//         />
//       </div>
//     </motion.div>
//   );
// };

// import React, { useState } from 'react';
// import { Search } from 'lucide-react';
// import { motion } from 'framer-motion';

// interface SearchBarProps {
//   searchQuery: string;
//   onSearchChange: (query: string, searchBy: string) => void; // Adjusted to pass the searchBy value
// }

// export const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
//   const [searchBy, setSearchBy] = useState<'title' | 'tutor_name'>('title'); // Default to search by title

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     onSearchChange(e.target.value, searchBy);
//   };

//   const handleSearchByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSearchBy(e.target.value as 'title' | 'tutor_name');
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="relative w-full max-w-xl mx-auto mb-8"
//     >
//       <div className="flex items-center space-x-4">
//         {/* Search by dropdown */}
//         <select
//           value={searchBy}
//           onChange={handleSearchByChange}
//           className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         >
//           <option value="title">Search by Title</option>
//           <option value="tutor_name">Search by Tutor Name</option>
//         </select>

//         {/* Search input field */}
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={handleSearchChange}
//             placeholder={`Search by ${searchBy}...`}
//             className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//           />
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// import React, { useState, useEffect } from "react";
// import { Search } from "lucide-react";
// import { motion } from "framer-motion";

// interface SearchBarProps {
//   searchQuery: string;
//   onSearchChange: (query: string, searchBy: string) => void; // Adjusted to pass the searchBy value
//   onSearchSubmit: (query: string, searchBy: string) => void; // New function to handle search submission
// }

// export const SearchBar: React.FC<SearchBarProps> = ({
//   searchQuery,
//   onSearchChange,
//   onSearchSubmit,
// }) => {
//   const [searchBy, setSearchBy] = useState<"title" | "tutor_name">("title"); // Default to search by title

//   // Update search query when typing
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     onSearchChange(e.target.value, searchBy);
//   };

//   // Change the search criterion (title or tutor_name)
//   const handleSearchByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSearchBy(e.target.value as "title" | "tutor_name");
//   };

//   // Submit the search when the user presses Enter or clicks search
//   const handleSubmitSearch = () => {
//     onSearchSubmit(searchQuery, searchBy);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="relative w-full max-w-xl mx-auto mb-8"
//     >
//       <div className="flex items-center space-x-4">
//         {/* Search by dropdown */}
//         <select
//           value={searchBy}
//           onChange={handleSearchByChange}
//           className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         >
//           <option value="title">Search by Title</option>
//           <option value="tutor_name">Search by Tutor Name</option>
//         </select>

//         {/* Search input field */}
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={handleSearchChange}
//             placeholder={`Search by ${searchBy}...`}
//             className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//             onKeyPress={(e) => {
//               if (e.key === "Enter") {
//                 handleSubmitSearch(); // Trigger search on Enter key press
//               }
//             }}
//           />
//         </div>
//       </div>
//     </motion.div>
//   );
// };

import React, { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface SearchBarProps {
  searchQuery: string;
  searchBy: "title" | "tutor_name";
  onSearchChange: (query: string) => void;
  onSearchByChange: (criteria: "title" | "tutor_name") => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  searchBy,
  onSearchChange,
  onSearchByChange,
}) => {
  const [query, setQuery] = useState(searchQuery);

  // Handle query change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Trigger search on Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearchChange(query);
    }
  };

  // Handle search type change
  const handleSearchBySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSearchByChange(e.target.value as "title" | "tutor_name");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-xl mx-auto mb-8"
    >
      <div className="flex items-center space-x-4">
        {/* Search by dropdown */}
        <select
          value={searchBy}
          onChange={handleSearchBySelect}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="title">Search by Title</option>
          <option value="tutor_name">Search by Tutor Name</option>
        </select>

        {/* Search input field */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
            placeholder={`Search by ${searchBy}...`}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Search button */}
        <button
          onClick={() => onSearchChange(query)}
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Search
        </button>
      </div>
    </motion.div>
  );
};
