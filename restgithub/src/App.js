import React, { useState } from 'react';
import './App.css';
import { useTable, useSortBy, usePagination } from "react-table";

function App() {
  
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState('');

  const handleChange = (e) => {
    setKeyword(e.target.value);
  }

  const btnClick = (value) => {
    alert(value);
  }



  const columns = React.useMemo(
    () => [{
      Header: 'Name',
      accessor: 'full_name'
    },
    {
      Header: 'URL',
      accessor:'html_url',
    },
    {
      Header: 'Owner',
      accessor:'owner.login',
    },
    {
      id:'button',
      sortable: false,
      filterable:'false',
      width: 100,
      accessor:'full_name',
      Cell: ({value}) => (
      <button onClick={() => { btnClick(value)}}>Press me</button>
      )
    }

    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
  } = useTable({ columns, data } , useSortBy, usePagination)

  

  const fetchData = () => {
    const url = 'https://api.github.com/search/repositories?q=${keyword}';

    fetch(url).then(response => response.json()).then(responseData => {
      setData(responseData.items)
    });
  }

  return (
    <div className="App">
    <input type= "text" onChange={handleChange}/>
    <button onClick={fetchData} value={keyword} > Fetch </button>
    <table {...getTableProps()} style={{
                borderBottom: 'solid 3px red',
                color: 'black',
              }}>
    <thead>
    {
      headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {
            headerGroup.headers.map( column => (
              
              <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{
                borderBottom: 'solid 3px red',
                color: 'black',
              }}>
                  {column.render('Header')}
                  <span>
                       {column.isSorted
                           ? column.isSortedDesc
                               ? '🔽'
                               : '🔼'
                           : ''}
                    </span>
              </th>
            )

            )
          }

        </tr>
      ))
    }

    </thead>

    <tbody {...getTableBodyProps}>


      {page.map(row => {
        prepareRow(row)
        return(
          <tr{...row.getRowProps()}>
          {
            row.cells.map(cell => {
              return (
                <td {...cell.getCellProps} style={{
                  padding: '10px',
                  border: 'solid 1px gray',
                }} >
                {cell.render('Cell')}
                
                </td>
              )
            })
          }
          </tr>
        )
      })}
    </tbody>
    </table>
    </div>
  );
}

export default App;
