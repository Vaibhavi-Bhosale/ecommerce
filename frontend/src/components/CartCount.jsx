 
import useCart from '../context/useCart';


function CartCount() {

    const {count} = useCart();

    
    
  return (
    <div>
        CartItem
        <span>{count}</span>
    </div>
  )
}

export default CartCount
