import ProductCard from './ProductCard'

interface ChildrenSectionProps {
  onAddToCart: () => void
}

function ChildrenSection({ onAddToCart }: ChildrenSectionProps) {
  const childrenProducts = [
    { id: 13, name: 'Kids T-Shirt', price: 19.99, description: 'Colorful and fun', image: '' },
    { id: 14, name: 'School Uniform', price: 39.99, description: 'Comfortable for school', image: '' },
    { id: 15, name: 'Play Dress', price: 29.99, description: 'Perfect for playtime', image: '' },
    { id: 16, name: 'Sneakers', price: 49.99, description: 'Durable and comfortable', image: '' },
    { id: 17, name: 'Winter Jacket', price: 59.99, description: 'Warm and cozy', image: '' },
    { id: 18, name: 'Swimwear Set', price: 24.99, description: 'Beach ready', image: '' },
  ]

  return (
    <section id="children" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
          Children's Collection
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {childrenProducts.map((product) => (
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

export default ChildrenSection

