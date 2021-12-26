import React from "react";
import { Component } from "react";
import { SERVER_URL } from "../constants";
import ReactTable from "react-table";

class CarList extends Component {
  constructor(props) {
    super(props);
    this.state = { cars: [] };
  }

  componentDidMount() {
    this.fetchCars();
  }

  fetchCars = () => {
    console.log("FETCH");

    fetch(SERVER_URL + "api/cars")
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          cars: responseData._embedded.cars,
        });
      })
      .catch((err) => console.error(err));
  };

  render() {
    const columns = [
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
    ];

    return (
      <div>
        <ReactTable data={this.state.cars} columns={columns}></ReactTable>
      </div>
    );
  }
}

export default CarList;
