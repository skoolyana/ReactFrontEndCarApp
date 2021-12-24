import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import React from "react";

const AddItem = (props) => {

const[open, setOpen] = React.useState(false);
const[item, setItem] = React.useState({product:'', amount:''});

const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }


  const handleChange =(e) => {

    setItem({...item, [e.target.name]:e.target.value})
  }

  // Calls addItem function (in props) and pass item state into it.
  const addItem = () => {
    props.addItem(item);
    handleClose();
  }


return (
    <div>
        <Button variant="outlined" style={{marginTop:10}} color="Primary" onClick={handleOpen}>
            Add Item
        </Button>
        <Dialog open={open} onClose={handleClose}aria-labelledby="form-dialog-title">

            <DialogTitle id="form-dialog-title"></DialogTitle>
            <DialogContent>
                <TextField autoFocus margin="dense" value={item.product} onChange={handleChange} 
                name="product" label="Product" fullWidth />
                
                <TextField autoFocus margin="dense" value={item.amount} 
            onChange={handleChange} name="amount" label="Amount" fullWidth />

            </DialogContent>
            <DialogActions>

                <Button onClick={handleClose} color="primary">Cancel</Button>
                <Button onClick={addItem} color="primary">Add</Button>

            </DialogActions>
        </Dialog>
        </div>

);
    
}


export default AddItem;