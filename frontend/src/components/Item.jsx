/* eslint-disable react/prop-types */
import "../styles/Note.css"

const Item = ({item, onDelete}) => {
    const formattedDate = new Date(item.created_at).toLocaleDateString("en-US")
  return (
    <div className="note-container">
        <p className="note-title">{item.name}</p>
        <p className="note-content">{item.description}</p>
        <p className="note-content">{item.category}</p>
        <p className="note-content">{item.price}</p>
        <p className="note-content">{item.quantity}</p>
        {item.image && <img src={item.image} alt={item.name} style={{ width: "200px", height: "auto" }} />}
        <p className="note-date">{formattedDate}</p>
        <button className="delete-button" onClick={() => onDelete(item.id)}>Delete</button>
    </div>
  )
}

export default Item