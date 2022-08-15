import React from 'react'
                            // desctrucutre 
export const EditableRow = ({editFormData, handleEditFormChange, handleCancelClick}) => {
  return (
    <tr>
       <td>
          {editFormData.id}
        </td>
        <td>
            <input 
            type="text" 
            required="required" 
            placeholder='Enter a item name...' 
            name="changeName"
            value={editFormData.name} 
            onChange={(e) => handleEditFormChange(e.target.value)} 
            >
            
            </input>
        </td>
        <td>
            <input 
            type="text" 
            required="required" 
            placeholder='Enter an price...' 
            name="changePrice"
            value={editFormData.price}
            onChange={handleEditFormChange}
            >
            </input>
        </td>
        <td>
            <input 
            type="text" 
            required="required" 
            placeholder='Enter a store name...' 
            name="changeStoreName"
            value={editFormData.store.name}
            onChange={handleEditFormChange}
            >
            </input>
        </td> 
        <td>
            <input 
            type="text" 
            required="required" 
            placeholder='Enter a category...' 
            name="changeCategoryName"
            value={editFormData.category.name}
            onChange={handleEditFormChange}
            >
            </input>
        </td>
        <td>
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
        </td>
    </tr>
  )
}
