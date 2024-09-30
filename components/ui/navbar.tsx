export default function Navbar() {
    return (
      <nav className="w-full flex justify-between items-center py-4 px-8 sticky top-0 bg-white z-10  shadow-md">
       <div className="flex items-center">

        <a href="/" className="text-xl  text-black hover:underline mx-4">Etas</a>
        <a href="/change_status_basic" className="text-xl  text-black hover:underline mx-4">Update</a>
        <a href="/update_status" className="text-xl  text-black hover:underline mx-4">Smart Update</a>
        </div>
      </nav>
    );
  }