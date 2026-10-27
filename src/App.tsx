import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import MenSection from './components/MenSection'
import WomenSection from './components/WomenSection'
import ChildrenSection from './components/ChildrenSection'
import Footer from './components/Footer'
import MovableButton from './components/MovableButton'


function App() {
  const [cartCount, setCartCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={cartCount} />
      <Hero />
      {/* Movable Button Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Interactive Challenge
            </h2>
            <p className="text-gray-600 text-lg">
              Test your reflexes and catch the moving button!
            </p>
          </div>
          <MovableButton />
        </div>
      </section>

      <MenSection onAddToCart={() => setCartCount(cartCount + 1)} />
      <WomenSection onAddToCart={() => setCartCount(cartCount + 1)} />
      <ChildrenSection onAddToCart={() => setCartCount(cartCount + 1)} />
      <Footer />
    </div>
  )
}

export default App

