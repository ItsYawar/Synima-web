import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';


const columns = [
    { field: "studentId", headerName: "Student ID", width: 100 },
    { field: "studentName", headerName: "Student Name", width: 200 },
    {
      field: "IsActive",
      headerName: "Active Status",
      width: 150,
      valueGetter: (params) => (params?.row?.isActive ? "Active" : "Inactive"),
    },
  ];
  
  const paginationModel = { page: 0, pageSize: 5 };


const UserList = () => {
    const [rows, setRows] = React.useState([]); // State to store API data
    const [loading, setLoading] = useState(true); // State for loading

    React.useEffect(() => {
        // Fetch data from API
        const fetchData = async () => {
          try {
            const response = await axios.get("http://localhost:5000/api/StudentAPI"); // API URL
            setRows(response.data); // Assuming the API response matches the row structure
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
    <DataGrid
      rows={rows}
      columns={columns}
      getRowId={(row) => row.studentId} // Use studentId as the unique row identifier
      pageSizeOptions={[5, 10]}
      loading={loading}
      checkboxSelection
      sx={{ border: 0 }}
    />
  </Paper>
  )
}

export default UserList
