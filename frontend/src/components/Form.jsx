/* eslint-disable react/prop-types */

import "../styles/Form.css"
import { useNavigate } from 'react-router-dom'
import api from '../api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import { useState } from 'react'
import LoadingIndicator from "./LoadingIndicator"

const Form = ({route, method}) => {
    const [username,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === "login" ? "Login" : "Register"

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        try {
          const res = await api.post(route,{username,password})
          if(method === "login"){
            localStorage.setItem(ACCESS_TOKEN, res.data.access)
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
            navigate("/")
          } else {
            navigate("/login")
          }
        } catch (error) {
          alert(error)
        } finally {
          setLoading(false)
        }
    }
  return (
    <form onSubmit={handleSubmit} className='form-container'>
        <h1>{name}</h1>
        <input
            type="text" 
            className='form-input'
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            placeholder='username'
        />
          <input
            type="text" 
            className='form-input'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password'
        />
        {loading && <LoadingIndicator/>}
        <button className='form-button' type='submit'>{name}</button>
    </form>
  )
}

export default Form