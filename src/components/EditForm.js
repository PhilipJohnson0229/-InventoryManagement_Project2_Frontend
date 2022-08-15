import axios from 'axios';
import React, { Component } from 'react'

export default class EditForm extends Component {
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

    handleEditFormData = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type == 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        console.log(this.state);
        try{
            await axios.post('http://localhost:8080/items/update', {
                id:this.state.id,
                name:this.state.name,
                price:this.state.price,
                storeId:this.state.storeId,
                categoryId:this.state.categoryId 
            }).then(res => {
                console.log(res.state);
            }

            );
        }catch(error){
            console.log(error);
        }
    }
 
  render() {
    return (
      <div>
        <tr>
       <td>
          {this.state.id}
        </td>
        <td>
            <input 
            type="text" 
            required="required" 
            placeholder='Enter a item name...' 
            name="changeName"
            value={this.state.name} 
            onChange={this.handleEditFormData} 
            >
            
            </input>
        </td>
        <td>
            <input 
            type="text" 
            required="required" 
            placeholder='Enter an price...' 
            name="changePrice"
            value={this.state.price}
            onChange={this.handleEditFormData}
            >
            </input>
        </td>
        <td>
            <input 
            type="text" 
            required="required" 
            placeholder='Enter a store name...' 
            name="changeStoreName"
            value={this.state.storeId}
            onChange={this.handleEditFormData}
            >
            </input>
        </td> 
        <td>
            <input 
            type="text" 
            required="required" 
            placeholder='Enter a category...' 
            name="changeCategoryName"
            value={this.state.categoryId}
            onChange={this.handleEditFormData}
            >
            </input>
        </td>
        <td>
            <button type="submit">Save</button>
            {/*<button type="button" onClick={handleCancelClick}>Cancel</button>*/}
        </td>
    </tr>
      </div>
    )
  }
}
