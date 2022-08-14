import React from 'react'
                            //{editFormData, handleEditFormChange}
export const EditableRow = () => {
  return (
    <tr>
        <td>
            <input 
            type="text" 
            required="required" 
            placeholder='Enter an id...' 
            name="changeId">
            {/*value={editFormData.id}*/}
            {/*onChange={handleEditFormChange} */}
            </input>
        </td>
        <td>
            <input 
            type="text" 
            required="required" 
            placeholder='Enter a item name...' 
            name="changeName">
            {/*value={editFormData.name} */}
            {/*onChange={handleEditFormChange} */}
            </input>
        </td>
        <td>
            <input 
            type="text" 
            required="required" 
            placeholder='Enter an price...' 
            name="changePrice">
            {/* value={editFormData.price}*/}
            {/* onChange={handleEditFormChange}*/}
            </input>
        </td>
        <td>
            <input 
            type="text" 
            required="required" 
            placeholder='Enter a store name...' 
            name="changeStoreName">
            {/*value={editFormData.store.name} */}
            {/*onChange={handleEditFormChange} */}
            </input>
        </td>
        <td>
            <input 
            type="text" 
            required="required" 
            placeholder='Enter a category...' 
            name="changeCategoryName">
            {/* value={editFormData.category.name}*/}
            {/*onChange={handleEditFormChange} */}
            </input>
        </td>
        <td>
            <button type="submit">Save</button>
        </td>
    </tr>
  )
}
