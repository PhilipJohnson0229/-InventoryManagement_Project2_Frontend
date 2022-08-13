import React from 'react'

export const EditableRow = () => {
  return (
    <tr>
        <td>
            <input 
            type="text" 
            required="required" 
            placeholder='Enter an id...' 
            name="changeId">
            </input>
        </td>
        <td>
            <input 
            type="text" 
            required="required" 
            placeholder='Enter a item name...' 
            name="changeName">
            </input>
        </td>
        <td>
            <input 
            type="text" 
            required="required" 
            placeholder='Enter an price...' 
            name="changePrice">
            </input>
        </td>
        <td>
            <input 
            type="text" 
            required="required" 
            placeholder='Enter a store name...' 
            name="changeStoreName">
            </input>
        </td>
        <td>
            <input 
            type="text" 
            required="required" 
            placeholder='Enter a category...' 
            name="changeCategoryName">
            </input>
        </td>
    </tr>
  )
}
