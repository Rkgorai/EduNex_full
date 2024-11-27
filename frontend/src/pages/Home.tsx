import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CourseCard } from "../components/CourseCard";
import { SearchBar } from "../components/SearchBar";
import { FilterSidebar } from "../components/FilterSidebar";
import { Course } from "../types";

interface Filter {
  id: string;
  name: string;
  options: string[];
}

export const Home: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState<"title" | "tutor_name">("title");
  const [loading, setLoading] = useState(true);

  // Reusable function to fetch all courses
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:3000/filter-schema/");
      const rawResponseText = await response.text();
      const sanitizedText = rawResponseText.replace(/NaN/g, "null");
      const data = JSON.parse(sanitizedText);
      setCourses(Array.isArray(data) ? data.slice(0, 500) : [data]);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch filters on mount
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3000/unique-values/");
        const rawResponseText = await response.text();
        // Replace NaN with null in the response text
        const sanitizedText = rawResponseText.replace(/NaN/g, "null");
        // Parse the sanitized response
        const data = JSON.parse(sanitizedText);
        console.log("Hello", data);
        const transformedFilters = Object.keys(data).map((key) => ({
          id: key,
          name: key.charAt(0).toUpperCase() + key.slice(1),
          options: data[key],
        }));
        setFilters(transformedFilters);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };

    fetchCourses(); // Fetch the courses initially
    fetchFilters(); // Fetch the filters on mount
  }, []);

  // Handle search input change
  const handleSearchChange = async (query: string) => {
    setSearchQuery(query);

    // // If query is empty, reset to default courses
    // if (query.trim() === "") {
    //   fetchCourses();
    //   return;
    // }

    // Filter out empty or default values from filters
    const sanitizedFilters = Object.fromEntries(
      Object.entries(selectedFilters).filter(
        ([_, value]) => Array.isArray(value) && value.length > 0
      )
    );
    if (selectedFilters["rating"]) {
      const ratingValue = selectedFilters["rating"][0];
      console.log("rating value = ", ratingValue);
      sanitizedFilters["rating"] = [">=" + ratingValue];
    }
    const payload = {
      [searchBy]: query.trim(),
      ...sanitizedFilters,
    };

    try {
      // Send search query as a POST request
      const response = await fetch("http://127.0.0.1:3000/filter-args/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const rawResponseText = await response.text();
      const sanitizedResponseText = rawResponseText.replace(/NaN/g, "null");
      const searchResults = JSON.parse(sanitizedResponseText);

      console.log("Search results:", searchResults); // Debugging

      // After the search query, fetch the updated course list
      fetchCourses();
      setCourses(Array.isArray(searchResults) ? searchResults : []);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setCourses([]);
    }
  };

  const handleSearchByChange = (criteria: "title" | "tutor_name") => {
    setSearchBy(criteria);
  };

  const handleFilterChange = (filterId: string, value: string[]) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterId]: value,
    }));
  };

  const handleApplyFilters = async () => {
    // Filter out empty or default values from selectedFilters
    const filteredPayload = Object.fromEntries(
      Object.entries(selectedFilters).filter(
        ([_, value]) => Array.isArray(value) && value.length > 0
      )
    );

    const payload = { filters: filteredPayload };

    try {
      console.log("Applying filters with payload:", payload); // Debugging
      const response = await fetch("http://127.0.0.1:3000/filter-args/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const responseData = await response.json();
      console.log("Response from backend:", responseData); // Log the backend response

      if (response.ok) {
        // Fetch the updated courses list after applying filters
        fetchCourses();
      } else {
        console.error("Error in response:", responseData);
        setCourses([]);
      }
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  // Handle page reload - send an empty JSON for reset
  useEffect(() => {
    const fetchEmpty = async () => {
      try {
        await fetch("http://127.0.0.1:3000/filter-args/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
        fetchCourses(); // Refresh course list after sending empty filter request
      } catch (error) {
        console.error("Error sending empty filters on page reload:", error);
      }
    };

    fetchEmpty(); // Automatically called on page load (refresh)
  }, []); // Empty dependency array for one-time execution on component mount

  return (
    <div className="flex h-screen bg-gray-50">
      <FilterSidebar
        filters={filters}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onApplyFilters={handleApplyFilters}
      />
      <motion.div
        className="w-full flex flex-col items-center p-4 ml-64 pt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <SearchBar
          searchQuery={searchQuery}
          searchBy={searchBy}
          onSearchChange={handleSearchChange}
          onSearchByChange={handleSearchByChange}
        />
        <div className="grid grid-cols-3 gap-4 mt-8">
            {loading ? (
              <p>Loading...</p>
            ) : courses && courses.some((course) => course.title) && courses.length > 0 ? (
              courses.map((course) => <CourseCard key={course.id} course={course} />)
            ) : (
              <p>No courses available</p>
            )}
          </div>
      </motion.div>
    </div>
  );
};

//updated;
// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { CourseCard } from "../components/CourseCard";
// import { SearchBar } from "../components/SearchBar";
// import { FilterSidebar } from "../components/FilterSidebar";
// import { Course } from "../types";

// interface Filter {
//   id: string;
//   name: string;
//   options: string[];
// }

// export const Home: React.FC = () => {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [filters, setFilters] = useState<Filter[]>([]);
//   const [selectedFilters, setSelectedFilters] = useState<
//     Record<string, string[]>
//   >({});
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchBy, setSearchBy] = useState<"title" | "tutor_name">("title");
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1); // Track the current page
//   const [totalPages, setTotalPages] = useState(1); // Total number of pages

//   // Reusable function to fetch courses with pagination
//   const fetchCourses = async (page: number = 1) => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `http://127.0.0.1:3000/filter-schema/?page=${page}&per_page=100`
//       );
//       const rawResponseText = await response.text();
//       const sanitizedText = rawResponseText.replace(/NaN/g, "null");
//       const data = JSON.parse(sanitizedText);
//       setCourses(Array.isArray(data) ? data.slice(0, 100) : [data]);

//       // Assume the backend provides the total number of courses, calculate total pages
//       setTotalPages(Math.ceil(data.length / 100));
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//       setCourses([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch filters on mount
//   useEffect(() => {
//     const fetchFilters = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:3000/unique-values/");
//         const data = await response.json();
//         const transformedFilters = Object.keys(data).map((key) => ({
//           id: key,
//           name: key.charAt(0).toUpperCase() + key.slice(1),
//           options: data[key],
//         }));
//         setFilters(transformedFilters);
//       } catch (error) {
//         console.error("Error fetching filters:", error);
//       }
//     };

//     fetchCourses(currentPage); // Fetch the courses initially for the first page
//     fetchFilters(); // Fetch the filters on mount
//   }, [currentPage]); // Trigger effect when currentPage changes

//   // Handle search input change
//   const handleSearchChange = async (query: string) => {
//     setSearchQuery(query);

//     // Filter out empty or default values from filters
//     const sanitizedFilters = Object.fromEntries(
//       Object.entries(selectedFilters).filter(
//         ([_, value]) => Array.isArray(value) && value.length > 0
//       )
//     );

//     const payload = {
//       [searchBy]: query.trim(),
//       ...sanitizedFilters,
//     };

//     try {
//       const response = await fetch("http://127.0.0.1:3000/filter-args/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const rawResponseText = await response.text();
//       const sanitizedResponseText = rawResponseText.replace(/NaN/g, "null");
//       const searchResults = JSON.parse(sanitizedResponseText);

//       // After the search query, fetch the updated course list
//       fetchCourses(currentPage);
//       setCourses(Array.isArray(searchResults) ? searchResults : []);
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//       setCourses([]);
//     }
//   };

//   const handleSearchByChange = (criteria: "title" | "tutor_name") => {
//     setSearchBy(criteria);
//   };

//   const handleFilterChange = (filterId: string, value: string[]) => {
//     setSelectedFilters((prev) => ({
//       ...prev,
//       [filterId]: value,
//     }));
//   };

//   const handleApplyFilters = async () => {
//     const filteredPayload = Object.fromEntries(
//       Object.entries(selectedFilters).filter(
//         ([_, value]) => Array.isArray(value) && value.length > 0
//       )
//     );

//     const payload = { filters: filteredPayload };

//     try {
//       console.log("Applying filters with payload:", payload); // Debugging
//       const response = await fetch("http://127.0.0.1:3000/filter-args/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });
//       const responseData = await response.json();
//       console.log("Response from backend:", responseData); // Log the backend response

//       if (response.ok) {
//         fetchCourses(currentPage); // Fetch updated courses with filters applied
//       } else {
//         console.error("Error in response:", responseData);
//         setCourses([]);
//       }
//     } catch (error) {
//       console.error("Error applying filters:", error);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage((prev) => prev + 1); // Go to the next page
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage((prev) => prev - 1); // Go to the previous page
//     }
//   };

//   // Handle page reload - send an empty JSON for reset
//   useEffect(() => {
//     const fetchEmpty = async () => {
//       try {
//         await fetch("http://127.0.0.1:3000/filter-args/", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({}),
//         });
//         fetchCourses(currentPage); // Refresh course list after sending empty filter request
//       } catch (error) {
//         console.error("Error sending empty filters on page reload:", error);
//       }
//     };

//     fetchEmpty(); // Automatically called on page load (refresh)
//   }, []); // Empty dependency array for one-time execution on component mount

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <FilterSidebar
//         filters={filters}
//         selectedFilters={selectedFilters}
//         onFilterChange={handleFilterChange}
//         onApplyFilters={handleApplyFilters}
//       />
//       <motion.div
//         className="w-full flex flex-col items-center p-4 ml-64 pt-20"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       >
//         <SearchBar
//           searchQuery={searchQuery}
//           searchBy={searchBy}
//           onSearchChange={handleSearchChange}
//           onSearchByChange={handleSearchByChange}
//         />
//         <div className="grid grid-cols-3 gap-4 mt-8">
//           {loading ? (
//             <p>Loading...</p>
//           ) : courses.length > 0 ? (
//             courses.map((course) => (
//               <CourseCard key={course.id} course={course} />
//             ))
//           ) : (
//             <p>No courses available</p>
//           )}
//         </div>
//         <div className="flex justify-between mt-4 w-full">
//           <button
//             onClick={handlePreviousPage}
//             disabled={currentPage === 1}
//             className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <span>
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             onClick={handleNextPage}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

//more updated
// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { CourseCard } from "../components/CourseCard";
// import { SearchBar } from "../components/SearchBar";
// import { FilterSidebar } from "../components/FilterSidebar";
// import { Course } from "../types";

// interface Filter {
//   id: string;
//   name: string;
//   options: string[];
// }

// export const Home: React.FC = () => {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [filters, setFilters] = useState<Filter[]>([]);
//   const [selectedFilters, setSelectedFilters] = useState<
//     Record<string, string[]>
//   >({});
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchBy, setSearchBy] = useState<"title" | "tutor_name">("title");
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1); // New state for current page
//   const [itemsPerPage, setItemsPerPage] = useState(10); // Items per page

//   // Reusable function to fetch courses with pagination
//   const fetchCourses = async (
//     page: number = currentPage,
//     itemsPerPage: number = 1000
//   ) => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `http://127.0.0.1:3000/filter-schema/?page=${page}&itemsPerPage=${itemsPerPage}`
//       );
//       const rawResponseText = await response.text();
//       const sanitizedText = rawResponseText.replace(/NaN/g, "null");
//       const data = JSON.parse(sanitizedText);
//       setCourses(Array.isArray(data) ? data.slice(0, itemsPerPage) : [data]);
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//       setCourses([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch filters on mount
//   useEffect(() => {
//     const fetchFilters = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:3000/unique-values/");
//         const data = await response.json();
//         const transformedFilters = Object.keys(data).map((key) => ({
//           id: key,
//           name: key.charAt(0).toUpperCase() + key.slice(1),
//           options: data[key],
//         }));
//         setFilters(transformedFilters);
//       } catch (error) {
//         console.error("Error fetching filters:", error);
//       }
//     };

//     fetchCourses(currentPage, itemsPerPage); // Fetch courses with pagination
//     fetchFilters(); // Fetch filters on mount
//   }, [currentPage, itemsPerPage]); // Fetch when currentPage or itemsPerPage changes

//   // Handle search input change
//   const handleSearchChange = async (query: string) => {
//     setSearchQuery(query);

//     const sanitizedFilters = Object.fromEntries(
//       Object.entries(selectedFilters).filter(
//         ([_, value]) => Array.isArray(value) && value.length > 0
//       )
//     );

//     const payload = {
//       [searchBy]: query.trim(),
//       ...sanitizedFilters,
//     };

//     try {
//       const response = await fetch("http://127.0.0.1:3000/filter-args/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const rawResponseText = await response.text();
//       const sanitizedResponseText = rawResponseText.replace(/NaN/g, "null");
//       const searchResults = JSON.parse(sanitizedResponseText);
//       console.log("Search results:", searchResults); // Debugging
//       fetchCourses(); // After search, fetch updated courses
//       setCourses(Array.isArray(searchResults) ? searchResults : []);
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//       setCourses([]);
//     }
//   };

//   const handleSearchByChange = (criteria: "title" | "tutor_name") => {
//     setSearchBy(criteria);
//   };

//   const handleFilterChange = (filterId: string, value: string[]) => {
//     setSelectedFilters((prev) => ({
//       ...prev,
//       [filterId]: value,
//     }));
//   };

//   const handleApplyFilters = async () => {
//     const filteredPayload = Object.fromEntries(
//       Object.entries(selectedFilters).filter(
//         ([_, value]) => Array.isArray(value) && value.length > 0
//       )
//     );

//     const payload = { filters: filteredPayload };

//     try {
//       console.log("Applying filters with payload:", payload);
//       const response = await fetch("http://127.0.0.1:3000/filter-args/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });
//       const responseData = await response.json();
//       console.log("Response from backend:", responseData); // Log the backend response
//       if (response.ok) {
//         fetchCourses(currentPage, itemsPerPage); // Fetch courses after applying filters
//       } else {
//         console.error("Error in response:", responseData);
//         setCourses([]);
//       }
//     } catch (error) {
//       console.error("Error applying filters:", error);
//     }
//   };

//   // Handle page reload - send an empty JSON for reset
//   useEffect(() => {
//     const fetchEmpty = async () => {
//       try {
//         await fetch("http://127.0.0.1:3000/filter-args/", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({}),
//         });
//         fetchCourses(currentPage, itemsPerPage); // Refresh course list after sending empty filter request
//       } catch (error) {
//         console.error("Error sending empty filters on page reload:", error);
//       }
//     };

//     fetchEmpty();
//   }, []); // Automatically fetch courses after component mounts

//   // Pagination functions
//   const goToNextPage = () => {
//     setCurrentPage((prevPage) => prevPage + 1);
//     fetchCourses(currentPage + 1, itemsPerPage);
//   };

//   const goToPreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage((prevPage) => prevPage - 1);
//       fetchCourses(currentPage - 1, itemsPerPage);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <FilterSidebar
//         filters={filters}
//         selectedFilters={selectedFilters}
//         onFilterChange={handleFilterChange}
//         onApplyFilters={handleApplyFilters}
//       />
//       <motion.div
//         className="w-full flex flex-col items-center p-4 ml-64 pt-20"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       >
//         <SearchBar
//           searchQuery={searchQuery}
//           searchBy={searchBy}
//           onSearchChange={handleSearchChange}
//           onSearchByChange={handleSearchByChange}
//         />
//         <div className="grid grid-cols-3 gap-4 mt-8">
//           {loading ? (
//             <p>Loading...</p>
//           ) : courses.length > 0 ? (
//             courses.map((course) => (
//               <CourseCard key={course.id} course={course} />
//             ))
//           ) : (
//             <p>No courses available</p>
//           )}
//         </div>

//         {/* Pagination Controls */}
//         <div className="flex justify-center items-center mt-4">
//           <button
//             onClick={goToPreviousPage}
//             disabled={currentPage === 1}
//             className="px-4 py-2 mr-2 bg-gray-300 rounded disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <span>Page {currentPage}</span>
//           <button
//             onClick={goToNextPage}
//             className="px-4 py-2 ml-2 bg-gray-300 rounded"
//           >
//             Next
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };
