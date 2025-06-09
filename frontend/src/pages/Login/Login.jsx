import React, { useState } from 'react'
import Passwordinput from '../../Components/Input/Passwordinput'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import { useDispatch } from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from '../../redux/user/userSlice'
import axios from 'axios'
import { toast } from 'react-toastify'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

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
      dispatch(signInStart())

      const res = await axios.post(
        "http://localhost:3000/api/auth/signin",
        { email, password },
        { withCredentials: true }
      )

      if (res.data.success === false) {
        toast.error(res.data.message)
        dispatch(signInFailure(res.data.message))
        return
      }

      toast.success(res.data.message)
      dispatch(signInSuccess(res.data))
      navigate("/")
    } catch (error) {
      toast.error(error.message)
      dispatch(signInFailure(error.message))
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen px-4'>
      <div className='w-full sm:w-[90%] md:w-[400px] bg-white px-6 py-10 rounded-lg shadow-lg'>
        <form onSubmit={handleLogin}>
          <h4 className='text-2xl font-semibold mb-7 text-center'>Login</h4>

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

          <button type='submit' className='btn-primary w-full mt-2'>LOGIN</button>

          <p className='text-sm text-center mt-4'>
            Not registered yet?{" "}
            <Link to={"/signup"} className='font-medium underline text-[#2B85FF]'>
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
