import React from 'react';
import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import axios from "axios";
import Table from "./Table";
import { SERVER_URL } from "./constants";

import './App.css';
import { AppBar } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import { Typography } from '@material-ui/core';


function App() {


  const columns = useMemo(() => [
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
  ], []);

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios(SERVER_URL + "api/cars");
      console.log("Sunil");

      console.log(result.data);
      

      setData(result.data._embedded.cars);
    })();
  }, []);

  return (
    <div className="App">

      <AppBar position='static' color='default'>
        <Toolbar>
          <Typography variant='h6' color='inherit'>
          Car List
          </Typography>
        </Toolbar>
         
      </AppBar>
         
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App;
