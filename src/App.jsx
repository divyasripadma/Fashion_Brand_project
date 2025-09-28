import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

// Axios instance pointing to backend
const api = axios.create({
    baseURL: "/api"
  });
  


const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "login", label: "Login" },
];

const categories = [
  {
    id: "clothes",
    title: "Clothes",
    img: "https://static.vecteezy.com/system/resources/thumbnails/028/246/030/small_2x/colourful-clothes-on-clothing-rack-pastel-colorful-closet-in-shopping-store-or-bedroom-rainbow-color-clothes-choice-on-hangers-home-wardrobe-concept-generative-ai-photo.jpg?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "bags",
    title: "Bags",
    img: "https://png.pngtree.com/thumb_back/fw800/background/20230523/pngtree-group-of-different-colored-handbags-image_2683927.jpg?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "watches",
    title: "Watches",
    img: "https://torange.biz/photo/52/HD/watches-photos-new-watch-52984.jpg?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "jewellery",
    title: "Jewellery",
    img: "https://i.ytimg.com/vi/XDmZ7QCTwMc/maxresdefault.jpg?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "footwear",
    title: "Footwear",
    img: "https://cdn.pixabay.com/photo/2020/10/23/09/52/shoes-5678260_1280.jpg?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "makeup kit",
    title: "Makeup Kit",
    img: "https://images.news18.com/ibnlive/uploads/2021/10/makeup-kit-16349877184x3.jpg"
  }
];

// products per category
const categoryProducts = {
    clothes: [
      {
        id: 1,
        name: "Classic White Shirt",
        price: 1499,
        img: "https://www.maharajastailors.com/wp-content/uploads/Solid_07.png?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 2,
        name: "Slim Fit Blue Shirt",
        price: 1699,
        img: "https://tie-house.com/wp-content/uploads/2023/02/IMG_7632web.jpg?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 3,
        name: "Casual Checked Shirt",
        price: 1799,
        img: "https://www.fields-menswear.com/images/pure-cotton-half-sleeve-check-shirt-navy-p3470-3869_image.jpg?auto=format&fit=crop&w=800&q=80",
      },
    ],
    bags: [
      {
        id: 4,
        name: "Leather Tote Bag",
        price: 2999,
        img: "https://i.pinimg.com/originals/fe/ca/7e/feca7ec20ae56ea2f74dbc3b2289e245.jpg?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 5,
        name: "Canvas Shoulder Bag",
        price: 1899,
        img: "https://d3d71ba2asa5oz.cloudfront.net/12016475/images/30622amg2.jpg?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 6,
        name: "Travel Duffel Bag",
        price: 2599,
        img: "https://m.media-amazon.com/images/I/712582xFnQL._AC_SL1500_.jpg?auto=format&fit=crop&w=800&q=80",
      },
    ],
    watches: [
      {
        id: 7,
        name: "Gold Wrist Watch",
        price: 4999,
        img: "https://cdna.lystit.com/photos/95ca-2014/08/19/seiko-gold-wrist-watch-product-1-22632645-1-761015654-normal.jpeg?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 8,
        name: "Smart Fitness Watch",
        price: 3299,
        img: "https://images-na.ssl-images-amazon.com/images/I/71yf6LutD7L._AC_SL1500_.jpg?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 9,
        name: "Classic Leather Watch",
        price: 4599,
        img: "https://primewatchhouse.com/wp-content/uploads/2022/12/Silver-Camel.jpg?auto=format&fit=crop&w=800&q=80",
      },
    ],
    jewellery: [
      {
        id: 10,
        name: "Diamond Necklace",
        price: 9999,
        img: "https://i.pinimg.com/originals/66/e9/4c/66e94cb0e9757738527550e7fd55bf65.jpg?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 11,
        name: "Gold Earrings",
        price: 3999,
        img: "https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw52dce960/images/hi-res/513220DDCABA00.jpg?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 12,
        name: "Silver Bracelet",
        price: 2999,
        img: "https://i.etsystatic.com/9213817/r/il/76b632/2843363050/il_1140xN.2843363050_bhmt.jpg?auto=format&fit=crop&w=800&q=80",
      },
    ],
    footwear: [
      {
        id: 13,
        name: "Running Shoes",
        price: 2499,
        img: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5817.png?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 14,
        name: "Casual Sneakers",
        price: 1899,
        img: "https://d1fufvy4xao6k9.cloudfront.net/images/blog/posts/2023/04/imagetools0_3026.jpg?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 15,
        name: "Leather Formal Shoes",
        price: 3499,
        img: "https://www.horex.in/wp-content/uploads/2019/05/2187_Black-NDM-1.jpg?auto=format&fit=crop&w=800&q=80",
      },
    ],
    "makeup kit": [
      {
        id: 16,
        name: "Complete Makeup Kit",
        price: 1999,
        img: "https://images.news18.com/ibnlive/uploads/2021/10/makeup-kit-16349877184x3.jpg",
      },
      {
        id: 17,
        name: "Professional Eye Palette",
        price: 1599,
        img: "https://www.gosupps.com/media/catalog/product/cache/25/image/1500x/040ec09b1e35df139433887a97daa66f/6/1/61V1Bmt0MtL._SL1000_.jpg?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 18,
        name: "Lipstick Collection",
        price: 999,
        img: "https://1.bp.blogspot.com/-L6umyBktBzs/T2eTdLLJGfI/AAAAAAAAAPI/l5gDNTOD7Ow/s1600/collection2.jpg?auto=format&fit=crop&w=800&q=80",
      },
    ],
  };
  

function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}

// function App() {
//     const [cart, setCart] = useState({});           // { productId: qty }
//     const [authPage, setAuthPage] = useState("none");
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [user, setUser] = useState(null);         // email
//     const [token, setToken] = useState(null);
//     const [nextAfterLogin, setNextAfterLogin] = useState(null);
  
//     // Login/Signup inputs
//     const [loginEmail, setLoginEmail] = useState("");
//     const [loginPass, setLoginPass] = useState("");
//     const [signupEmail, setSignupEmail] = useState("");
//     const [signupPass, setSignupPass] = useState("");
  
//     // Cart helpers
//     function addToCart(product) {
//       setCart((prev) => ({ ...prev, [product.id]: (prev[product.id] || 0) + 1 }));
//     }
//     function increaseQty(product) { addToCart(product); }
//     function decreaseQty(product) {
//       setCart((prev) => {
//         const updated = { ...prev };
//         if (updated[product.id] > 1) updated[product.id] -= 1;
//         else delete updated[product.id];
//         return updated;
//       });
//     }
  
//     function goHome() {
//       setAuthPage("none");
//       setSelectedCategory(null);
//     }
  
//     // Build cart details
//     const allProducts = Object.values(categoryProducts).flat();
//     const cartItems = Object.keys(cart).map((id) => {
//       const product = allProducts.find((p) => p.id === Number(id));
//       return { ...product, quantity: cart[id] };
//     });
//     const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
//     // Auth handlers
//     async function handleSignup() {
//       try {
//         await api.post("/signup", { email: signupEmail.trim(), password: signupPass.trim() });
//         alert("Signup successful. Please login.");
//         setAuthPage("login");
//         setLoginEmail(signupEmail);
//         setSignupEmail(""); setSignupPass("");
//       } catch (err) {
//         alert(err.response?.data?.error || "Signup failed");
//       }
//     }
  
//     async function handleLogin() {
//       try {
//         const res = await api.post("/login", { email: loginEmail.trim(), password: loginPass.trim() });
//         setToken(res.data.token);
//         setUser(loginEmail.trim());
//         setLoginEmail(""); setLoginPass("");
  
//         // If we were headed to a protected page (payment), go there
//         if (nextAfterLogin) {
//           setAuthPage(nextAfterLogin);
//           setNextAfterLogin(null);
//         } else {
//           setAuthPage("none");
//         }
//       } catch (err) {
//         const msg = err.response?.data?.error || "Login failed";
//         if (msg.includes("Invalid credentials")) {
//           alert("No account found or wrong password. Please sign up.");
//           setSignupEmail(loginEmail);
//           setAuthPage("signup");
//         } else {
//           alert(msg);
//         }
//       }
//     }
  
//     // Payment confirm
//     async function confirmPayment() {
//       try {
//         await api.post("/checkout", {}, { headers: { Authorization: `Bearer ${token}` } });
//         alert("Payment successful!");
//         setCart({});
//         goHome();
//       } catch {
//         alert("Payment failed. Please login again.");
//         setAuthPage("login");
//         setNextAfterLogin("payment");
//       }
//     }
  
//     return (
//       <div>
//         {/* Navbar */}
//         <nav className="navbar navbar-expand-lg navbar-light bg-light shadow sticky-top">
//           <div className="container">
//             <button className="navbar-brand fw-bold btn btn-link" onClick={goHome}>LUMEN</button>
//             <div className="collapse navbar-collapse justify-content-center">
//               <ul className="navbar-nav">
//                 {navItems.map((item) => (
//                   <li key={item.id} className="nav-item">
//                     <button
//                       className="btn btn-link nav-link"
//                       onClick={() => {
//                         if (item.id === "home") goHome();
//                         else if (item.id === "about") setAuthPage("about");
//                         else setAuthPage("login");
//                       }}
//                     >
//                       {item.label}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div className="d-flex align-items-center gap-3">
//               {user ? <span className="text-muted small">Hi, {user}</span> : null}
//               <button className="btn btn-link text-dark fw-bold" onClick={() => setAuthPage("checkout")}>
//                 🛒 {Object.values(cart).reduce((a, b) => a + b, 0)}
//               </button>
//             </div>
//           </div>
//         </nav>
  
//         {/* CHECKOUT */}
//         {authPage === "checkout" && (
//           <div className="container py-5">
//             <h2 className="text-center mb-4">Checkout</h2>
//             {cartItems.length === 0 ? (
//               <p className="text-center">Your cart is empty.</p>
//             ) : (
//               <>
//                 <table className="table table-bordered">
//                   <thead>
//                     <tr><th>Product</th><th>Price</th><th>Qty</th><th>Subtotal</th></tr>
//                   </thead>
//                   <tbody>
//                     {cartItems.map((item) => (
//                       <tr key={item.id}>
//                         <td>{item.name}</td>
//                         <td>{formatINR(item.price)}</td>
//                         <td>
//                           <div className="d-flex align-items-center justify-content-center">
//                             <button className="btn btn-outline-dark btn-sm" onClick={() => decreaseQty(item)}>−</button>
//                             <span className="mx-2">{item.quantity}</span>
//                             <button className="btn btn-outline-dark btn-sm" onClick={() => increaseQty(item)}>+</button>
//                           </div>
//                         </td>
//                         <td>{formatINR(item.price * item.quantity)}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//                 <h4 className="text-end">Total: {formatINR(totalPrice)}</h4>
//                 <div className="text-end mt-3">
//                   <button
//                     className="btn btn-success"
//                     onClick={() => {
//                       if (!user) {
//                         setNextAfterLogin("payment");
//                         setAuthPage("login");
//                       } else {
//                         setAuthPage("payment");
//                       }
//                     }}
//                   >
//                     Proceed to Payment
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         )}
  
//         {/* PAYMENT */}
//         {authPage === "payment" && (
//           <div className="container py-5">
//             <h2 className="mb-4">Payment</h2>
//             <p>Total: {formatINR(totalPrice)}</p>
//             <button className="btn btn-primary" onClick={confirmPayment}>Confirm Payment</button>
//           </div>
//         )}
  
//         {/* LOGIN */}
//         {authPage === "login" && (
//           <div className="container py-5">
//             <div className="card mx-auto p-4" style={{ maxWidth: 400 }}>
//               <h4 className="mb-3">Login</h4>
//               <input type="email" placeholder="Email" className="form-control mb-3"
//                      value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
//               <input type="password" placeholder="Password" className="form-control mb-3"
//                      value={loginPass} onChange={e => setLoginPass(e.target.value)} />
//               <button className="btn btn-dark w-100" onClick={handleLogin}>Login</button>
//               <p className="mt-3 text-center">
//                 Don’t have an account?{" "}
//                 <button className="btn btn-link p-0" onClick={() => { setSignupEmail(loginEmail); setAuthPage("signup"); }}>
//                   Signup
//                 </button>
//               </p>
//             </div>
//           </div>
//         )}
  
//         {/* SIGNUP */}
//         {authPage === "signup" && (
//           <div className="container py-5">
//             <div className="card mx-auto p-4" style={{ maxWidth: 400 }}>
//               <h4 className="mb-3">Signup</h4>
//               <input type="email" placeholder="Email" className="form-control mb-3"
//                      value={signupEmail} onChange={e => setSignupEmail(e.target.value)} />
//               <input type="password" placeholder="Password" className="form-control mb-3"
//                      value={signupPass} onChange={e => setSignupPass(e.target.value)} />
//               <button className="btn btn-dark w-100" onClick={handleSignup}>Signup</button>
//               <p className="mt-3 text-center">
//                 Already have an account?{" "}
//                 <button className="btn btn-link p-0" onClick={() => setAuthPage("login")}>Login</button>
//               </p>
//             </div>
//           </div>
//         )}
  
//         {/* ABOUT */}
//         {authPage === "about" && (
//           <div className="container py-5">
//             <h2 className="text-center mb-4">About Us</h2>
//             <div className="row align-items-center">
//               <div className="col-md-6">
//                 <p style={{ fontSize: "1.1rem" }}>
//                   Welcome to <strong>LUMEN</strong>, your one-stop fashion destination.
//                   We bring you curated styles across clothing, accessories, footwear and more.
//                 </p>
//               </div>
//               <div className="col-md-6 text-center">
//                 <img
//                   src="https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=800&q=80"
//                   alt="About"
//                   className="img-fluid rounded shadow"
//                 />
//               </div>
//             </div>
//           </div>
//         )}
  
//         {/* HOME / CATEGORIES */}
//         {authPage === "none" && (
//           <>
//             <section id="home" className="py-5 text-center bg-light">
//               <div className="container">
//                 <h1 className="display-4 fw-bold">Welcome to LUMEN</h1>
//                 <p>Your one-stop fashion destination</p>
//               </div>
//             </section>
  
//             <section className="py-5">
//               <div className="container">
//                 {selectedCategory ? (
//                   <>
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                       <h2 className="mb-0">
//                         {categories.find((c) => c.id === selectedCategory)?.title}
//                       </h2>
//                       <button className="btn btn-outline-secondary" onClick={goHome}>⬅ Back</button>
//                     </div>
//                     <div className="row g-4">
//                       {categoryProducts[selectedCategory]?.map((product) => (
//                         <div key={product.id} className="col-md-4">
//                           <div className="card h-100">
//                             <img src={product.img} className="card-img-top" alt={product.name} />
//                             <div className="card-body d-flex justify-content-between align-items-center">
//                               <div>
//                                 <h5 className="card-title">{product.name}</h5>
//                                 <p>{formatINR(product.price)}</p>
//                               </div>
//                               {cart[product.id] ? (
//                                 <div className="d-flex align-items-center">
//                                   <button className="btn btn-outline-dark btn-sm" onClick={() => decreaseQty(product)}>−</button>
//                                   <span className="mx-2">{cart[product.id]}</span>
//                                   <button className="btn btn-outline-dark btn-sm" onClick={() => increaseQty(product)}>+</button>
//                                 </div>
//                               ) : (
//                                 <button className="btn btn-dark" onClick={() => addToCart(product)}>Add</button>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <h2 className="text-center mb-4">Shop by Category</h2>
//                     <div className="row g-4">
//                       {categories.map((cat) => (
//                         <div key={cat.id} className="col-md-4">
//                           <div
//                             className="card h-100"
//                             onClick={() => setSelectedCategory(cat.id)}
//                             style={{ cursor: "pointer" }}
//                           >
//                             <img src={cat.img} className="card-img-top" alt={cat.title} />
//                             <div className="card-body text-center">
//                               <h5 className="card-title">{cat.title}</h5>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             </section>
//           </>
//         )}
//       </div>
//     );
//   }
  
function App() {
    const [cart, setCart] = useState({});
    const [authPage, setAuthPage] = useState("none");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [nextAfterLogin, setNextAfterLogin] = useState(null);
  
    // Login/Signup inputs
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPass, setLoginPass] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPass, setSignupPass] = useState("");
  
    // Cart helpers
    function addToCart(product) {
      setCart((prev) => ({ ...prev, [product.id]: (prev[product.id] || 0) + 1 }));
    }
    function increaseQty(product) { addToCart(product); }
    function decreaseQty(product) {
      setCart((prev) => {
        const updated = { ...prev };
        if (updated[product.id] > 1) updated[product.id] -= 1;
        else delete updated[product.id];
        return updated;
      });
    }
  
    function goHome() {
      setAuthPage("none");
      setSelectedCategory(null);
    }
  
    // Build cart details
    const allProducts = Object.values(categoryProducts).flat();
    const cartItems = Object.keys(cart).map((id) => {
      const product = allProducts.find((p) => p.id === Number(id));
      return { ...product, quantity: cart[id] };
    });
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
    // -------- SIGNUP --------
    async function handleSignup() {
      try {
        const res = await api.post("/signup", { email: signupEmail.trim(), password: signupPass.trim() });
        alert(res.data.message || "Signup successful. Please login.");
        setAuthPage("login");
        setLoginEmail(signupEmail);
        setSignupEmail(""); setSignupPass("");
      } catch (err) {
        alert(err.response?.data?.error || "Signup failed");
      }
    }
  
    // -------- LOGIN --------
    async function handleLogin() {
      try {
        const res = await api.post("/login", { email: loginEmail.trim(), password: loginPass.trim() });
        setToken(res.data.token);
        setUser(loginEmail.trim());
        setLoginEmail(""); setLoginPass("");
  
        if (nextAfterLogin) {
          setAuthPage(nextAfterLogin);
          setNextAfterLogin(null);
        } else {
          setAuthPage("none");
        }
      } catch (err) {
        const msg = err.response?.data?.error || "Login failed";
        if (msg.includes("Invalid credentials")) {
          alert("No account found or wrong password. Please sign up.");
          setSignupEmail(loginEmail);
          setAuthPage("signup");
        } else {
          alert(msg);
        }
      }
    }
  
    // -------- PAYMENT --------
    async function confirmPayment() {
      try {
        await api.post("/checkout", {}, { headers: { Authorization: `Bearer ${token}` } });
        alert("Payment successful!");
        setCart({});
        goHome();
      } catch {
        alert("Payment failed. Please login again.");
        setAuthPage("login");
        setNextAfterLogin("payment");
      }
    }
  
    return (
      <div>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow sticky-top">
          <div className="container">
            <button className="navbar-brand fw-bold btn btn-link" onClick={goHome}>LUMEN</button>
            <div className="collapse navbar-collapse justify-content-center">
              <ul className="navbar-nav">
                {navItems.map((item) => (
                  <li key={item.id} className="nav-item">
                    <button
                      className="btn btn-link nav-link"
                      onClick={() => {
                        if (item.id === "home") goHome();
                        else if (item.id === "about") setAuthPage("about");
                        else setAuthPage("login");
                      }}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="d-flex align-items-center gap-3">
              {user ? <span className="text-muted small">Hi, {user}</span> : null}
              <button className="btn btn-link text-dark fw-bold" onClick={() => setAuthPage("checkout")}>
                🛒 {Object.values(cart).reduce((a, b) => a + b, 0)}
              </button>
            </div>
          </div>
        </nav>
  
        {/* CHECKOUT */}
        {authPage === "checkout" && (
          <div className="container py-5">
            <h2 className="text-center mb-4">Checkout</h2>
            {cartItems.length === 0 ? (
              <p className="text-center">Your cart is empty.</p>
            ) : (
              <>
                <table className="table table-bordered">
                  <thead>
                    <tr><th>Product</th><th>Price</th><th>Qty</th><th>Subtotal</th></tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{formatINR(item.price)}</td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            <button className="btn btn-outline-dark btn-sm" onClick={() => decreaseQty(item)}>−</button>
                            <span className="mx-2">{item.quantity}</span>
                            <button className="btn btn-outline-dark btn-sm" onClick={() => increaseQty(item)}>+</button>
                          </div>
                        </td>
                        <td>{formatINR(item.price * item.quantity)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h4 className="text-end">Total: {formatINR(totalPrice)}</h4>
                <div className="text-end mt-3">
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      if (!user) {
                        setNextAfterLogin("payment");
                        setAuthPage("login");
                      } else {
                        setAuthPage("payment");
                      }
                    }}
                  >
                    Proceed to Payment
                  </button>
                </div>
              </>
            )}
          </div>
        )}
  
        {/* PAYMENT */}
        {authPage === "payment" && (
          <div className="container py-5">
            <h2 className="mb-4">Payment</h2>
            <p>Total: {formatINR(totalPrice)}</p>
            <button className="btn btn-primary" onClick={confirmPayment}>Confirm Payment</button>
          </div>
        )}
  
        {/* LOGIN */}
        {authPage === "login" && (
          <div className="container py-5">
            <div className="card mx-auto p-4" style={{ maxWidth: 400 }}>
              <h4 className="mb-3">Login</h4>
              <input type="email" placeholder="Email" className="form-control mb-3"
                     value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
              <input type="password" placeholder="Password" className="form-control mb-3"
                     value={loginPass} onChange={e => setLoginPass(e.target.value)} />
              <button className="btn btn-dark w-100" onClick={handleLogin}>Login</button>
              <p className="mt-3 text-center">
                Don’t have an account?{" "}
                <button className="btn btn-link p-0" onClick={() => { setSignupEmail(loginEmail); setAuthPage("signup"); }}>
                  Signup
                </button>
              </p>
            </div>
          </div>
        )}
  
        {/* SIGNUP */}
        {authPage === "signup" && (
          <div className="container py-5">
            <div className="card mx-auto p-4" style={{ maxWidth: 400 }}>
              <h4 className="mb-3">Signup</h4>
              <input type="email" placeholder="Email" className="form-control mb-3"
                     value={signupEmail} onChange={e => setSignupEmail(e.target.value)} />
              <input type="password" placeholder="Password" className="form-control mb-3"
                     value={signupPass} onChange={e => setSignupPass(e.target.value)} />
              <button className="btn btn-dark w-100" onClick={handleSignup}>Signup</button>
              <p className="mt-3 text-center">
                Already have an account?{" "}
                <button className="btn btn-link p-0" onClick={() => setAuthPage("login")}>Login</button>
              </p>
            </div>
          </div>
        )}
  
        {/* ABOUT */}
        {authPage === "about" && (
          <div className="container py-5">
            <h2 className="text-center mb-4">About Us</h2>
            <div className="row align-items-center">
              <div className="col-md-6">
                <p style={{ fontSize: "1.1rem" }}>
                  Welcome to <strong>LUMEN</strong>, your one-stop fashion destination.
                  We bring you curated styles across clothing, accessories, footwear and more.
                </p>
              </div>
              <div className="col-md-6 text-center">
                <img
                  src="https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=800&q=80"
                  alt="About"
                  className="img-fluid rounded shadow"
                />
              </div>
            </div>
          </div>
        )}
  
        {/* HOME / CATEGORIES */}
        {authPage === "none" && (
          <>
            <section id="home" className="py-5 text-center bg-light">
              <div className="container">
                <h1 className="display-4 fw-bold">Welcome to LUMEN</h1>
                <p>Your one-stop fashion destination</p>
              </div>
            </section>
  
            <section className="py-5">
              <div className="container">
                {selectedCategory ? (
                  <>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h2 className="mb-0">
                        {categories.find((c) => c.id === selectedCategory)?.title}
                      </h2>
                      <button className="btn btn-outline-secondary" onClick={goHome}>⬅ Back</button>
                    </div>
                    <div className="row g-4">
                      {categoryProducts[selectedCategory]?.map((product) => (
                        <div key={product.id} className="col-md-4">
                          <div className="card h-100">
                            <img src={product.img} className="card-img-top" alt={product.name} />
                            <div className="card-body d-flex justify-content-between align-items-center">
                              <div>
                                <h5 className="card-title">{product.name}</h5>
                                <p>{formatINR(product.price)}</p>
                              </div>
                              {cart[product.id] ? (
                                <div className="d-flex align-items-center">
                                  <button className="btn btn-outline-dark btn-sm" onClick={() => decreaseQty(product)}>−</button>
                                  <span className="mx-2">{cart[product.id]}</span>
                                  <button className="btn btn-outline-dark btn-sm" onClick={() => increaseQty(product)}>+</button>
                                </div>
                              ) : (
                                <button className="btn btn-dark" onClick={() => addToCart(product)}>Add</button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-center mb-4">Shop by Category</h2>
                    <div className="row g-4">
                      {categories.map((cat) => (
                        <div key={cat.id} className="col-md-4">
                          <div
                            className="card h-100"
                            onClick={() => setSelectedCategory(cat.id)}
                            style={{ cursor: "pointer" }}
                          >
                            <img src={cat.img} className="card-img-top" alt={cat.title} />
                            <div className="card-body text-center">
                              <h5 className="card-title">{cat.title}</h5>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    );
  }


export default App;
