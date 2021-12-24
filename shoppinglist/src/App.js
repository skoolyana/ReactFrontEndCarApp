import './App.css';
import React from 'react';
import { AppBar, ListItem, Typography } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import AddItem from './AddItem';
import { ListItemText } from '@material-ui/core';
import { List } from '@material-ui/core';


function App() {

  const [items, setItems] = React.useState([]);

  const addItem = (item) => {
    setItems([item, ...items]);
  }  


  const listItems = items.map((item, index) => 
  <ListItem key={index}>
  
  <ListItemText primary={item.product} secondary={item.amount} />
  
  </ListItem>);

  return (
    <div className="App">
      <AppBar position='static' color='default'>
      <Toolbar>
        <Typography variant='h6' color='inherit'>
          Shopping List
        </Typography>
      </Toolbar>

      </AppBar>
      <AddItem addItem={addItem} />
      <List>{listItems}</List>
    </div>
  );
}
export default App;
