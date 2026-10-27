import ProductCard from './ProductCard'

interface MenSectionProps {
  onAddToCart: () => void
}

function MenSection({ onAddToCart }: MenSectionProps) {
  const menProducts = [
    { id: 1, name: 'Classic T-Shirt', price: 29.99, description: 'Comfortable cotton t-shirt', image: '' },
    { id: 2, name: 'Denim Jeans', price: 79.99, description: 'Premium quality denim', image: '' },
    { id: 3, name: 'Hooded Sweatshirt', price: 59.99, description: 'Warm and cozy', image: '' },
    { id: 4, name: 'Formal Shirt', price: 49.99, description: 'Perfect for office wear', image: '' },
    { id: 5, name: 'Casual Shorts', price: 39.99, description: 'Summer essential', image: '' },
    { id: 6, name: 'Leather Jacket', price: 199.99, description: 'Stylish and durable', image: '' },
  ]

  return (
    <section id="men" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
          Men's Collection
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default MenSection

