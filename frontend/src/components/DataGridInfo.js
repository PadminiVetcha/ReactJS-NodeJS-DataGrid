import { useState } from 'react';
import './DataGridInfo.css';
//import TotalGridData from './TotalGridData';

function DataGridInfo({ gridInfo }) {
  const [finalData, setFinalData] = useState(gridInfo);
  const [buttonClicked, setbuttonClicked] = useState(false);

  const currentList = buttonClicked ? finalData : gridInfo;

  const calculatePercentage = (currentValue, totalValue) => {
    return ((currentValue / totalValue) * 100).toFixed(2);
  };
  // to calculate total values
  const calculateTotals = () => {
    return gridInfo.reduce(
      (totals, row) => {
        totals.potentialRevenue += row.potentialRevenue;
        totals.competitiorProcessingVolume += row.competitiorProcessingVolume;
        totals.competitiorMerchant += row.competitiorMerchant;
        totals.revenueAccount += row.revenueAccount;
        totals.marketShareByRevenue += row.marketShareByRevenue;
        totals.commercialDda += row.commercialDda;
        return totals;
      },
      {
        potentialRevenue: 0,
        competitiorProcessingVolume: 0,
        competitiorMerchant: 0,
        revenueAccount: 0,
        marketShareByRevenue: 0,
        commercialDda: 0,
      }
    );
  };

  const handleDelete = (id) => {
    console.log(id);
    setbuttonClicked(true);
    const url = 'http://localhost:3001/delete/' + id;
    fetch(url, { method: 'DELETE' })
      .then((response) => {
        if (response.ok) {
          if (buttonClicked) {
            setFinalData((prevData) =>
              prevData.filter((item) => item.id !== id)
            );
          }
          alert('Record deleted successfully');
        } else {
          alert('Failed to delete the record');
        }
      })
      .catch((error) => {
        console.error('Error deleting record:', error);
        alert('Error deleting item');
      });
    setbuttonClicked(false);
  };
  const formatNumber = (num) => {
    const units = ['K', 'M', 'B', 'T']; // Thousands, Millions, Billions, Trillions
    let unitIndex = -1;
    let formattedNum = num;
    while (formattedNum >= 1000 && unitIndex < units.length - 1) {
      formattedNum /= 1000;
      unitIndex++;
    }
    return `${formattedNum.toFixed(2)}${units[unitIndex] || ''}`;
  };

  const totals = calculateTotals();
  return (
    <>
      <tr className="total">
        <td>{gridInfo[0].siteInfo === 'Location' ? 'US' : 'Branch Name'}</td>
        <td>
          ${formatNumber(totals.potentialRevenue).toLocaleString()} (100%)
        </td>
        <td>
          ${formatNumber(totals.competitiorProcessingVolume).toLocaleString()}
          (100%)
        </td>
        <td>{totals.competitiorMerchant}</td>
        <td>${formatNumber(totals.revenueAccount)}</td>
        <td>{Math.round(totals.marketShareByRevenue)}%</td>
        <td>{totals.commercialDda.toLocaleString()}</td>
      </tr>
      {currentList.map((value, key) => {
        return (
          <tr key={key}>
            <td>{value.location}</td>
            <td>
              ${value.potentialRevenue.toLocaleString()} (
              {calculatePercentage(
                value.potentialRevenue,
                totals.potentialRevenue
              )}
              %)
            </td>
            <td>
              ${value.competitiorProcessingVolume.toLocaleString()} (
              {calculatePercentage(
                value.competitiorProcessingVolume,
                totals.competitiorProcessingVolume
              )}
              %)
            </td>
            <td>{value.competitiorMerchant}</td>
            <td>${value.revenueAccount.toLocaleString()}</td>
            <td>{value.marketShareByRevenue}%</td>
            <td>{value.commercialDda.toLocaleString()}</td>
            <td>
              <button className="button" onClick={() => handleDelete(value.id)}>
                <span>&times;</span>
              </button>
            </td>
          </tr>
        );
      })}
    </>
  );
}
export default DataGridInfo;
