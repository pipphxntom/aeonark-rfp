import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-gray-900 text-white">
      <div className="font-bold text-xl tracking-wide">
        <Link to="/">AeonRFP</Link>
      </div>
      <div className="space-x-4">
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/signup" className="hover:underline">Signup</Link>
      </div>
    </nav>
  )
}
