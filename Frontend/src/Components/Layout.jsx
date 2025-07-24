import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Searchbar from './TopSection';

const Layout = () => {
  const location = useLocation();
  const hideFooterOnPaths = []; // Add paths where you want to hide the footer
  const shouldHideFooter = hideFooterOnPaths.includes(location.pathname);

  return (
    <div className='min-h-screen flex'>
      <header className='w-[266px] max-lg:hidden'>
        <Navbar />
      </header>
      <section className='relative w-full lg:w-[calc(100%-266px)]'>
        <Searchbar placeholderText={"Search anything globally"}/>
        <div className="relative flex top-[100px]">
          <Outlet />
          {!shouldHideFooter && (
            <footer className=''>
              <Footer />
            </footer>
          )}
        </div>
      </section>
    </div>
  )
}

export default Layout