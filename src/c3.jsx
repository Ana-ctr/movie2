import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CurrencyDetails = () => {
  const { id } = useParams();
  const [currency, setCurrency] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrencyDetails = async () => {
      const response = await axios.get(`https://freetestapi.com/api/v1/currencies/${id}`);
      if (response.status === 200) {
        setCurrency(response.data);
        setError(null);
      } else {
        setError('Error fetching currency details');
      }
    };

    fetchCurrencyDetails();
  }, [id]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!currency) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="currency-details-container">
      <h1>{currency.name}</h1>
      <img src={currency.image} alt={`${currency.name} flag`} />
      <p><strong>ID:</strong> {currency.id}</p>
      <p><strong>Code:</strong> {currency.code}</p>
      <p><strong>Symbol:</strong> {currency.symbol}</p>
      <p><strong>Exchange Rate:</strong> {currency.exchange_rate}</p>
      <p><strong>Description:</strong> {currency.description}</p>
      <h3>Countries:</h3>
      <ul>
        {currency.countries.map((country, index) => (
          <li key={index}>{country}</li>
        ))}
      </ul>
      <h3>Subunits:</h3>
      <ul>
        {currency.subunits.map((subunit, index) => (
          <li key={index}>{subunit}</li>
        ))}
      </ul>
    </div>
  );
};

export default CurrencyDetails;
