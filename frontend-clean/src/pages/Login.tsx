export default function Login() {
  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl font-semibold mb-2">Login</h1>
      <input className="mb-2 border px-2 py-1 rounded" placeholder="Email" />
      <input className="mb-2 border px-2 py-1 rounded" type="password" placeholder="Password" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
    </div>
  )
}
