import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";



const InterestedColumns = () => {
  // const [selectedRowId, setSelectedRowId] = useState('')
  const dispatch = useDispatch();

  function handleButtonClick(params) {
    console.log("delete interested", params);
  
    dispatch({
      type: "DELETE_INTERESTED",
      payload: {
        id: params,
      },
    });
  }
  return [
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
    // {
    //     field: "why_wugs",
    //     headerName: <div style={{ color: "black" }}>Why Wugs?</div>,
    //     width: 200,
    //     renderCell: (params) => (
    //       <div style={{ color: "black" }}>{params.value}</div>
    //     ),
    //   },
    //   {
    //     field: "about_you",
    //     headerName: <div style={{ color: "black" }}>About you</div>,
    //     width: 200,
    //     renderCell: (params) => (
    //       <div style={{ color: "black" }}>{params.value}</div>
    //     ),
    //   },
      {
        field: 'actions',
        headerName: 'Actions',
        sortable: false,
        width: 120,
        renderCell: (params) => {
          return (
            <button
              onClick={() => handleButtonClick(params.row.id)} // Handle button click
              className="btn btn-primary"
            >
              Delete
            </button>
          );
        },
      },
  ];
};

export default InterestedColumns;
