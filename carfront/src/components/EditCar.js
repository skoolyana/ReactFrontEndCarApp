import React, { useState } from "react";

import { Dialog } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";
import { DialogContent } from "@material-ui/core";
import { DialogTitle } from "@material-ui/core";

const EditCar = (props) => {
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

    console.log("Sunil");

    console.log(props.car.values.brand);
    

    setCar({brand: props.car.values.brand, model: props.car.values.model, color: props.car.values.color,
        year: props.car.values.year, fuel: props.car.values.fuel, price: props.car.values.price })
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
    console.log("Sunil2");
    console.log(props);
    
    
    props.updateCar(car,props.link);
    handleClose();
  } 

  return (
    <div>
      <button style={{ margin: 10 }} onClick={handleClickOpen}>
        {" "}
        Edit Car
      </button>
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle> Edit Car </DialogTitle>
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

export default EditCar;
