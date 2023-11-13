import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://www.omdbapi.com/?s=${searchTerm}&apikey=a5ef1268`);
      setMovies(response.data.Search || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  return (
    <div>
      <h1>Search Your Movies</h1>
      <input
        type='search'
        placeholder='Search movie'
        className='search'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={fetchData}>Search</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {movies.map((item) => (
            <Card key={item.imdbID} style={{ width: '18rem' }}>
              <Card.Img variant="top" src={item.Poster} />
              <Card.Body>
                <Card.Title>{item.Title}</Card.Title>
                <Card.Text>{item.Type}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;


