import React from 'react'
import { format } from 'date-fns'
import { add$ } from '../utils/helpers'
import { Draggable } from 'react-beautiful-dnd'
import { getItemStyle } from '../utils/styles'

function TableRow ({
  transactionArr,
  currentBalance,
  displayLineItem
}) {
  return (
    <>
      {transactionArr
        ? transactionArr.map((item, index) => {
          return (
            <Draggable key={item._id} draggableId={item._id} index={index}>
              {(provided, snapshot) => (
                (
                  <tr
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}

                    className='table_row'
                    id={item._id}
                    onClick={(e) => displayLineItem(e.target.parentElement.id)}
                  >
                    <th>{format(item.date, 'LL/dd')}</th>
                    <td>{item.paidTo}</td>
                    <td>{item.category}</td>
                    <td>{/* add $ */ add$(item.withdrawlAmount)}</td>
                    <td>{/* add $ */ add$(item.depositAmount)}</td>
                    <td>{/* add $ */ add$(item.currentBalance)}</td>
                  </tr>
                )
              )}
            </Draggable>
          )
        }) : (<tr><td>no records</td></tr>)}
    </>
  )
}

export default TableRow
