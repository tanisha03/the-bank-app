import React from 'react'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";

const TableContainer = styled.table`
  width: 100%;
  td, th {
    border: 1px solid #ddd;
    padding: 8px;
  }
  tr:nth-child(even){background-color: #f2f2f2;}
  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: ${props => props.theme.colors.primary.blue};
    color: white;
  }
  #address {
      width: 50%;
  }
  #bank_name {
      width: 12%;
  }
  #branch {
    width: 20%;
  }
`;

const Row = (props) => {
    let navigate = useNavigate();
    const {bank_name, ifsc, branch, bank_id, address, city} = props;
     return(
     <tr onClick={() => navigate(`/bank-details/${ifsc}?city=${city}`, { state: props })} style={{cursor: 'pointer'}}>
        <td>{bank_name}</td>
        <td>{ifsc}</td>
        <td>{branch}</td>
        <td>{bank_id}</td>    
        <td>{address}</td>    
     </tr>
)};

export default function Table({columns, data}) {
  console.log(data);
  return (
    <TableContainer>
        <tr>
            { columns.map(col => <th key={col.key} id={col.key}>{col.title}</th>)}
        </tr>
        { data.map(row => <Row key={row.ifsc} {...row}/>) }
    </TableContainer>
  )
}
