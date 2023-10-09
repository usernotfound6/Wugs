import React from "react";

const InterestedColumns = () => {
  return [
    {
      field: "id",
      headerName: <div style={{ color: "black" }}>ID</div>,
      width: 200,
      renderCell: (params) => (
        <div style={{ color: "black" }}>{params.value}</div>
      ),
    },
    {
      field: "name",
      headerName: <div style={{ color: "black" }}>Name</div>,
      width: 200,
      renderCell: (params) => (
        <div style={{ color: "black" }}>{params.value}</div>
      ),
    },
    {
      field: "email",
      headerName: <div style={{ color: "black" }}>Email</div>,
      width: 200,
      renderCell: (params) => (
        <div style={{ color: "black" }}>{params.value}</div>
      ),
    },
    {
      field: "phone_number",
      headerName: <div style={{ color: "black" }}>Phone Number</div>,
      width: 200,
      renderCell: (params) => (
        <div style={{ color: "black" }}>{params.value}</div>
      ),
    },
    {
      field: "industry",
      headerName: <div style={{ color: "black" }}>Industry</div>,
      width: 200,
      renderCell: (params) => (
        <div style={{ color: "black" }}>{params.value}</div>
      ),
    },
    {
        field: "why_wugs",
        headerName: <div style={{ color: "black" }}>Why Wugs?</div>,
        width: 200,
        renderCell: (params) => (
          <div style={{ color: "black" }}>{params.value}</div>
        ),
      },
      {
        field: "about_you",
        headerName: <div style={{ color: "black" }}>About you</div>,
        width: 200,
        renderCell: (params) => (
          <div style={{ color: "black" }}>{params.value}</div>
        ),
      },
  ];
};

export default InterestedColumns;
