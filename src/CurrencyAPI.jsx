import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CurrencyConverterAPI = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get("https://api.frankfurter.app/currencies");
        setCurrencies(Object.keys(response.data));
      } catch (error) {
        setError("Failed to load currencies. Please try again.");
      }
    };
    fetchCurrencies();
  }, []);

  useEffect(() => {
    if (amount > 0) convertCurrency(); 
  }, [fromCurrency, toCurrency, amount]);

  const convertCurrency = async () => {
    if (fromCurrency === toCurrency) {
      setConvertedAmount(amount);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      setConvertedAmount(response.data.rates[toCurrency]);
    } catch (error) {
      setError("Conversion failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
          .converter-container {
            max-width: 400px;
            margin: auto;
            padding: 30px;
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #f9f9f9;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
          }

          h2 {
            margin-bottom: 15px;
          }

          .input-group {
            margin-bottom: 15px;
            text-align: left;
          }

          label {
            font-weight: bold;
          }

          select, input {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
          }

          .convert-btn {
            background-color: #ff9224;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            width: 100%;
            margin-top: 10px;
          }

          .convert-btn:hover {
            background-color: #ca6512;
          }

          .convert-btn:disabled {
            background-color: #b3b3b3;
            cursor: not-allowed;
          }

          .result {
            margin-top: 20px;
            font-size: 18px;
            font-weight: bold;
          }

          .error {
            color: red;
            font-weight: bold;
            margin-bottom: 10px;
          }

          .home-link {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            font-size: 1.2rem;
            background-color: #4caf50;
            color: white;
            text-decoration: none;
            border-radius: 25px;
          }
        `}
      </style>

      <div className="converter-container">
        <h2>Currency Converter</h2>

        {error && <p className="error">{error}</p>}

        <div className="input-group">
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            min="1"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>From:</label>
          <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>To:</label>
          <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <button className="convert-btn" onClick={convertCurrency} disabled={loading}>
          {loading ? "Converting..." : "Convert"}
        </button>

        {convertedAmount !== null && (
          <p className="result">
            {amount} {fromCurrency} = <strong>{convertedAmount.toFixed(2)}</strong> {toCurrency}
          </p>
        )}

        <div>
          <Link to="/" className="home-link">Back to Home</Link>
        </div>
      </div>
    </>
  );
};

export default CurrencyConverterAPI;
