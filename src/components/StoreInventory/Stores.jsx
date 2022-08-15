import React from "react";
import "./Box.css"
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import standInImg from './store.png';
import { Link, useNavigate } from 'react-router-dom';

export const Stores = () => {
    const [cardInfo, setCardInfo] = useState([]);

    const navigate = useNavigate();
    

    useEffect(() => {
        axios.get(`http://localhost:8080/stores/getStores`)
        .then((response) => {console.log(response.data) 
            setCardInfo(response.data)})
        .catch((err) => {console.log(err)})
    }, []) 

  const renderCard = (cardInfo, index) => {
    return (
      <Card style={{width: '15rem', color:'white'}} key={index} className="box mb-3 text-center" bg='success'>
        <Card.Img variant="top" src={standInImg} resizeMode="responsive" style ={{width:'70%', alignSelf:'center'}}/>
        <Card.Body>
          <Card.Title>{cardInfo.name}</Card.Title>
          <Card.Text>{cardInfo.location}</Card.Text>
          <Button onClick={() => {navigate("/table")}} style={{width: 300, alignSelf: 'center', justifyContent: 'inherit', marginBottom: 50, color:'white'}} variant= 'info'>
            See Inventory
          </Button>
          
        </Card.Body>
      </Card>
    );
  };

  return <div className="grid">{cardInfo.map(renderCard)}</div>;
};

