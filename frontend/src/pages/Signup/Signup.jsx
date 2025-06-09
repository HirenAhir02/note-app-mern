import React, { useState } from 'react'
import Passwordinput from '../../Components/Input/Passwordinput'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import axios from 'axios'
import { toast } from 'react-toastify'

function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()

    if (!name) {
      setError("Please enter a name")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email")
      return
    }

    if (!password) {
      setError("Please enter a password")
      return
    }

    setError("")

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/signup",
        { username: name, email, password },
        { withCredentials: true }
      )

      if (res.data.success === false) {
        toast.error(res.data.message)
        setError(res.data.message)
        return
      }

      toast.success(res.data.message)
      setError("")
      navigate("/login")
    } catch (error) {
      toast.error(error.message)
      setError(error.message)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen px-4'>
      <div className='w-full sm:w-[90%] md:w-[400px] bg-white px-6 py-10 rounded-lg shadow-lg'>
        <form onSubmit={handleSignup}>
          <h4 className='text-2xl font-semibold mb-7 text-center'>Sign Up</h4>

          <input
            type="text"
            placeholder='Name'
            className='input-box w-full mb-4'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder='Email'
            className='input-box w-full mb-4'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Passwordinput
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          {error && <p className='text-red-500 text-sm pb-2'>{error}</p>}

          <button type='submit' className='btn-primary w-full mt-2'>Sign Up</button>

          <p className='text-sm text-center mt-4'>
            Already have an account?{" "}
            <Link to={"/login"} className='font-medium underline text-[#2B85FF]'>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signup
