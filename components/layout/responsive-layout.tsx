"use client"

import { useState, useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import Navbar from "./navbar"
import Footer from "./footer"
import TopSection from "./top-section"
import { Menu, X } from "lucide-react"

const ResponsiveLayout = () => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const hideFooterOnPaths = ["/messages", "/signin", "/signup"]
  const shouldHideFooter = hideFooterOnPaths.includes(location.pathname)

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0A0B10] to-black">
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed top-4 left-4 z-50 p-2 bg-[#151821] rounded-lg text-white md:hidden"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={`
          ${isMobile ? "fixed inset-y-0 left-0 z-40" : "relative"}
          ${isMobile && !isMobileMenuOpen ? "-translate-x-full" : "translate-x-0"}
          w-64 transition-transform duration-300 ease-in-out
          ${isMobile ? "bg-[#0B0C14]" : ""}
        `}
        >
          <Navbar />
        </aside>

        {/* Mobile Overlay */}
        {isMobile && isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setIsMobileMenuOpen(false)} />
        )}

        {/* Main Content */}
        <div
          className={`
          flex-1 flex flex-col
          ${isMobile ? "w-full" : "w-[calc(100%-256px)]"}
        `}
        >
          {/* Top Section */}
          <header className="sticky top-0 z-20">
            <TopSection placeholderText="Search anything globally" />
          </header>

          {/* Content Area */}
          <main className="flex-1 relative">
            <div className="flex min-h-full">
              {/* Page Content */}
              <div
                className={`
                flex-1 
                ${!shouldHideFooter && !isMobile ? "pr-80" : ""}
              `}
              >
                <Outlet />
              </div>

              {/* Footer/Sidebar */}
              {!shouldHideFooter && !isMobile && (
                <aside className="fixed right-0 top-[100px] w-80 h-[calc(100vh-100px)] overflow-y-auto">
                  <Footer />
                </aside>
              )}
            </div>
          </main>

          {/* Mobile Footer */}
          {!shouldHideFooter && isMobile && (
            <footer className="mt-auto">
              <Footer />
            </footer>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResponsiveLayout
