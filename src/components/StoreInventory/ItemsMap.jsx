import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import{Button} from 'react-bootstrap';

/*This is the child component that maps the Items table 
  in Items.jsx and handles the button functions.
*/

export const ItemsMap = ({e, setTable, handeEditClick}) => {

    const handleDelete = async () => {
        try {                                 // Need to test 
            const s = await axios.delete(`http://localhost:8080/items/deleteItem/${e.id}`)
            .then(()=>{ 
                window.location.reload(false);
            });
         }
         catch (err) {
             console.log(err);
         }
    }

    // Need to check if this works
    const handleEdit = async () => {
        try {                                 // Need to change later
            const s = await axios.handleEdit(`http://localhost:8080/id=${e.id}`)
             setTable(e.filter((table) => {return e.id !== table.id}));
         }
         catch (err) {
             console.log(err);
         }
    }

    // variable for keeping state of buttons from reverting (to original status) once selected
    const [a, setA] = useState(false);

    useEffect(() => {// checks if status was already changed
            // May have to change this
        if(e.status === 2 || e.status === 3){
            console.log(e.status)
            setA(true);
        }
        else{
            setA(false);
        }
    })

    // May need to change
    return (
    <tr> 
        <td>{e.id}</td>
        <td>{e.name}</td>
        <td>{e.price}</td>
        <td>{e.store.name}</td>
        <td>{e.category.name}</td>
        <td>
        <Button onClick={(event) => handeEditClick(event, e)} variant='secondary'>Edit</Button>
        <Button onClick={handleDelete} variant='dark'>Delete</Button>
        </td>
    </tr>
    );
}