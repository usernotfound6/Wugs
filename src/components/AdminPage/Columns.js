import React from "react";


const Columns = () => {

  return [
    {
      field: "business_name",
      headerName: (
        <div style={{ color: "beige" }}>Business Name</div>
      ),
      width: 170,
      renderCell: (params) => (
        <div style={{ color: "beige" }}>{params.value}</div>
      ),
    },
    {
      field: "address_city",
      headerName: (
        <div style={{ color: "beige" }}>City</div>
      ),
      width: 120,
      renderCell: (params) => (
        <div style={{ color: "beige" }}>{params.value}</div>
      ),
    },
    {
      field: "address_state",
      headerName: (
        <div style={{ color: "beige" }}>State</div>
      ),
      width: 80,
      renderCell: (params) => (
        <div style={{ color: "beige" }}>{params.value}</div>
      ),
    },
    {
      field: "address_zip",
      headerName: (
        <div style={{ color: "beige" }}>Zip Code</div>
      ),
      width: 100,
      renderCell: (params) => (
        <div style={{ color: "beige" }}>{params.value}</div>
      ),
    },
    {
      field: "first_name",
      headerName: (
        <div style={{ color: "beige" }}>First Name</div>
      ),
      width: 110,
      renderCell: (params) => (
        <div style={{ color: "beige" }}>{params.value}</div>
      ),
    },
    {
      field: "last_name",
      headerName: (
        <div style={{ color: "beige" }}>Last Name</div>
      ),
      width: 110,
      renderCell: (params) => (
        <div style={{ color: "beige" }}>{params.value}</div>
      ),
    },
    {
      field: "status_name",
      headerName: (
        <div style={{ color: "beige" }}>Status</div>
      ),
      width: 180,
      renderCell: (params) => (
        <div style={{ color: "beige" }}>{params.value}</div>
      ),
    },
    {
      field: "last_active",
      headerName: (
        <div style={{ color: "beige" }}>Last Active</div>
      ),
      width: 160,
      renderCell: (params) => (
        <div style={{ color: "beige" }}>{params.value}</div>
      ),
    },
  ];
};

export default Columns