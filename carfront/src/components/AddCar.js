import React, { useState } from "react";

import { Dialog } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";
import { DialogContent } from "@material-ui/core";
import { DialogContentText } from "@material-ui/core";
import { DialogTitle } from "@material-ui/core";

const AddCar = (props) => {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    color: "",
    year: "",
    fuel: "",
    price: "",
  });
  // Open the modal form
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close the modal form
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setCar({ ...car, [event.target.name]: event.target.value });
  };

  // Save car and close modal form
  const handleSave = () => {
    props.addCar(car);
    handleClose();
  }

  return (
    <div>
      <button style={{ margin: 10 }} onClick={handleClickOpen}>
        {" "}
        New Car
      </button>
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle> New Car </DialogTitle>
      <DialogContent>
        <input
          type="text"
          placeholder="Brand"
          name="brand"
          value={car.brand}
          onChange={handleChange}
        ></input>
        <br></br>
        <input
          type="text"
          placeholder="Model"
          name="model"
          value={car.model}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          placeholder="Color"
          name="color"
          value={car.color}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          placeholder="Year"
          name="year"
          value={car.year}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          placeholder="Price"
          name="price"
          value={car.price}
          onChange={handleChange}
        />
        <br />
      </DialogContent>
      <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
      </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddCar;
