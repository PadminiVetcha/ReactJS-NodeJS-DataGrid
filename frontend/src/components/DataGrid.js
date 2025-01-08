import { useEffect, useState } from 'react';
import './DataGrid.css';
import DataGridInfo from './DataGridInfo';

function DataGrid() {
  const [data, setData] = useState([]);
  const [filterValue, setFilterValue] = useState('Location');
  const [sortByColumn, setSortByColumn] = useState('location');
  const [sortingOrder, setSortingOrder] = useState('asc');

  useEffect(() => {
    const url = `http://localhost:3001/filterAndSort?siteInfo=${filterValue}&sortBy=${sortByColumn}&sortOrder=${sortingOrder}`;
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
  }, [filterValue, sortByColumn, sortingOrder]);

  console.log(data);
  return (
    <>
      <div className="dropdown">
        <label>Primary View | </label>
        <select
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        >
          <option value="Location" selected="selected">
            Location
          </option>
          <option value="Branch">Branch</option>
        </select>
      </div>
      <div className="DataGrid">
        <table>
          <thead>
            <tr>
              <th>Location</th>
              <th>
                Potential Revenue <br />
                <span className="small-font">Annualized</span>
              </th>
              <th>
                Competitior ProcessingVolume <br />
                <span className="small-font">Annualized</span>
              </th>
              <th>
                Competitior Merchant <br />
                <span className="small-font">Annualized</span>
              </th>
              <th>
                Revenue/Account <br />
                <span className="small-font">Annualized</span>
              </th>
              <th>
                Market Share <br />
                <span className="small-font">By Revenue</span>
              </th>
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
          </tbody>
        </table>
      </div>
    </>
  );
}
export default DataGrid;
