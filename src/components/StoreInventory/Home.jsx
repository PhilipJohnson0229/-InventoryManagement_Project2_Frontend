import React from 'react';
import { Container, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import gifImage from './b03b4afa764772ab1763c125890a9a0e.gif';
/* This is the index/Welcome page
*/
export const Home = () => {

    return (
        // This is how to read environment variables
        // Environment variables are good to toggle between different environments (dev, prod, test, QA)
        <>
            <Container className="text-center" style ={{paddingTop : 30, alignContent: 'center'}}>
               
                    <Card bg="success" className="mb-3 text-center" style={{color:'white'}}>
                    <Card.Body>
                    <Card.Img src={gifImage} object-fit="none" />
                    </Card.Body> 
                    </Card>
                       
            </Container>
        </>
    );
}