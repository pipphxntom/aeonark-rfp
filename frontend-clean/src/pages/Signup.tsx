import { useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../contexts/AuthContext'

export default function Signup() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post('/signup', { name, email, password })
      login(res.data.token, res.data.user)
      alert('Signup successful!')
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Signup failed')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input
        type="text"
        placeholder="Name"
        className="border p-2"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="border p-2"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2">
        Signup
      </button>
    </form>
  )
}
