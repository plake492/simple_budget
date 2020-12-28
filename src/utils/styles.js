const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: '1rem',
  background: isDragging ? '#e8e8ee' : null,
  ...draggableStyle
})

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'hsl(240,14,90)' : null,
  width: '%100'
})

const underline = () => ({
  borderBottom: 'black 1px solid',
  fontWeight: '700'
})

export {
  getItemStyle,
  getListStyle,
  underline
}
