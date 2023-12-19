import { useState } from "react";
import axios from "axios";
import Result from "./Result";
import { Fragment } from "react";

const Search = () => {
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(true);

  const searchResponse = async (e) => {
    e.preventDefault();
    setResults([])
    if(!searchQuery) {
      return;
    }
    setResponse(true)
    setLoading(true)
    await axios
      .get(`https://swapi.dev/api/people/?search=${searchQuery}`)
      .then((res) =>{
        setAttributes(res.data.results);
      });
  };

  const setAttributes = async (characters) => {
    for (const character of characters) {
      character.homeworld = await getHomeWorld(character.homeworld);
      character.species = await getSpecies(character.species)
    }
    setResults(characters)
    setLoading(false)
    if (characters.length === 0) {
      setResponse(false)
    } 
    if (characters.length > 0) {
      setResponse(true)
    }
  }

  const getHomeWorld = async (homeworld) => {
    const response = await axios.get(homeworld);
    return response.data.name
  }

  const getSpecies = async (species) => {
    const response = await axios.get(species);
    if (!response.data.name) {
      return 'Human';
    }
    return response.data.name
  }

  return (
    <Fragment>
      <form onSubmit={searchResponse}>
      <div className="input-group mb-3">
        <input
          className="form-control"
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Character.."
          type="text"
        />
        <button className="btn btn-primary">Search</button>
        </div>
      </form>
      {!response && <p>No Results</p>}
      {loading && <p>Searching..</p>}
      { results.length > 0 && <Result character={results} />}
    </Fragment>
  );
};

export default Search;
