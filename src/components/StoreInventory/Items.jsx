import React, {Fragment} from 'react';
import axios from 'axios';
import { Container, Table, Card, Offcanvas, Button, ButtonGroup, DropdownButton, Dropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ItemsMap } from './ItemsMap';
import { useState, useEffect } from 'react';
import { EditableRow } from './EditableRow';
import PostForm from '../PostForm';
import { useLocation } from "react-router-dom";

export const Items = () => {

    const [table, setTable] = useState([]); // maps table
    const [allTable, setAllTable] = useState([]);
    //stores the search result
    const [result, setResult] = useState(table);
    const [page, setPage] = useState(0);
    //const location = useLocation();// for storing Store name from Store component
    //const { storeName } = location.state;

    /*************************Add Item***************************/
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    /*************************Add Item***************************/

    // retrieves table
    useEffect(() => {
        axios.all([ // calls each .get() below
        axios.get(`http://localhost:8080/items/getItems?page=${page}`), // tables that takes in pagination - page
        axios.get(`http://localhost:8080/items/getItemsNoPage`)]).then(axios.spread((getItems, getAll) => { // 'getAll' 
            setTable(getItems.data); // store the data
            setAllTable(getAll.data);
            //console.log("paged items: ", getItems.data, "all items: ", getAll.data); // outputs data
            //console.log(storeName); // output: "the-page-id"
        }))
    }, [page]) // every time update is changed -> useEffect hook is called again

    // allows to render entire table pagination at beginning/refresh
    useEffect(() => { 
     setResult(table);
     //searchResult();
    }, [table])
 
    let query = "";

    // filters table rows according to user input
    const searchResult = (e) => {
        //using cardInfo.name property, change query value : query = storeName;
        /*
        if (e.target.value == "") { // checks if parameter is null
            query = storeName.toLowerCase(); // sets query to storeName's state
        } else {
            query = e.target.value;
        } */
        query = e.target.value;
        console.log("store: ", table);
        if(query === "") { // checks if query is null
            table.map((value) => { // if true, return paged table
               return value;
            })
            setResult(table);
        } else { // if false, filter through ALL table values
            const currentResults = allTable.filter((search) => {
                    return search.store.name.toString().toLowerCase().includes(query);
            })
            console.log("search results: ", currentResults, query);
            setResult(currentResults);
        }
    }

    const searchCategoryResult = (e) => {
        query = e.target.value; 
        console.log("category: ", table);
        if(query === "") { // checks if query is null
            table.map((value) => { // if true, return paged table
               return value;
            })
            setResult(table);
        } else { // if false, filter through ALL table values
            const currentResults = allTable.filter((search) => {
                    return search.category.name.toString().toLowerCase().includes(query);
            })
            console.log("search results: ", currentResults);
            setResult(currentResults);
        }
    }

    const updatePage = (page) => { // updates pagination
        setPage(page);
    }

    const [editItemId, setEditItemId] = useState(null); // set null -> user isn't editing a row
     
    const handleEditFormChange = (event) => {
        event.preventDefault();

        // get filed name and value
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        // new object to prevent mutating the state
        const newFormData = { ...editFormData}; // used spread operator to copy the edited form data
        newFormData[fieldName] = fieldValue; // name = whatever user inputs. Updates form data

        setEditFormData(newFormData); // stores new edits to a rows
    }
    // may not need/ use axios call for edit
    const [editFormData, setEditFormData] = useState({
        id: "",
        name: "",
        price: "",
        store: {
            id: "",
            name: "",
            location: ""
        },
        category: {
            id: "",
            name: "",
            description: ""
        }
    }) 
    // Prepopulates the form to the current data
    const handeEditClick = (event, e) => {
        event.preventDefault();
        setEditItemId(e.id);
        
        const formValues = {
        id: e.id,
        name: e.name,
        price: e.price,
        store: {
            id: "",
            name: e.store.name,
            location: ""
        },
        category: {
            id: "",
            name: e.category.name,
            description: ""
        }
        }
        setEditFormData(formValues);
    };
    // should use update/save axios call
    const handleEditFormSubmit = async (event) => {
        event.preventDefault();
        try{
             await axios.post('http://localhost:8080/items/update',{
                
                    id: editItemId,
                    name: editFormData.name,
                    price: editFormData.price,
                    storeName: editFormData.store.name,
                    categoryName: editFormData.category.name
                
            });
        }catch(error){
            console.log(error)
        }

        const newResult = [...result];

        //const index = result.findIndex((item) => item.id === editItemId);
        //newResult[index] = editedItem;

        setResult(newResult);
        setEditItemId(null);
    }

    const handleCancelClick = () => {
        setEditItemId(null);
    }

 // Bare bones Items table setup, still need to alter
    return (
    <>
    <Container className="text-center"  style={{paddingTop: 30}}>
    <input type="text" id="storeInput" onChange={searchResult} placeholder="Search for store names.."></input>
    <input type="text" id="categoryInput" onChange={searchCategoryResult} placeholder="Search for category names.."></input>

    <Card variant='dark' style={{width: '100%', color:'white'}}>
    <form onSubmit={handleEditFormSubmit}>
    <Table striped bordered hover size="sm" id="myTable" variant='info' responsive>
        <thead>
            <tr>
                <td>ID</td>
                <td>Item</td>
                <td>Price</td>
                <td>Store</td>
                <td>Category</td>
                <td>Action</td>
            </tr>
        </thead>
        <tbody>         
            {result.map((e) =>(  
                <Fragment> {/*Fragment resolves error of multiple children */}
                    {editItemId === e.id ? (
                    <EditableRow 
                    editFormData={editFormData} 
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}/>
                    ) : (
                    <ItemsMap e={e} setTable={setTable} 
                    handeEditClick={handeEditClick}/>
                    )}
                </Fragment>           
            ))}
        </tbody>
    </Table>
    </form>
    </Card>
    <nav aria-label="Page navigation example">
    <ul class="pagination">
    <li class="page-item"><a class="page-link" >Previous</a></li>
    {[...Array(11)].map((x, i) => {
        return (
            <>
            <li class="page-item"><button className="page-link" onClick={() => {updatePage(i)}}>{i+1}</button></li>
            </>
        )
    })}
    <li class="page-item"><a class="page-link" >Next</a></li>

    {/*************************Add Item***************************/}
    {!show && <Button variant="info" onClick={handleShow}>
      Add Item
    </Button>}
    {show && <Button variant="secondary"onClick={handleClose}>
      Hide
    </Button>}
    {/*************************Add Item***************************/}

    </ul>
    </nav>
    </Container>
    {/*************************Add Item***************************/}
    {show && <Container responsive>
        <Card >
            <PostForm/>
        </Card>
    </Container>}
    
    {/*************************Add Item***************************/}
    </>
    );
}