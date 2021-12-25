import './App.css';
import { AppBar } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import CarList from './components/CarList';

function App() {
  return (
    <div className="App">

      <AppBar position='static' color='default'>
        <Toolbar>
          <Typography variant='h6' color='inherit'>
          Car List
          </Typography>
        </Toolbar>
         
      </AppBar>
      <CarList></CarList>
    </div>
  );
}

export default App;
