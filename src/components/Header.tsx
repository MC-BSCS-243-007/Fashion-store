import { useState } from 'react'

interface HeaderProps {
  cartCount: number
}

function Header({ cartCount }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">Fashion Store</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#men" className="text-gray-700 hover:text-gray-900 font-medium transition">
              Men
            </a>
            <a href="#women" className="text-gray-700 hover:text-gray-900 font-medium transition">
              Women
            </a>
            <a href="#children" className="text-gray-700 hover:text-gray-900 font-medium transition">
              Children
            </a>
            <a href="#about" className="text-gray-700 hover:text-gray-900 font-medium transition">
              About
            </a>
          </div>

          {/* Cart Icon */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <svg
                className="w-6 h-6 text-gray-700 cursor-pointer hover:text-gray-900 transition"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              title="Open Menu"
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            <a
              href="#men"
              className="block text-gray-700 hover:text-gray-900 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Men
            </a>
            <a
              href="#women"
              className="block text-gray-700 hover:text-gray-900 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Women
            </a>
            <a
              href="#children"
              className="block text-gray-700 hover:text-gray-900 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Children
            </a>
            <a
              href="#about"
              className="block text-gray-700 hover:text-gray-900 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header

