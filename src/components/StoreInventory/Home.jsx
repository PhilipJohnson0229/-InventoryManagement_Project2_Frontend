import React from 'react';
import { Container, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
/* This is the index/Welcome page
*/
export const Home = () => {

    return (
        // This is how to read environment variables
        // Environment variables are good to toggle between different environments (dev, prod, test, QA)
        <>
            <Container className="text-center" style ={{paddingTop : 30, alignContent: 'center', backgroundColor:'lightgray'}}>
               
                    <Card bg="success" className="mb-3 text-center" style={{color:'black'}}>
                    <Card.Body>
                    <Card.Img src="https://www.helium10.com/app/uploads/2020/09/InventoryManagement_Hero@3x.png" resizeMode="cover" style ={{width:600, height : 500}} />
                    </Card.Body> 
                    </Card>
                       
            </Container>
        </>
    );
}