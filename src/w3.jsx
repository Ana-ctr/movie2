import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CurrencyList1 = () => {
  const [currencies, setCurrencies] = useState([]);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState('asc');

  const fetchCurrencies = async (order) => {
    const url = `https://freetestapi.com/api/v1/currencies?limit=5&sort=name&order=${order}`;
    const response = await axios.get(url);
    if (response.status === 200) {
      setCurrencies(response.data);
      setError(null);
    } else {
      setError('Error fetching currency data');
    }
  };

  useEffect(() => {
    fetchCurrencies(order);
  }, [order]);

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  };

  return (
    <div className="currency-container">
      <h1 className="currency-header">Currency List</h1>
      <div className="sort-options">
        <label htmlFor="order">Sort by Name:</label>
        <select id="order" value={order} onChange={handleOrderChange}>
          <option value="asc">Ascending</option>
          <option value="dec">Descending</option>
        </select>
      </div>
      {error && <div className="error">{error}</div>}
      {!currencies.length && !error && <div className="loading">Loading...</div>}
      {currencies && (
        <div className="currency-list">
          {currencies.map((currency) => (
            <div key={currency.id} className="currency-item">
              <h2><Link to={`/cdetails/${currency.id}`}>{currency.name}</Link></h2>
              <p><strong>Code:</strong> {currency.code}</p>
              <p><strong>Symbol:</strong> {currency.symbol}</p>
              <p><strong>Exchange Rate:</strong> {currency.exchange_rate}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencyList1;
