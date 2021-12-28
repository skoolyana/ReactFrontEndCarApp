import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import axios from "axios";
import Table from "./Table";
import { SERVER_URL } from "./constants";

import "./App.css";
import { AppBar, Button } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { Typography } from "@material-ui/core";

import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import AddCar from "./components/AddCar";
import EditCar from "./components/EditCar";

function App() {
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
        accessor: '_links.self.href',
        Cell: ({value, row}) => (<EditCar car={row} link={value} updateCar={updateCar} 
          fetchCars={fetchCarData} />),
      },
      {
        id: "delButton",
        sortable: false,
        filterable: false,
        width: 100,
        accessor: "_links.self.href",
        Cell: ({ value }) => (
          <button
            onClick={() => {
              onDelClick(value);
            }}
          >
            Delete
          </button>
        ),
      },
    ],
    []
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios(SERVER_URL + "api/cars");
      console.log("Sunil");

      console.log(result.data);

      setData(result.data._embedded.cars);
    })();
  }, []);

  function fetchCarData() {
    fetch(SERVER_URL + "api/cars")
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData._embedded.cars);
      })
      .catch((err) => console.error(err));
  }

  function addCar(car)
  {
    fetch(SERVER_URL + "api/cars",
    {method:'POST', headers : {
      'Content-Type' : 'application/json', },
      body: JSON.stringify(car)
    }).then((res) =>  fetchCarData() ).catch(err => console.error(err))

  }

  
  function updateCar(car, link)
  {
    fetch(link,
    {method:'PUT', headers : {
      'Content-Type' : 'application/json', },
      body: JSON.stringify(car)
    }).then((res) => 
    {
      toast.success("Car Updated", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      fetchCarData();

    }).catch((err) => {
      toast.error("Error when updating", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      console.error(err);
    });
  }



  function onDelClick(link) {
    if (window.confirm("Are you sure to delete?")) {
      fetch(link, { method: "DELETE" })
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

  return (
    <div className="App">

      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Car List
          </Typography>
        </Toolbar>
      </AppBar>

      <AddCar addCar={addCar} fetchCars={fetchCarData} />

      <Table columns={columns} data={data} />

      <ToastContainer autoClose={1500} />
    </div>
  );
}

export default App;
