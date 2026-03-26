import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import useAuth from "../context/useAuth";
import { getSingleProduct } from "../api/productApi";


export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
       const res =  await getSingleProduct(id);

       if(!res.success)
       {
           
           setError(res.error);
           console.log(res.error);
       }
       else{
           setProduct(res.data);
           console.log(res.data);
           setLoading(false)
       }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      await api.post("/cart/addToCart", {
        productId: product._id || product.id || id,
        quantity: 1,
      });
      alert("Added to cart");
    } catch (err) {
      setError("Failed to add to cart");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <span className="text-gray-600">Loading product...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto py-10">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto py-10">
        <p className="text-gray-600">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 grid gap-8 md:grid-cols-2">
      <div className="rounded-lg overflow-hidden bg-white shadow-sm flex items-center justify-center">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-72 w-full object-contain p-4"
          />
        ) : (
          <div className="h-72 w-full flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
      </div>

      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          {product.name}
        </h1>
        <p className="text-emerald-600 text-xl font-bold mb-4">
          ${product.price}
        </p>
        {product.category && (
          <p className="text-sm text-gray-500 mb-2">
            Category:{" "}
            <span className="font-medium text-gray-700">
              {product.category}
            </span>
          </p>
        )}
        <p className="text-gray-700 mb-6">
          {product.description || "No description available."}
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={submitting}
            className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? "Adding..." : "Add to cart"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

