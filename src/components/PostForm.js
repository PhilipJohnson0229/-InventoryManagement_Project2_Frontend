import React, { Component } from 'react'
import axios from 'axios';

export default class App extends Component {
  
    constructor(props) {
    super(props);
    this.state = {
      id: "0",
      name: "name",
      price: "0",
      storeId: "0",
      categoryId: "0",
    };
  }

  onHandleChange = (event) => {
    // console.log(event.target.value)
    
    var target = event.target;
    var name = target.name;
    var value = target.type == 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value
    })
  }

  onHandleSubmit = async (event) => {
    console.log(this.state);
    try{
        await axios.post('http://localhost:8080/items/addItem', {
            id:this.state.id,
            name:this.state.name,
            price:this.state.price,
            storeId:this.state.storeId,
            categoryId:this.state.categoryId
        }).then(res=>{
            console.log(res.state);
        });
    }catch(error){
        console.log(error)
    }    
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row m-0">
          <div className="col-12 p-2">
            <div className="p-2" style={{ border: '1px solid #ccc' }}>
              <p>Form</p>
              <form onSubmit={this.onHandleSubmit}>

                {/* id */}
                <div className="form-group">
                  <label>Item Id</label>
                  <input type="text" className="form-control" placeholder="Enter email" name="id"
                    onChange={this.onHandleChange} value={this.state.id} />
                </div>
                {/* id */}

                {/* name */}
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" className="form-control" placeholder="password" name="name"
                    onChange={this.onHandleChange} value={this.state.name} />
                </div>
                {/* name */}

                {/* price */}
                <div className="form-group">
                  <label>Price</label>
                  <input type="text" className="form-control" placeholder="password" name="price"
                    onChange={this.onHandleChange} value={this.state.price} />
                </div>
                {/* price */}

                {/* store */}
                <div className="form-group">
                  <label>Store ID</label>
                  <input type="text" className="form-control" placeholder="password" name="storeId"
                    onChange={this.onHandleChange} value={this.state.storeId} />
                </div>
                {/* store */}

                {/* category */}
                <div className="form-group">
                  <label>Category ID</label>
                  <input type="text" className="form-control" placeholder="password" name="categoryId"
                    onChange={this.onHandleChange} value={this.state.categoryId} />
                </div>
                {/* category */}

                <button type="submit" className="btn btn-primary">Save</button>
              </form>
            </div>
          </div>
        </div>
      </div >
    )
  }
}