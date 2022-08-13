import React from 'react'

export const EditableRow = () => {
  return (
    <tr>
        <td>{e.id}</td>
        <td>{e.name}</td>
        <td>{e.price}</td>
        <td>{e.store.name}</td>
        <td>{e.category.name}</td>
    </tr>
  )
}
