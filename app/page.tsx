import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen bg-yellow-100">
      <header className="bg-white py-4">
        <nav className="container mx-auto flex justify-between">
          <div className="text-lg font-bold">Family App</div>
          <div className="flex gap-4">
            <Link href="/login" className="text-blue-600 hover:text-blue-800">Login</Link>
            <Link href="/signup" className="text-blue-600 hover:text-blue-800">Signup</Link>
          </div>
        </nav>
      </header>
      <main className="container mx-auto p-4 mt-4">
        <section className="bg-white p-8 rounded shadow-md">
          <h1 className="text-3xl font-bold mb-4">Welcome to Family App</h1>
          <p className="text-lg mb-8">Family is not just an important thing. It's everything. Here, we aim to bring
            families closer by providing a platform to share, care, and love.</p>
          <Link href="/dashboard">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get Started
            </button>
          </Link>
        </section>
      </main>
    </div>
  );
}
