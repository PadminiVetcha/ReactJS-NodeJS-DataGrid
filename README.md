# ReactJS-NodeJS-DataGrid

A project with Node JS and React JS

Backend api's run on port 3001 and frontend port run on 3000

# Backend API

# 1. To filter and sort the grid data

Endpoint : /filterAndSort?siteInfo=Location&sortBy=location&sortOrder=asc

Method: GET

Possible Values for sortOrder is asc (default), desc

Possible Values for siteInfo is Location or Branch

Possible values for sortBy is any of the column names

Output:

```json
[
  {
    "id": 1,
    "siteInfo": "Location",
    "location": "Colorado",
    "potentialRevenue": 624596,
    "competitiorProcessingVolume": 52049666,
    "competitiorMerchant": 195,
    "revenueAccount": 3203,
    "marketShareByRevenue": 33.33,
    "commercialDda": 220,
    "branchId": 4
  },
  {
    "id": 2,
    "siteInfo": "Location",
    "location": "Florida",
    "potentialRevenue": 600628,
    "competitiorProcessingVolume": 52049666,
    "competitiorMerchant": 195,
    "revenueAccount": 3203,
    "marketShareByRevenue": 33.33,
    "commercialDda": 220,
    "branchId": 5
  },
  {
    "id": 3,
    "siteInfo": "Location",
    "location": "Mississipi",
    "potentialRevenue": 660596,
    "competitiorProcessingVolume": 1385666,
    "competitiorMerchant": 198,
    "revenueAccount": 3114,
    "marketShareByRevenue": 33.33,
    "commercialDda": 792,
    "branchId": 6
  }
]
```

# 2. To delete the data

Endpoint : /delete/:id

Method: DELETE

Possible Values for id is the id of the record.

Output:

```json
{
  "message": "Record with id 1 deleted successfully"
}
```

# 3. To fetch branch data from locations

Endpoint : /getBranchData/:locationId

Method: GET

Output:

```json
[
  [
    {
      "id": 4,
      "siteInfo": "Branch",
      "location": "Branch 1",
      "potentialRevenue": 878269,
      "competitiorProcessingVolume": 73189083,
      "competitiorMerchant": 287,
      "revenueAccount": 3060,
      "marketShareByRevenue": 33.33,
      "commercialDda": 1148,
      "locationId": 1
    }
  ]
]
```

# Frontend Functionalities

1. Dropdown of Location and Branch are implemented.
2. Total value of data is being calculated.

3. Data is getting deleted after clicking on cross(X) button, but page needs to be refreshed to get the updated data.

4. Once data is deleted, the total values are being calculated dynamically
