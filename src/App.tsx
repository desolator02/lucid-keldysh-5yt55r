import React, { useState, useEffect } from 'react';
import { LineChart, XAxis, YAxis, Line, CartesianGrid, Tooltip } from 'recharts';
import { Search } from 'lucide-react';

interface StockData {
  CH_TRADE_DT: string;
  OPEN: number;
  HIGH: number;
  LOW: number;
  CLOSE: number;
}


const StockMarketAnalysisApp = () => {
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [searchTerm, setSearchTerm] = useState('JIOFIN');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        var url = `https://www.nseindia.com/api/historical/cm/equity?symbol=${searchTerm}` ;
        console.log ('### url : ' + url)
        const response = await fetch(`https://www.nseindia.com/api/historical/cm/equity?symbol=${searchTerm}`,
          {method : 'get',
          headers: new Headers({
            'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:132.0) Gecko/20100101 Firefox/132.0',
            'Sec-Fetch-Mode' : 'cors',
            'Access-Control-Allow-Origin' : '*'
          })}
        );
        const data = await response.json();
        setStockData(data.data);
      } catch (error) {
        setError('Failed to fetch stock data : ' + error);
      }
    };
    fetchStockData();
  }, [searchTerm]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchTerm(event.currentTarget.searchTerm.value);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <form onSubmit={handleSearch} className="flex items-center mb-4">
        <input
          type="text"
          name="searchTerm"
          placeholder="Search stock symbol"
          className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        <button type="submit" className="ml-2 p-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100">
          <Search className="w-4 h-4" />
        </button>
      </form>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <LineChart width={800} height={400} data={stockData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="CH_TRADE_DT" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="CLOSE" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      )}
    </div>
  );
};

export default StockMarketAnalysisApp;