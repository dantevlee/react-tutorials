import { useState } from "react";

const Search = ({ search }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    search(searchQuery);
  };

  return (
    <div className="mb-4 d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit}>
        <div className="d-flex">
          <input
            className="form-control mr-2"
            onChange={(e) => setSearchQuery(e.target.value)}
            type="Text"
            placeholder="Search Country Name.. "
            style={{ width: "500px" }}
          />
          <button className="btn btn-primary">Search</button>
        </div>
      </form>
    </div>
  );
};

export default Search;
