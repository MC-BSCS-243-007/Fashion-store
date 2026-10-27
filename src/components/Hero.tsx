function Hero() {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          Fashion for Everyone
        </h2>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Discover the latest trends in men's, women's, and children's clothing
        </p>
        <a
          href="#men"
          className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
        >
          Shop Now
        </a>
      </div>
    </section>
  )
}

export default Hero

