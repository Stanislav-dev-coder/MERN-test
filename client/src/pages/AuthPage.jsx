import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const AuthPage = () => {

  const auth = useContext(AuthContext)
  const {loading, error, request} = useHttp()

  const [form, setForm] = useState({
    email:'',
    password:''
  }) 

  useEffect(() => {
    
  }, [error])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
      console.log('data = ', data.message)
    } catch (e) {
      
    }
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      auth.login(data.token, data.userId)
    } catch (e) {
      
    }
  }

  return(
    <div className="container">
      <h1>Auth page</h1>
      <div>
        <input 
          type="text"
          placeholder="Ente email"
          id="email"
          name="email"
          value={ form.email }
          onChange={changeHandler}
        />
        <input 
          type="password"
          placeholder="Enter password"
          id="password"
          name="password"
          value={ form.password }
          onChange={changeHandler}
        />
        <button onClick={loginHandler} disabled={loading} >Log in</button>
        <button onClick={registerHandler} disabled={loading} >Registration</button>
      </div>
    </div>
  )
}