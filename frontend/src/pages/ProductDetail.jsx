import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import useAuth from "../context/useAuth";
import { getSingleProduct } from "../api/productApi";
import { toast } from "react-toastify";


export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
 

  useEffect(() => {
    const fetchProduct = async () => {
       const res =  await getSingleProduct(id);

       if(!res.success)
       {
           
           toast.error(res.error)
           console.log(res.error);
           navigate("/")
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
        <span className="text-[color:var(--text-muted)]">Loading product...</span>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="max-w-3xl mx-auto py-10">
  //       <p className="text-red-600">{error}</p>
  //     </div>
  //   );
  // }

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto py-10">
        <p className="text-[color:var(--text-muted)]">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 grid gap-8 md:grid-cols-2">
      <div className="neo-card overflow-hidden flex items-center justify-center">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-72 w-full object-fit"
          />
        ) : (
          <div className="h-72 w-full flex items-center justify-center text-[color:var(--text-muted)]">
            No image
          </div>
        )}
      </div>

      <div>
        <h1 className="text-3xl font-black tracking-tight text-[color:var(--text)] mb-2">
          {product.name}
        </h1>
        <p className="text-[color:var(--primary-strong)] text-xl font-black mb-4">
          ${product.price}
        </p>
        {product.category && (
          <p className="text-sm text-[color:var(--text-muted)] mb-2">
            Category:{" "}
            <span className="font-semibold text-[color:var(--text)]">
              {product.category}
            </span>
          </p>
        )}
        <p className="text-[color:var(--text)]/90 mb-6">
          {product.description || "No description available."}
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={submitting}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[color:var(--primary)] text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? "Adding..." : "Add to cart"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-[color:color-mix(in_srgb,var(--text)_14%,transparent)] text-sm font-semibold text-[color:var(--text)] hover:bg-[color:color-mix(in_srgb,var(--surface-2)_45%,transparent)]"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

