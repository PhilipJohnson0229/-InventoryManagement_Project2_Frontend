import React from 'react';
import axios from 'axios';
import { Container, Table, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ItemsMap } from './ItemsMap';
import { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

export const Items = () => {

    const [table, setTable] = useState([]);

    // retrieves table
    useEffect(() => {
        axios.get(`http://localhost:8080/getItems?page=0`)
        .then((response) => {console.log(response.data) 
            setTable(response.data)})
        .catch((err) => {console.log(err)})
    }, []) // every time update is changed -> useEffect hook is called again

 // Bare bones Items table setup, still need to alter
    return (
    <>
    <Container className="text-center"  style={{paddingTop: 30}}>
    <Card variant='dark' style={{width: '100%', color:'white'}}>
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Category
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    
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