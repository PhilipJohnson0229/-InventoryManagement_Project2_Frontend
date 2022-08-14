import React from 'react'

export const EditableRow = ({editFormData, handleEditFormChange}) => {
  return (
    <tr>
        <td>
            <input 
            type="text" 
            required="required" 
            placeholder='Enter an id...' 
            name="changeId">
            onChange={handleEditFormChange}
            </input>
        </td>
        <td>
            <input 
            type="text" 
            required="required" 
            placeholder='Enter a item name...' 
            name="changeName">
            onChange={handleEditFormChange}
            </input>
        </td>
        <td>
            <input 
            type="text" 
            required="required" 
            placeholder='Enter an price...' 
            name="changePrice">
            onChange={handleEditFormChange}
            </input>
        </td>
        <td>
            <input 
            type="text" 
            required="required" 
            placeholder='Enter a store name...' 
            name="changeStoreName">
            onChange={handleEditFormChange}
            </input>
        </td>
        <td>
            <input 
            type="text" 
            required="required" 
            placeholder='Enter a category...' 
            name="changeCategoryName">
            onChange={handleEditFormChange}
            </input>
        </td>
    </tr>
  )
}
