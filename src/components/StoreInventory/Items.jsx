import React from 'react';
import axios from 'axios';
import { Container, Table, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ItemsMap } from './ItemsMap';
import { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

export const Items = () => {

    const [table, setTable] = useState([]);
    const [data, setData] = useState([]);// for filtering items in table

    // retrieves table
    useEffect(() => {
        axios.get(`http://localhost:8080/getItems?page=0`)
        .then((response) => {console.log(response.data) 
            setTable(response.data)})
        .catch((err) => {console.log(err)})
    }, []) // every time update is changed -> useEffect hook is called again

    // Declare variables
    var input, filter, tr, td, i, txtValue;
    input = document.getElementsByClassName(e.store.name);
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
        } else {
        tr[i].style.display = "none";
        }
    }
    }
    /*
    const filterTable = (name) => {
        data.filterTable
    } */

 // Bare bones Items table setup, still need to alter
    return (
    <>
    <Container className="text-center"  style={{paddingTop: 30}}>
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" >
        Store
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#http://localhost:8080/getStoreItemsName?name=Jaxnation">Jaxnation</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Realblab</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Wordtune</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" >
        Category
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Masonry</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Ornamental Railings</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Drywall & Acoustical (MOB)</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    <Card variant='dark' style={{width: '100%', color:'white'}}>
    <Table striped bordered hover size="sm" variant='info' responsive>
        <thead>
            <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Price</td>
                <td>Store</td>
                <td>Category</td>
                <td>Action</td>
            </tr>
        </thead>
        <tbody>
            
            {table.map((e) =>(
                <ItemsMap e={e} setTable={setTable} /> 
                    
            ))}

        </tbody>
    </Table>
    </Card>
    </Container>
    </>
    );
}