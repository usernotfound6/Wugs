import React from "react";


const Columns = () => {
    
        return [
    
        {
          field: "id",
          headerName: (
            <div style={{ color: "black" }}>ID</div>
          ),
          width: 70,
          renderCell: (params) => (
            <div style={{ color: "black" }}>{params.value}</div>
          ),
        },
        {
          field: "business_name",
          headerName: (
            <div style={{ color: "black" }}>Business Name</div>
          ),
          width: 130,
          renderCell: (params) => (
            <div style={{ color: "black" }}>{params.value}</div>
          ),
        },
        {
          field: "address_street",
          headerName: (
            <div style={{ color: "black" }}>Street</div>
          ),
          width: 130,
          renderCell: (params) => (
            <div style={{ color: "black" }}>{params.value}</div>
          ),
        },
        {
          field: "address_city",
          headerName: (
            <div style={{ color: "black" }}>City</div>
          ),
          width: 130,
          renderCell: (params) => (
            <div style={{ color: "black" }}>{params.value}</div>
          ),
        },
        {
          field: "address_state",
          headerName: (
            <div style={{ color: "black" }}>State</div>
          ),
          width: 130,
          renderCell: (params) => (
            <div style={{ color: "black" }}>{params.value}</div>
          ),
        },
        {
          field: "address_zip",
          headerName: (
            <div style={{ color: "black" }}>Zip Code</div>
          ),
          width: 130,
          renderCell: (params) => (
            <div style={{ color: "black" }}>{params.value}</div>
          ),
        },
        {
          field: "website",
          headerName: (
            <div style={{ color: "black" }}>Website</div>
          ),
          width: 90,
          renderCell: (params) => (
            <div style={{ color: "black" }}>{params.value}</div>
          ),
        },
        {
          field: "first_name",
          headerName: (
            <div style={{ color: "black" }}>First Name</div>
          ),
          width: 130,
          renderCell: (params) => (
            <div style={{ color: "black" }}>{params.value}</div>
          ),
        },
        {
          field: "last_name",
          headerName: (
            <div style={{ color: "black" }}>Last Name</div>
          ),
          width: 130,
          renderCell: (params) => (
            <div style={{ color: "black" }}>{params.value}</div>
          ),
        },
        {
          field: "phone",
          headerName: (
            <div style={{ color: "black" }}>Phone #</div>
          ),
          width: 130,
          renderCell: (params) => (
            <div style={{ color: "black" }}>{params.value}</div>
          ),
        },
        {
          field: "hours_of_operation",
          headerName: (
            <div style={{ color: "black" }}>Hours of Operation</div>
          ),
          width: 190,
          renderCell: (params) => (
            <div style={{ color: "black" }}>{params.value}</div>
          ),
        },
        {
          field: "micromarket_location",
          headerName: (
            <div style={{ color: "black" }}>Market Location</div>
          ),
          width: 190,
          renderCell: (params) => (
            <div style={{ color: "black" }}>{params.value}</div>
          ),
        },
        {
          field: "neighborhood_info",
          headerName: (
            <div style={{ color: "black" }}>Neighborhood Info</div>
          ),
          width: 190,
          renderCell: (params) => (
            <div style={{ color: "black" }}>{params.value}</div>
          ),
        },
        {
          field: "demographics",
          headerName: (
            <div style={{ color: "black" }}>Demographics</div>
          ),
          width: 190,
          renderCell: (params) => (
            <div style={{ color: "black" }}>{params.value}</div>
          ),
        },
        {
          field: "number_of_people",
          headerName: (
            <div style={{ color: "black" }}># of people</div>
          ),
          width: 90,
          renderCell: (params) => (
            <div style={{ color: "black" }}>{params.value}</div>
          ),
        },
        {
          field: "target_age_group",
          headerName: (
            <div style={{ color: "black" }}>Age Group</div>
          ),
          width: 150,
          renderCell: (params) => (
            <div style={{ color: "black" }}>{params.value}</div>
          ),
        },
        {
          field: "industry",
          headerName: (
            <div style={{ color: "black" }}>Industry</div>
          ),
          width: 130,
          renderCell: (params) => (
            <div style={{ color: "black" }}>{params.value}</div>
          ),
        },
        {
          field: "pictures",
          headerName: (
            <div style={{ color: "black" }}>Pictures</div>
          ),
          width: 130,
          renderCell: (params) => (
            <div style={{ color: "black" }}>{params.value}</div>
          ),
        },
        {
          field: "dimensions",
          headerName: (
            <div style={{ color: "black" }}>Dimensions</div>
          ),
          width: 130,
          renderCell: (params) => (
            <div style={{ color: "black" }}>{params.value}</div>
          ),
        },
        {
          field: "wugs_visit",
          headerName: (
            <div style={{ color: "black" }}>Wugs Visit</div>
          ),
          width: 130,
          renderCell: (params) => (
            <div style={{ color: "black" }}>{params.value}</div>
          ),
        },
        {
          field: "contract",
          headerName: (
            <div style={{ color: "black" }}>Contract</div>
          ),
          width: 130,
          renderCell: (params) => (
            <div style={{ color: "black" }}>{params.value}</div>
          ),
        },
        {
          field: "admin_notes",
          headerName: (
            <div style={{ color: "black" }}>Admin Notes</div>
          ),
          width: 130,
          renderCell: (params) => (
            <div style={{ color: "black" }}>{params.value}</div>
          ),
        },
        {
          field: "status_id",
          headerName: (
            <div style={{ color: "black" }}>Status</div>
          ),
          width: 130,
          renderCell: (params) => (
            <div style={{ color: "black" }}>{params.value}</div>
          ),
        },
      ];
    
    
};

export default Columns