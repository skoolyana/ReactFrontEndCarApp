import React from "react";
import { Component } from "react";
import { SERVER_URL } from "../constants";

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
    const tableRows = this.state.cars.map((car, index) => (
      <tr key={index}>
        <td>{car.brand}</td>
        <td>{car.model}</td>
        <td>{car.color}</td>
        <td>{car.year}</td>
        <td>{car.price}</td>
      </tr>
    ));

    return (
      <div>
        <table>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    );
  }
}

export default CarList;
