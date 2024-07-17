
// import { useState,useEffect } from "react"
// import api from "../api"
// import "../styles/Home.css"
// import Note from "../components/Note"
// import Item from "../components/Item"

// const Home = () => {
//   const [notes, setNotes] = useState([]);
//   const [content, setContent] = useState("");
//   const [title, setTitle] = useState("")
//   const [items, setItems ] = useState([]);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState(0);
//   const [quantity,setQuantity] = useState(0)

//   // useEffect(() => {
//   //   getNotes(),
//   //   getItem()
//   // },[])


//   const getNotes = () => {
//       api
//       .get("/api/notes/")
//       .then((res) => res.data)
//       .then((data) => {setNotes(data); console.log(data)})
//       .catch((err) => alert(err));
//   }

//   const deleteNotes = (id) => {
//       api
//       .delete(`/api/notes/delete/${id}/`)
//       .then((res) => {
//         if(res.status === 204) alert("Note deleted successfully")
//        else alert("failed to delete note");
//       getNotes()
//       }
    
//     ).catch((err) => alert(err))
 
//   }

//   const createNote = (e) => {
//     e.preventDefault()
//     api
//     .post("/api/notes/",{content,title})
//     .then((res) => {
//       if(res.status === 201)
//         alert("Note create successfully")
//       else alert("failed to create note");
//       getNotes()
//     }).catch((err) => alert(err))

//   }

//   const getItem = () => {
//     api
//     .get("/api/items/")
//     .then((res) => res.data)
//     .then((data) => {setItems(data); console.log(data)})
//     .catch((err) => alert(err));
// }

// const deleteItem = (id) => {
//     api
//     .delete(`/api/items/delete/${id}/`)
//     .then((res) => {
//       if(res.status === 204) alert("Item deleted successfully")
//      else alert("failed to delete Item");
//     getItem()
//     }
  
//   ).catch((err) => alert(err))

// }

// const createItem = (e) => {
//   e.preventDefault()
//   api
//   .post("/api/items/",{name,description,price,quantity})
//   .then((res) => {
//     if(res.status === 201)
//       alert("Item create successfully")
//     else alert("failed to create Item");
//     getItem()
//   }).catch((err) => alert(err))

// }
//   return (
//     <div className="container">
//       <div><h2>Notes</h2>
//       {notes.map((note) => <Note key={note.id} note={note} onDelete={deleteNotes}/>)}
//       </div>
//       <h2>Create a note</h2>
//       <form onSubmit={createNote}>
//         <label htmlFor="title">Title:</label>
//         <br/>
//         <input 
//           type="text" 
//           id="title" 
//           name="title" 
//           required 
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <label htmlFor="content">Content:</label>
//         <br/>
//         <textarea 
//           name="content" 
//           id="content" 
//           required 
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         >
//         </textarea>
//         <br/>
//         <input type="submit" value="Submit"/>
//       </form>
//       {/* item */}
//       <div><h2>Items</h2>
//       {items.map((item) => <Item key={item.id} note={item} onDelete={deleteItem}/>)}
//       </div>
//       <h2>Create an Item</h2>
//       <form onSubmit={createItem}>
//         <label htmlFor="title">Name:</label>
//         <br/>
//         <input 
//           type="text" 
//           id="name" 
//           name="name" 
//           required 
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <label htmlFor="description">Description:</label>
//         <br/>
//         <textarea 
//           name="description" 
//           id="description" 
//           required 
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         >
//         </textarea>
//         <br/>
//         <label htmlFor="price">Price:</label>
//         <br/>
//         <input
//           type="text" 
//           name="price" 
//           id="price" 
//           required 
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//         >
//         </input>
//         <br/>
//         <label htmlFor="quantity">quantity:</label>
//         <input
//           type="text" 
//           name="quantity" 
//           id="quantity" 
//           required 
//           value={quantity}
//           onChange={(e) => setQuantity(e.target.value)}
//         >
//         </input>
//         <br/>
//         <input type="submit" value="Submit"/>
//       </form>
//     </div>
//   )
// }

// export default Home
import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Home.css";
import Note from "../components/Note";
import Item from "../components/Item";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    fetchData("/api/notes/", setNotes);
    fetchData("/api/items/", setItems);
  }, []);

  const fetchData = async (endpoint, setter) => {
    try {
      const res = await api.get(endpoint);
      setter(res.data);
      console.log(res.data);
    } catch (err) {
      alert(err);
    }
  };

  const deleteData = async (endpoint, id, fetchFunction) => {
    try {
      const res = await api.delete(`${endpoint}${id}/`);
      if (res.status === 204) {
        alert("Deleted successfully");
      } else {
        alert("Failed to delete");
      }
      fetchFunction();
    } catch (err) {
      alert(err);
    }
  };

  const createData = async (endpoint, data, fetchFunction) => {
    try {
      const res = await api.post(endpoint, data);
      if (res.status === 201) {
        alert("Created successfully");
      } else {
        alert("Failed to create");
      }
      fetchFunction();
    } catch (err) {
      alert(err);
    }
  };

  const handleCreateNote = (e) => {
    e.preventDefault();
    createData("/api/notes/", { content, title }, () => fetchData("/api/notes/", setNotes));
  };

  const handleCreateItem = (e) => {
    e.preventDefault();
    createData("/api/items/", { name, description, price, quantity }, () => fetchData("/api/items/", setItems));
  };

  return (
    <div className="container">
      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <Note key={note.id} note={note} onDelete={(id) => deleteData("/api/notes/delete/", id, () => fetchData("/api/notes/", setNotes))} />
        ))}
      </div>
      <h2>Create a Note</h2>
      <form onSubmit={handleCreateNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input type="text" id="title" name="title" required value={title} onChange={(e) => setTitle(e.target.value)} />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea name="content" id="content" required value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        <br />
        <input type="submit" value="Submit" />
      </form>

      <div>
        <h2>Items</h2>
        {items.map((item) => (
          <Item key={item.id} item={item} onDelete={(id) => deleteData("/api/items/delete/", id, () => fetchData("/api/items/", setItems))} />
        ))}
      </div>
      <h2>Create an Item</h2>
      <form onSubmit={handleCreateItem}>
        <label htmlFor="name">Name:</label>
        <br />
        <input type="text" id="name" name="name" required value={name} onChange={(e) => setName(e.target.value)} />
        <label htmlFor="description">Description:</label>
        <br />
        <textarea name="description" id="description" required value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        <br />
        <label htmlFor="price">Price:</label>
        <br />
        <input type="number" name="price" id="price" required value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
        <br />
        <label htmlFor="quantity">Quantity:</label>
        <br />
        <input type="number" name="quantity" id="quantity" required value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Home;
