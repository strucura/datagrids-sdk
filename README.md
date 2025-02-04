# DataGrids SDK

The DataGrids SDK is a package for integrating with your frontend datagrids package of choice.  It provides a simple 
interface for performing all fetching of row data that is necessary for your datagrid to display data while 
protecting your frontend from the complexities of managing the data fetching process.

## Installation

Add the datagrids package to your Laravel application using composer:

```bash
composer require strucura/datagrids
```

Install the datagrids SDK package in your frontend application:

```bash
npm install @strucura/datagrids-sdk
```

## Usage

```typescript
import { fetchDataGridRows } from '@strucura/datagrids-sdk';

interface UserDataGrid {
    id: number;
    name: string;
    age: number;
    created_at: string;
    updated_at: string;
}

const url = 'https://example.com/api/data-grid';
const headers = {
    Authorization: 'Bearer your-token',
};

fetchDataGridRows<UserDataGrid>(url, dataGridBuilder => dataGridBuilder
    .addFilterSet(filterBuilder => {
        filterBuilder.contains('name', 'John');
    })
    .addSort('created_at', SortDirection.DESC)
    .firstRow(0)
    .lastRow(50)
).then((rows) => {
    console.log(rows);
}).catch((error) => {
    console.log(error);
})
```
