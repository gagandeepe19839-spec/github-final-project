import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedNodes, setAddedNodes] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", cost: "$12" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg", cost: "$18" },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", cost: "$14" },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/plant-4850640_1280.jpg", cost: "$20" },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/05/14/09/aloe-vera-3292941_1280.jpg", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba", cost: "$15" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729808999-66e25548377e", cost: "$18" },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", cost: "$12" },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/02/02/03/mint-1117627_1280.jpg", cost: "$10" },
        { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2015/07/20/14/50/lemon-balm-852899_1280.jpg", cost: "$14" },
        { name: "Hyacinth", image: "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg", cost: "$22" }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361", cost: "$25" },
        { name: "Pothos", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b", cost: "$14" },
        { name: "Cast Iron Plant", image: "https://cdn.pixabay.com/photo/2017/02/15/10/39/salad-2068221_1280.jpg", cost: "$20" },
        { name: "Succulent", image: "https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg", cost: "$8" },
        { name: "Jade Plant", image: "https://cdn.pixabay.com/photo/2016/03/09/09/17/succulent-1245781_1280.jpg", cost: "$15" },
        { name: "Chinese Evergreen", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", cost: "$19" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedNodes((prevState) => ({ ...prevState, [plant.name]: true }));
  };

  return (
    <div>
      <div className="navbar">
        <h2 onClick={() => setShowCart(false)} style={{ cursor: 'pointer' }}>Paradise Nursery</h2>
        <div className="nav-links">
          <span onClick={() => setShowCart(false)} style={{ cursor: 'pointer', marginRight: '20px' }}>Plants</span>
          <span onClick={() => setShowCart(true)} style={{ cursor: 'pointer' }}>
            🛒 Cart ({totalQuantity})
          </span>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index} className="category-section">
              <h2>{category.category}</h2>
              <div className="plant-list">
                {category.plants.map((plant, pIndex) => (
                  <div key={pIndex} className="product-card">
                    <img src={plant.image} alt={plant.name} className="product-image" />
                    <h3>{plant.name}</h3>
                    <p>{plant.cost}</p>
                    <button 
                      disabled={addedNodes[plant.name] || cartItems.some(item => item.name === plant.name)} 
                      onClick={() => handleAddToCart(plant)}
                    >
                      {addedNodes[plant.name] || cartItems.some(item => item.name === plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
