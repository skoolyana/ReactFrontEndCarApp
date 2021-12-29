import { render, screen } from '@testing-library/react';
import App from './App';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import AddCar from './components/AddCar';

test('renders without crashing', () => {
  
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);

});

it('renders a snapshot', () => {
  const tree = renderer.create(<AddCar/>).toJSON();
  expect(tree).toMatchSnapshot();
});
