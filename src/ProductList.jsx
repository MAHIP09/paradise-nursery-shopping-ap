import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import AboutUs from './AboutUs';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters indoor pollutants.", cost: "$12" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg", description: "Thrives in shade.", cost: "$18" },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Adds lush greenery.", cost: "$14" },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", description: "Easy indoor care.", cost: "$20" },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/17/43/aloe-vera-3284587_1280.jpg", description: "Soothing gel properties.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic & Medicinal Plants",
      plants: [
        { name: "Lavender", image: "https://cdn.pixabay.com/photo/2016/07/22/19/21/lavender-1535560_1280.jpg", description: "Calming scent.", cost: "$16" },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/26/18/16/mint-1163013_1280.jpg", description: "Fresh herb for kitchen.", cost: "$8" },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Fragrant culinary herb.", cost: "$11" },
        { name: "Basil", image: "https://cdn.pixabay.com/photo/2016/03/05/19/02/basil-1238250_1280.jpg", description: "Great for Italian cooking.", cost: "$9" },
        { name: "Thyme", image: "https://cdn.pixabay.com/photo/2017/05/11/19/44/thyme-2305199_1280.jpg", description: "Versatile herb.", cost: "$10" },
        { name: "Lemongrass", image: "https://cdn.pixabay.com/photo/2018/05/23/21/53/citronella-3425316_1280.jpg", description: "Refreshing fragrance.", cost: "$13" }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: "https://cdn.pixabay.com/photo/2020/05/18/08/32/zz-plant-5185203_1280.jpg", description: "Tolerates low light.", cost: "$22" },
        { name: "Pothos", image: "https://cdn.pixabay.com/photo/2018/11/15/10/32/pothos-3816938_1280.jpg", description: "Fast growing vine.", cost: "$12" },
        { name: "Jade Plant", image: "https://cdn.pixabay.com/photo/2021/01/14/19/18/jade-plant-5917688_1280.jpg", description: "Symbol of good luck.", cost: "$15" },
        { name: "Cast Iron Plant", image: "https://cdn.pixabay.com/photo/2020/03/17/13/21/aspidistra-4940388_1280.jpg", description: "Nearly indestructible.", cost: "$25" },
        { name: "Succulent Trio", image: "https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg", description: "Minimal watering required.", cost: "$14" },
        { name: "Chinese Evergreen", image: "https://cdn.pixabay.com/photo/2020/06/07/15/45/aglaonema-5270923_1280.jpg", description: "Vibrant patterned leaves.", cost: "$19" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isAddedToCart = (plantName) => {
    return cartItems.some(item => item.name === plantName);
  };

  return (
    <div>
      <nav className="navbar">
        <div style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '20px' }} onClick={() => { setShowCart(false); setShowAbout(false); }}>
          Paradise Nursery
        </div>
        <div className="nav-links">
          <a href="#" onClick={(e) => { e.preventDefault(); setShowCart(false); setShowAbout(false); }}>Plants</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setShowCart(false); setShowAbout(true); }}>About Us</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setShowCart(true); setShowAbout(false); }}>
            Cart ({totalCartCount})
          </a>
        </div>
      </nav>

      {showAbout ? (
        <AboutUs />
      ) : showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div style={{ padding: '20px' }}>
          {plantsArray.map((cat, idx) => (
            <div key={idx}>
              <h2 style={{ textAlign: 'center', marginTop: '30px' }}>{cat.category}</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {cat.plants.map((plant, pIdx) => (
                  <div key={pIdx} className="plant-card">
                    <img src={plant.image} alt={plant.name} className="plant-image" />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p><strong>{plant.cost}</strong></p>
                    <button
                      onClick={() => handleAddToCart(plant)}
                      disabled={isAddedToCart(plant.name)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: isAddedToCart(plant.name) ? '#cccccc' : '#2e7d32',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: isAddedToCart(plant.name) ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {isAddedToCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
