import React from "react";
import axios from 'axios';
import { Container, Table, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ItemsMap } from './ItemsMap';
import { useState, useEffect } from 'react';

function Jaxnation(){
    const [table, setTable] = useState([]); // maps table
    const [allTable, setAllTable] = useState([]);
    //stores the search result
    const [result, setResult] = useState(table);
    const [page, setPage] = useState(0);
    //const location = useLocation();// for storing Store name from Store component
    //const { storeName } = location.state;

    // retrieves table
    useEffect(() => {
        axios.all([ // calls each .get() below
        axios.get(`http://localhost:8080/getItems?page=${page}`), // tables that takes in pagination - page
        axios.get(`http://localhost:8080/getAll`)]).then(axios.spread((getItems, getAll) => { // 'getAll' 
            setTable(getItems.data); // store the data
            setAllTable(getAll.data);
            console.log("paged items: ", getItems.data, "all items: ", getAll.data); // outputs data
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
    return(
        <div>
            <Container className="text-center"  style={{paddingTop: 30}}>
    <input type="text" id="storeInput" onChange={searchResult} placeholder="Search for store names.."></input>
    <input type="text" id="categoryInput" onChange={searchCategoryResult} placeholder="Search for category names.."></input>

    <Card variant='dark' style={{width: '100%', color:'white'}}>
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
                <ItemsMap e={e} setTable={setTable} /> 
                    
            ))}

        </tbody>
    </Table>
    
    </Card>
    <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"><a class="page-link" >Previous</a></li>
    {[...Array(11)].map((x, i) => {
        return (
            <li class="page-item"><button className="page-link" onClick={() => {updatePage(i)}}>{i+1}</button></li>
        )
    })}
    <li class="page-item"><a class="page-link" >Next</a></li>
  </ul>
</nav>
    </Container>
        </div>
    )
}

export default Jaxnation;