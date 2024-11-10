import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="flex justify-between items-center mb-6">
        <NavLink to="/">
          <img alt="Microcourses" className="h-16" src="https://i.imghippo.com/files/zFciz1727928064.png"></img>
        </NavLink>

      </nav>
    </div>
  );
}