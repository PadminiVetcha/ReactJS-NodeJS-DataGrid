import { useEffect, useState } from 'react';
import './DataGrid.css';
import DataGridInfo from './DataGridInfo';

function DataGrid() {
  const [data, setData] = useState([]);

  // fetch call to get the grid data
  useEffect(() => {
    const url =
      'http://localhost:3001/filterAndSort?siteInfo=Location&sortBy=location&sortOrder=asc';
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('API failed');
        }
        return response.json();
      })
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  console.log(data);
  return (
    <div className="DataGrid">
      <table>
        <thead>
          <tr>
            <th>Location</th>
            <th>Potential Revenue Annualized</th>
            <th>competitior ProcessingVolume Annualized</th>
            <th>competitior Merchant Annualized</th>
            <th>Revenue/Account Annualized</th>
            <th>Market Share Annualized</th>
            <th>Commercial DDA's</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            <DataGridInfo gridInfo={data} />
          ) : (
            <p>No data available</p>
          )}
          {/* {data.length > 0 ? (
            data.map((value, key) => {
              const formattedPotentialRevenue =
                value.potentialRevenue.toLocaleString();
              const formattedCompetitiorProcessing =
                value.competitiorProcessingVolume.toLocaleString();
              const formattedRevenueAccount =
                value.revenueAccount.toLocaleString();
              const formattedCommercialDda =
                value.commercialDda.toLocaleString();
              return (
                <tr key={key}>
                  <td>{value.location}</td>
                  <td>${formattedPotentialRevenue}</td>
                  <td>${formattedCompetitiorProcessing}</td>
                  <td>{value.competitiorMerchant}</td>
                  <td>${formattedRevenueAccount}</td>
                  <td>{value.marketShareByRevenue}%</td>
                  <td>{formattedCommercialDda}</td>
                  <button>Button</button>
                </tr>
              );
            })
          ) : (
            <li>No data available</li>
          )} */}
        </tbody>
      </table>
    </div>
  );
}
export default DataGrid;
