import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import useAuth from "../context/useAuth";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addingId, setAddingId] = useState(null);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data || []);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    setAddingId(product._id || product.id);
    try {
      await api.post("/cart/addToCart", {
        productId: product._id || product.id,
        quantity: 1,
      });
      alert("Added to cart");
    } catch (err) {
      alert("Failed to add to cart");
    } finally {
      setAddingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <span className="text-gray-600">Loading products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
          <p className="text-sm text-gray-600">
            Browse our catalog and add items to your cart.
          </p>
        </div>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-600">No products available.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id || product.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col"
            >
              <Link
                to={`/products/${product._id || product.id}`}
                className="block"
              >
                <div className="h-40 w-full flex items-center justify-center overflow-hidden rounded-t-lg bg-gray-50">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain p-3"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">No image</span>
                  )}
                </div>
              </Link>

              <div className="flex-1 flex flex-col p-4">
                <h2 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
                  {product.name}
                </h2>
                {product.category && (
                  <p className="text-xs text-gray-500 mb-1">
                    {product.category}
                  </p>
                )}
                <p className="text-emerald-600 font-bold mb-2">
                  ${product.price}
                </p>
                <p className="text-xs text-gray-600 line-clamp-3 mb-3">
                  {product.description}
                </p>

                <div className="mt-auto flex gap-2">
                  <Link
                    to={`/products/${product._id || product.id}`}
                    className="inline-flex-1 flex-1 inline-flex items-center justify-center rounded-md border border-gray-300 px-2 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                  >
                    View
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    disabled={addingId === (product._id || product.id)}
                    className="flex-1 inline-flex items-center justify-center rounded-md bg-blue-600 px-2 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    {addingId === (product._id || product.id)
                      ? "Adding..."
                      : "Add to cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
