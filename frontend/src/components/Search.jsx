import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Search() {
  const [product, setProduct] = useState("");
  const navigate = useNavigate();

  const search = async () => {
    // console.log(product);

    // const res = await getSearchApi(product);
    // console.log(res.data);

    if(!product)
    {
      return
    }

    navigate(`/search?q=${product}`);
  };

  return (
    <div className="w-full min-w-0">
      <div className="w-full flex items-center gap-2">
        <input
          type="text"
          onChange={(e) => setProduct(e.target.value)}
          value={product}
          placeholder="Search products..."
          className="neo-input w-full min-w-0 rounded-full px-4 py-2 text-sm"
        />

        <button
          onClick={search}
          className="shrink-0 rounded-full bg-[color:var(--primary)] px-4 py-2 text-sm font-semibold text-[color:var(--bg)] hover:opacity-90"
        >
          Search
        </button>
      </div>
    </div>
  );
}
