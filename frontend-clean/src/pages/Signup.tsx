export default function Signup() {
  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl font-semibold mb-2">Signup</h1>
      <input className="mb-2 border px-2 py-1 rounded" placeholder="Email" />
      <input className="mb-2 border px-2 py-1 rounded" type="password" placeholder="Password" />
      <button className="bg-green-600 text-white px-4 py-2 rounded">Signup</button>
    </div>
  )
}
