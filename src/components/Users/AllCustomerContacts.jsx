import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { ThemeProvider } from "@emotion/react";
import themeOverrides from "../theme";

const AllCustomerContacts = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5041/api/Contacts/GetAllContacts");
        const groupedData = {};
        response.data.forEach((item) => {
          const customerId = item.customerId;
          if (!groupedData[customerId]) {
            groupedData[customerId] = {
              id: customerId,
              name: "",
              mobile: "",
              country: "",
            };
          }

          if (item.contactKey === "Customer Name") {
            groupedData[customerId].name = item.contactValue;
          } else if (item.contactKey === "Mobile") {
            groupedData[customerId].mobile = item.contactValue;
          } else if (item.contactKey === "Country") {
            groupedData[customerId].country = item.contactValue;
          }
        });

        setRows(Object.values(groupedData));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id) => console.log("Edit clicked for:", id);
  const handleView = (id) => console.log("View clicked for:", id);
  const handleDelete = (id) => console.log("Delete clicked for:", id);

  const columns = [
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    { field: "mobile", headerName: "Mobile", flex: 1, minWidth: 120 },
    { field: "country", headerName: "Country", flex: 1, minWidth: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 160,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton color="primary" onClick={() => handleView(params.row.id)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton color="secondary" onClick={() => handleEdit(params.row.id)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <ThemeProvider theme={themeOverrides}>
      <Box sx={{ width: "100%", height: "100vh", padding: 2 }}>
        <Paper sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
          <Box sx={{ width: "100%", height: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(row) => row.id}
              loading={loading}
              checkboxSelection
              autoPageSize
              sx={{ height: "100%" }}
            />
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default AllCustomerContacts;