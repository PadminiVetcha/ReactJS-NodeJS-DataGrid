import { useState } from 'react';
import './DataGridInfo.css';

function DataGridInfo({ gridInfo }) {
  const [finalData, setFinalData] = useState(gridInfo);
  const [buttonClicked, setbuttonClicked] = useState(false);

  const currentList = buttonClicked ? finalData : gridInfo;

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

  //console.log(calculateTotals());
  const totals = calculateTotals();
  return (
    <>
      <tr className="total">
        <td>{gridInfo[0].siteInfo === 'Location' ? 'US' : 'Branch Name'}</td>
        <td>{totals.potentialRevenue.toLocaleString()}</td>
        <td>{totals.competitiorProcessingVolume.toLocaleString()}</td>
        <td>{totals.competitiorMerchant}</td>
        <td>{totals.revenueAccount}</td>
        <td>{totals.marketShareByRevenue}</td>
        <td>{totals.commercialDda.toLocaleString()}</td>
      </tr>
      {currentList.map((value, key) => {
        return (
          <tr key={key}>
            <td>{value.location}</td>
            <td>${value.potentialRevenue.toLocaleString()}</td>
            <td>${value.competitiorProcessingVolume.toLocaleString()}</td>
            <td>{value.competitiorMerchant}</td>
            <td>${value.revenueAccount.toLocaleString()}</td>
            <td>{value.marketShareByRevenue}%</td>
            <td>{value.commercialDda.toLocaleString()}</td>
            <button className="button" onClick={() => handleDelete(value.id)}>
              <span>&times;</span>
            </button>
          </tr>
        );
      })}
    </>
  );
}
export default DataGridInfo;
