import React from 'react'
import { assets, footer_data } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-12 pb-10 border-b border-gray-300/40">
          
          {/* Logo + About */}
          <div className="max-w-md">
            <img src={assets.logo} alt="logo" className="w-36 sm:w-44 mb-4" />
            <p className="text-gray-600 text-sm leading-relaxed">
              QuickBlog helps you stay updated with the latest tech trends, insights, and tutorials. 
              Join our community and explore the world of technology through engaging articles and guides.
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap justify-between w-full md:w-[50%] gap-8">
            {footer_data.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-gray-900 text-lg mb-3">
                  {section.title}
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="hover:text-primary hover:underline transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <p className="pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} <span className="font-medium text-gray-700">QuickBlog</span>. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
