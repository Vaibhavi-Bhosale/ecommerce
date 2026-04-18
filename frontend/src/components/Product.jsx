import { Link } from "react-router-dom";
import useAuth from "../context/useAuth";

function ProductCard({ product, handleAddToCart, addingId }) {
  const productId = product._id || product.id;
  const {isAdmin} = useAuth();

  return (
    <div
      key={productId}
      className="neo-card overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      {/* Image */}
      <div className="h-48 w-full bg-[color:color-mix(in_srgb,var(--bg-soft)_70%,transparent)] flex items-center justify-center overflow-hidden">
  {product.image ? (
    <img
      src={product.image}
      alt={product.name}
      className="h-full w-full object-fit transition-transform duration-300 hover:scale-105"
    />
  ) : (
    <div className="flex items-center justify-center h-full text-sm text-[color:var(--text-muted)]">
      No image
    </div>
  )}
</div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        
        {/* Name */}
        <h2 className="font-semibold text-[color:var(--text)] text-sm line-clamp-2 mb-1">
          {product.name}
        </h2>

        {/* Category */}
        {product.category && (
          <p className="text-xs text-[color:var(--text-muted)] mb-1">
            {product.category}
          </p>
        )}

        {/* Price */}
        <p className="text-[color:var(--primary-strong)] font-black mb-2">
          ₹{product.price}
        </p>

        {/* Description */}
        <p className="text-xs text-[color:var(--text-muted)] line-clamp-3 mb-3">
          {product.description}
        </p>

        {/* Actions */}
        <div className="mt-auto flex gap-2">
          
          {/* View */}
          <Link
            to={`/products/${productId}`}
            className="flex-1 inline-flex items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--text)_14%,transparent)] px-2 py-1.5 text-xs font-semibold text-[color:var(--text)] hover:bg-[color:color-mix(in_srgb,var(--surface-2)_45%,transparent)]"
          >
            View
          </Link>

          {/* Add to Cart */}

          {!isAdmin && (
            <button
              type="button"
              onClick={() => handleAddToCart(productId)}
              disabled={addingId === productId}
              className="flex-1 inline-flex items-center justify-center rounded-full bg-[color:var(--primary)] px-2 py-1.5 text-xs font-semibold text-white hover:opacity-90 disabled:opacity-50 cursor-pointer"
            >
              {addingId === productId ? "Adding..." : "Add to cart"}
            </button>
          )
        }
             
        </div>
      </div>
    </div>
  );
}

export default ProductCard;