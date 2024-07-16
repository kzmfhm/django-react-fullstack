import "../styles/Form.css"
import NotFoundImg from "../components/NotFoundImg"

const NotFound = () => {
  return (
    <div className="not-found-container">
    <div className="not-found">
      <NotFoundImg/>
      <h1>Oops! 404 Not Found</h1>
      <p className="not-found">Something went wrong! This page does not exist.</p>
    </div>
    </div>
  )
}

export default NotFound