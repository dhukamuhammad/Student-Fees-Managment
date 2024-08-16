import React, { useState } from "react";

// Sample data to search
const sampleData = [
  { id: 1, name: "John Doe", course: "Mathematics" },
  { id: 2, name: "Jane Smith", course: "Science" },
  { id: 3, name: "Sam Johnson", course: "History" },
  { id: 4, name: "Alice Brown", course: "English" },
];

function SearchComponent() {
  // State variables
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(sampleData);

   const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter data based on the search query
    const filtered = sampleData.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.course.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredData(filtered);
  };

  // Handler for item click
  const handleItemClick = (name) => {
    setSearchQuery(name);

    // Optionally, you can filter data based on the clicked name
    const filtered = sampleData.filter(
      (item) =>
        item.name.toLowerCase().includes(name.toLowerCase()) ||
        item.course.toLowerCase().includes(name.toLowerCase())
    );

    setFilteredData(filtered);
  };

  return (
    <div>
      <h1>Search Data</h1>
      <input
        type="text"
        placeholder="Search by name or course"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <ul>
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <li key={item.id} onClick={() => handleItemClick(item.name)}>
              <div>
                {item.name} - {item.course}
              </div>
            </li>
          ))
        ) : (
          <li>No results found</li>
        )}
      </ul>
    </div>
  );
}

export default SearchComponent;
