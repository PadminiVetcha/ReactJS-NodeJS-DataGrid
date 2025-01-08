const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const port = 3001;

const siteInfoData = [
  {
    id: 1,
    siteInfo: 'Location',
    location: 'Colorado',
    potentialRevenue: 624596,
    competitiorProcessingVolume: 52049666,
    competitiorMerchant: 195,
    revenueAccount: 3203,
    marketShareByRevenue: 33.33,
    commercialDda: 220,
    locationId: 0,
  },
  {
    id: 2,
    siteInfo: 'Location',
    location: 'Florida',
    potentialRevenue: 600628,
    competitiorProcessingVolume: 52049666,
    competitiorMerchant: 195,
    revenueAccount: 3203,
    marketShareByRevenue: 33.33,
    commercialDda: 220,
    locationId: 0,
  },
  {
    id: 3,
    siteInfo: 'Location',
    location: 'Mississipi',
    potentialRevenue: 660596,
    competitiorProcessingVolume: 1385666,
    competitiorMerchant: 198,
    revenueAccount: 3114,
    marketShareByRevenue: 33.33,
    commercialDda: 792,
    locationId: 0,
  },
  {
    id: 4,
    siteInfo: 'Branch',
    location: 'Branch 1',
    potentialRevenue: 878269,
    competitiorProcessingVolume: 73189083,
    competitiorMerchant: 287,
    revenueAccount: 3060,
    marketShareByRevenue: 33.33,
    commercialDda: 1148,
    locationId: 1,
  },
  {
    id: 5,
    siteInfo: 'Branch',
    location: 'Branch 2',
    potentialRevenue: 822775,
    competitiorProcessingVolume: 68564583,
    competitiorMerchant: 257,
    revenueAccount: 3201,
    marketShareByRevenue: 33.33,
    commercialDda: 1028,
    locationId: 2,
  },
  {
    id: 6,
    siteInfo: 'Branch',
    location: 'Branch 3',
    potentialRevenue: 817009,
    competitiorProcessingVolume: 68084083,
    competitiorMerchant: 252,
    revenueAccount: 3242,
    marketShareByRevenue: 33.33,
    commercialDda: 1008,
    locationId: 3,
  },
];
/**
 *
 * @param {*} siteInfoArray  input data
 * @param {*} column column based on which sorting needs to be done
 * @param {*} order sorting order, by default it is asc
 * @returns array of site info after applying filtering and sorting
 */
function customSort(siteInfoArray, column, order) {
  return siteInfoArray.sort((a, b) => {
    const valueA = a[column];
    const valueB = b[column];
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return order === 'desc'
        ? valueB.toLowerCase().localeCompare(valueA.toLowerCase())
        : valueA.toLowerCase().localeCompare(valueB.toLowerCase());
    } else {
      return order === 'desc' ? valueB - valueA : valueA - valueB;
    }
  });
}

/**
 * api endpoint for sorting and filtering of data
 */
app.get('/filterAndSort', (req, res) => {
  const { siteInfo, sortBy, sortOrder = 'asc' } = req.query;
  console.log(siteInfo, sortBy, sortOrder);
  if (!siteInfo) {
    return res.status(400).json({ error: 'Missing siteInfo parameter' });
  }
  const filteredData = siteInfoData.filter(
    (item) => item.siteInfo === siteInfo
  );
  if (sortBy) {
    const sortedData = customSort(filteredData, sortBy, sortOrder);
    return res.json(sortedData);
  }
  res.json(filteredData);
});

app.get('/getBranchData/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!id) {
    return res.status(400).json({ error: 'Missing id parameter' });
  }
  const filteredData = siteInfoData.filter(
    (item) => item.locationId === Number(id)
  );
  console.log(filteredData);
  res.json(filteredData);
});

/**
 * api endpoint to delete the data with id mentioned
 *  */
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const index = siteInfoData.findIndex((item) => item.id === parseInt(id));
  if (index !== -1) {
    siteInfoData.splice(index, 1);
    res
      .status(200)
      .send({ message: `Record with id ${id} deleted successfully` });
  } else {
    res.status(404).send({ message: `Record with id ${id} not found` });
  }
});

app.listen(port, () => {
  console.log('Server started');
});
