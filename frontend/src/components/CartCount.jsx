 
import useCart from '../context/useCart';


function CartCount({ className = "" }) {

    const {count} = useCart();

    
    
  return (
    <div className={`inline-flex items-center gap-2 rounded-full border border-[color:var(--bg-soft)] bg-[color:var(--surface)] px-3 py-1.5 text-xs font-semibold text-[color:var(--text)] ${className}`}>
      <span>Cart</span>
      <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-[color:var(--primary)] px-1.5 py-0.5 text-[10px] font-bold text-[color:var(--bg)]">
        {count}
      </span>
    </div>
  )
}

export default CartCount
