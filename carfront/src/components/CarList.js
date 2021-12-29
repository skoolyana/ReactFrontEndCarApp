import React from "react";
import { useState } from "react";
import Table from "../Table";
import { AppBar, Button } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCar from "../components/AddCar";
import EditCar from "../components/EditCar";
import { CSVLink } from "react-csv";
import { Grid } from "@material-ui/core";
import { useEffect } from "react";
import { useMemo } from "react";

import axios from "axios";

import { SERVER_URL } from "../constants";
import Login from "./Login";

function CarList() {

const columns = useMemo(
  () => [
    {
      Header: "Brand",
      accessor: "brand",
    },
    {
      Header: "Model",
      accessor: "model",
    },
    {
      Header: "Color",
      accessor: "color",
    },
    {
      Header: "Year",
      accessor: "year",
    },
    {
      Header: "Price €",
      accessor: "price",
    },
    {
      sortable: false,
      filterable: false,
      width: 100,
      accessor: "_links.self.href",
      Cell: ({ value, row }) => (
        <EditCar
          car={row}
          link={value}
          updateCar={updateCar}
          fetchCars={fetchCarData}
        />
      ),
    },
    {
      id: "delButton",
      sortable: false,
      filterable: false,
      width: 100,
      accessor: "_links.self.href",
      Cell: ({ value }) => (
        <Button
          color="secondary"
          size="small"
          onClick={() => {
            onDelClick(value);
          }}
        >
          Delete
        </Button>
      ),
    },
  ],
  []
);

const [data, setData] = useState([]);

const [isLoggedout, setLogOut] = useState(false);


const logout = () => {
  sessionStorage.removeItem("jwt");
  setLogOut(true);
  };




useEffect(() => {
  (async () => {
    const token = sessionStorage.getItem("jwt");

    const result = await axios(SERVER_URL + "api/cars",
    {
      headers: {'Authorization': token}
    });
    setData(result.data._embedded.cars);
  })();
}, []);

function fetchCarData() {
  // Read the token from the session storage
    // and include it to Authorization header
    const token = sessionStorage.getItem("jwt");
    console.log(token);

  fetch(SERVER_URL + "api/cars",
  {
    
    headers: {'Authorization': token}
  })
    .then((response) => response.json())
    .then((responseData) => {
      setData(responseData._embedded.cars);
    })
    .catch((err) => console.error(err));
}

function addCar(car) {
  // Read the token from the session storage
    // and include it to Authorization header
    const token = sessionStorage.getItem("jwt");

  fetch(SERVER_URL + "api/cars", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
    body: JSON.stringify(car),
  })
    .then((res) => fetchCarData())
    .catch((err) => console.error(err));
}

function updateCar(car, link) {
  // Read the token from the session storage
    // and include it to Authorization header
    const token = sessionStorage.getItem("jwt");

  fetch(link, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
    body: JSON.stringify(car),
  })
    .then((res) => {
      toast.success("Car Updated", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      fetchCarData();
    })
    .catch((err) => {
      toast.error("Error when updating", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      console.error(err);
    });
}

function onDelClick(link) {
  // Read the token from the session storage
    // and include it to Authorization header
    const token = sessionStorage.getItem("jwt");

  if (window.confirm("Are you sure to delete?")) {
    fetch(link, 
      { method: "DELETE",
      headers: {"Authorization": token} },
     
      
      )
      .then((res) => {
        toast.success("Car deleted", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        fetchCarData();
      })
      .catch((err) => {
        toast.error("Error when deleting", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        console.error(err);
      });
  }
}
if(isLoggedout) 
{

 return (<Login></Login>);

}
else
{
  return (
      <div className="App">
    
    
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Car List
        </Typography>
      </Toolbar>
    </AppBar>

    <Grid container>
      <Grid item>
        <AddCar addCar={addCar} fetchCars={fetchCarData} />
      </Grid>
      <Grid item style={{ padding: 15 }}>
        <CSVLink data={data} separator=";">
          Export CSV
        </CSVLink>
      </Grid>

      <Grid item style={{ padding: 10 }}>
      <Button variant="outlined" color="secondary" onClick={logout}>
          Logout
        </Button>
      </Grid>
      


    </Grid>

    <Table columns={columns} data={data} />

    <ToastContainer autoClose={1500} />
     
  </div>

  );
  }
}
export default CarList;
