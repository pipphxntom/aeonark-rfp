import { useAuth } from '../components/AuthProvider'

export default function Profile() {
  const { user } = useAuth()
  if (!user) return <div>Not logged in.</div>
  return (
    <div>
      <h2>Profile</h2>
      <p>Email: {user.email}</p>
    </div>
  )
}
