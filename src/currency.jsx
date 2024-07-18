import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CurrencyList = () => {
  const [currencies, setCurrencies] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  const fetchCurrencies = async (url) => {
    const response = await axios.get(url);
    if (response.status === 200) {
      setCurrencies(response.data);
      setError(null);
    } else {
      setError('Error fetching currency data');
    }
  };

  useEffect(() => {
    fetchCurrencies('https://freetestapi.com/api/v1/currencies');
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    fetchCurrencies(`https://freetestapi.com/api/v1/currencies?search=${query}`);
  };

  return (
    <div className="currency-container">
      <h1 className="currency-header">Currency List</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search currency"
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      {error && <div className="error">{error}</div>}
      {!currencies.length && !error && <div className="loading">Loading...</div>}
      {currencies && (
        <div className="currency-list">
          {currencies.map((currency) => (
            <div key={currency.id} className="currency-item">
              <h2><Link to={`/cdetails/${currency.id}`}>{currency.name}</Link></h2>
              <p><strong>Code:</strong> {currency.code}</p>
              <p><strong>Symbol:</strong> {currency.symbol}</p>
              <p><strong>Rate:</strong> {currency.rate}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencyList;
