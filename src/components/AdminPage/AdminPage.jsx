import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";


function AdminPage() {
  const dispatch = useDispatch();

  
  const admin = useSelector((store) => store.admin);
  console.log("In Admin page", admin);

  const columns = [
    {
      field: "id",
      headerName: (
        <div style={{ color: "#ffebb4" }}>ID</div>
      ),
      width: 70,
      renderCell: (params) => (
        <div style={{ color: "#ffebb4" }}>{params.value}</div>
      ),
    },
    {
      field: "business_name",
      headerName: (
        <div style={{ color: "#ffebb4" }}>Business Name</div>
      ),
      width: 130,
      renderCell: (params) => (
        <div style={{ color: "#ffebb4" }}>{params.value}</div>
      ),
    },
    {
      field: "address",
      headerName: (
        <div style={{ color: "#ffebb4" }}>Address</div>
      ),
      width: 130,
      renderCell: (params) => (
        <div style={{ color: "#ffebb4" }}>{params.value}</div>
      ),
    },
    {
      field: "website",
      headerName: (
        <div style={{ color: "#ffebb4" }}>Website</div>
      ),
      width: 90,
      renderCell: (params) => (
        <div style={{ color: "#ffebb4" }}>{params.value}</div>
      ),
    },
    {
      field: "manager_id",
      headerName: (
        <div style={{ color: "#ffebb4" }}>Manager ID</div>
      ),
      width: 130,
      renderCell: (params) => (
        <div style={{ color: "#ffebb4" }}>{params.value}</div>
      ),
    },
    {
      field: "phone",
      headerName: (
        <div style={{ color: "#ffebb4" }}>Phone #</div>
      ),
      width: 130,
      renderCell: (params) => (
        <div style={{ color: "#ffebb4" }}>{params.value}</div>
      ),
    },
    {
      field: "hours_of_operation",
      headerName: (
        <div style={{ color: "#ffebb4" }}>Hours of Operation</div>
      ),
      width: 130,
      renderCell: (params) => (
        <div style={{ color: "#ffebb4" }}>{params.value}</div>
      ),
    },
    {
      field: "micromarket_location",
      headerName: (
        <div style={{ color: "#ffebb4" }}>Market Location</div>
      ),
      width: 130,
      renderCell: (params) => (
        <div style={{ color: "#ffebb4" }}>{params.value}</div>
      ),
    },
    {
      field: "neighborhood_info",
      headerName: (
        <div style={{ color: "#ffebb4" }}>Neighborhood Info</div>
      ),
      width: 130,
      renderCell: (params) => (
        <div style={{ color: "#ffebb4" }}>{params.value}</div>
      ),
    },
    {
      field: "demographics",
      headerName: (
        <div style={{ color: "#ffebb4" }}>Demographics</div>
      ),
      width: 130,
      renderCell: (params) => (
        <div style={{ color: "#ffebb4" }}>{params.value}</div>
      ),
    },
    {
      field: "number_of_people",
      headerName: (
        <div style={{ color: "#ffebb4" }}># of people</div>
      ),
      width: 130,
      renderCell: (params) => (
        <div style={{ color: "#ffebb4" }}>{params.value}</div>
      ),
    },
    {
      field: "target_age_group",
      headerName: (
        <div style={{ color: "#ffebb4" }}>Age Group</div>
      ),
      width: 130,
      renderCell: (params) => (
        <div style={{ color: "#ffebb4" }}>{params.value}</div>
      ),
    },
    {
      field: "industry",
      headerName: (
        <div style={{ color: "#ffebb4" }}>Industry</div>
      ),
      width: 130,
      renderCell: (params) => (
        <div style={{ color: "#ffebb4" }}>{params.value}</div>
      ),
    },
    {
      field: "pictures",
      headerName: (
        <div style={{ color: "#ffebb4" }}>Pictures</div>
      ),
      width: 130,
      renderCell: (params) => (
        <div style={{ color: "#ffebb4" }}>{params.value}</div>
      ),
    },
    {
      field: "dimensions",
      headerName: (
        <div style={{ color: "#ffebb4" }}>Dimensions</div>
      ),
      width: 130,
      renderCell: (params) => (
        <div style={{ color: "#ffebb4" }}>{params.value}</div>
      ),
    },
    {
      field: "wugs_visit",
      headerName: (
        <div style={{ color: "#ffebb4" }}>Wugs Visit</div>
      ),
      width: 130,
      renderCell: (params) => (
        <div style={{ color: "#ffebb4" }}>{params.value}</div>
      ),
    },
    {
      field: "contract",
      headerName: (
        <div style={{ color: "#ffebb4" }}>Contract</div>
      ),
      width: 130,
      renderCell: (params) => (
        <div style={{ color: "#ffebb4" }}>{params.value}</div>
      ),
    },
    {
      field: "admin_notes",
      headerName: (
        <div style={{ color: "#ffebb4" }}>Admin Notes</div>
      ),
      width: 130,
      renderCell: (params) => (
        <div style={{ color: "#ffebb4" }}>{params.value}</div>
      ),
    },
    {
      field: "status_id",
      headerName: (
        <div style={{ color: "#ffebb4" }}>Status</div>
      ),
      width: 130,
      renderCell: (params) => (
        <div style={{ color: "#ffebb4" }}>{params.value}</div>
      ),
    },
  ];

  const rows = admin?.map((client) => ({
    id: client.id,
    business_name: client.business_name,
    address: client.address,
    website: client.website,
    manager_id: client.manager_id,
    phone: client.phone,
    hours_of_operation: client.hours_of_operation,
    micromarket_location: client.micromarket_location,
    neighborhood_info: client.neighborhood_info,
    demographics: client.demographics,
    number_of_people: client.number_of_people,
    target_age_group: client.target_age_group,
    industry: client.industry,
    pictures: client.pictures,
    dimensions: client.dimensions,
    wugs_visit: client.wugs_visit,
    contract: client.contract,
    admin_notes: client.admin_notes,
    status_id: client.status_id,
  }));

  return (
    <div style={{ height: 400, width: "100%" }}>
      {admin?.length > 0 ? (
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default AdminPage;
