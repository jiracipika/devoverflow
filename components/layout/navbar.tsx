import { NavLink, Link } from "react-router-dom"
import { Home, Star, Tag, Users, HelpCircle, LogOut, FileText, MessageCircle } from "lucide-react"

const Navbar = () => {
  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/collections", icon: Star, label: "Collections" },
    { to: "/tags", icon: Tag, label: "Tags" },
    { to: "/communitiesbytags", icon: Users, label: "Communities" },
    { to: "/ask-a-question", icon: HelpCircle, label: "Ask a Question" },
    { to: "/blog", icon: FileText, label: "Blog" },
    { to: "/messages", icon: MessageCircle, label: "Messages" },
  ]

  return (
    <nav className="text-white py-6 px-4 min-h-screen flex flex-col justify-between bg-[#0B0C14] overflow-y-auto">
      <div className="flex flex-col w-full gap-6">
        <Link to="/" className="px-4 py-2 text-lg font-bold truncate">
          DevOverflow
        </Link>

        <ul className="flex flex-col gap-2 w-full">
          {navItems.map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-lg w-full
                  text-sm sm:text-base font-medium transition-all duration-200
                  hover:bg-white/10
                  ${isActive ? "bg-custom-gradient text-white" : "text-gray-300"}
                `}
              >
                <Icon size={20} className="flex-shrink-0" />
                <span className="truncate">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <NavLink
        to="/signin"
        className="flex items-center gap-3 px-4 py-3 text-sm sm:text-base text-gray-300 hover:text-white transition-colors"
      >
        <LogOut size={20} className="flex-shrink-0" />
        <span className="truncate">Log Out</span>
      </NavLink>
    </nav>
  )
}

export default Navbar
