
import React, { Component }  from 'react'; 

  
class AddItem extends Component { 

  

  state = { 

    data: "This is data", 

    num: 123, 

    boolean: true, 

  } 

  

  // save data to localStorage 

  saveStateToLocalStorage = () => { 

    localStorage.setItem('state', JSON.stringify(this.state)); 

  } 

  

  // Fetch data from local storage 

  getStateFromLocalStorage = () => { 

    let data = localStorage.getItem('state'); 

    if(data !== undefined) { 

      this.setState(JSON.parse(data)); 

    } 

  } 

  

  componentDidMount() { 

    // Fetch data from local storage 

    this.getStateFromLocalStorage(); 

  } 

  

  render() { 

    return ( 

      <div> 

        <h2>GeeksforGeeks</h2> 

        <button onClick={this.saveStateToLocalStorage}> 

          Save State to local storage\ 

        </button> 

      </div> 

    ); 

  } 
} 

  

export default AddItem;