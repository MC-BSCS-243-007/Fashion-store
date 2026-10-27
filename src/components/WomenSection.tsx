import ProductCard from './ProductCard'

interface WomenSectionProps {
  onAddToCart: () => void
}

function WomenSection({ onAddToCart }: WomenSectionProps) {
  const womenProducts = [
    { id: 7, name: 'Floral Dress', price: 69.99, description: 'Elegant summer dress', image: '' },
    { id: 8, name: 'High-Waist Jeans', price: 89.99, description: 'Perfect fit and style', image: '' },
    { id: 9, name: 'Blazer', price: 129.99, description: 'Professional and chic', image: '' },
    { id: 10, name: 'Maxi Skirt', price: 54.99, description: 'Flowing and comfortable', image: '' },
    { id: 11, name: 'Crop Top', price: 34.99, description: 'Trendy and fashionable', image: '' },
    { id: 12, name: 'Winter Coat', price: 149.99, description: 'Warm and stylish', image: '' },
  ]

  return (
    <section id="women" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
          Women's Collection
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {womenProducts.map((product) => (
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

export default WomenSection

