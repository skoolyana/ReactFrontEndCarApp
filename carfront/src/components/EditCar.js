import React, { useState } from "react";

import { Dialog } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";
import { DialogContent } from "@material-ui/core";
import { DialogTitle } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";

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
 
    
    props.updateCar(car,props.link);
    handleClose();
  } 

  return (
    <div>
      <Button color="primary" size="small" style={{ margin: 10 }} onClick={handleClickOpen}>
        {" "}
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle> Edit Car </DialogTitle>
      <DialogContent>
      <TextField
            autoFocus
            fullWidth
            label="Brand"
            name="brand"
            value={car.brand}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Model"
            name="model"
            value={car.model}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Color"
            name="color"
            value={car.color}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Year"
            name="year"
            value={car.year}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            value={car.price}
            onChange={handleChange}
          />
      </DialogContent>
      <DialogActions>
          <Button color="secondary" onClick={handleClose}>Cancel</Button>
          <Button color="primary" onClick={handleSave}>Save</Button>
      </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditCar;
