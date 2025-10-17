import { ShoppingCart, Store } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "./../context/ContextProvider.jsx";

export default function Header() {
  const { getCartItemsCount,items } = useCart();
  const location = useLocation();
  const totalItems =getCartItemsCount();


  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-foreground hover:text-primary transition-colors"
          >
            <Store className="h-6 w-6" />
            ShopEase
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === "/"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              Products
            </Link>
            <Link to="/cart">
              <button  className="relative inline-flex items-center border py-1 px-4 rounded-md ">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full text-xs h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
