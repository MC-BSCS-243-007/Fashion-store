function Footer() {
  return (
    <footer id="about" className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Fashion Store</h3>
            <p className="text-gray-400">
              Your one-stop shop for trendy and affordable fashion for men, women, and children.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#men" className="hover:text-white transition">Men's Collection</a>
              </li>
              <li>
                <a href="#women" className="hover:text-white transition">Women's Collection</a>
              </li>
              <li>
                <a href="#children" className="hover:text-white transition">Children's Collection</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-400 mb-2">Email: info@fashionstore.com</p>
            <p className="text-gray-400 mb-2">Phone: +1 (555) 123-4567</p>
            <p className="text-gray-400">Address: 123 Fashion Street, Style City</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Fashion Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

