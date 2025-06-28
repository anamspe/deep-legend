function NavBar() {
  return (
    <nav className="bg-blue-900 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center max-w-5xl mx-auto">
        <h1 className="text-xl font-bold">Deep Legend</h1>
        <div className="space-x-6">
          <a href="#" className="hover:underline">
            Home
          </a>
          <a href="#" className="hover:underline">
            About
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
