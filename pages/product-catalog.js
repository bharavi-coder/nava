import { NextSeo } from 'next-seo'
import React, { useState } from 'react'
import Layout from '../components/Layout'
import Link from '../components/ActiveLink' 
import Image from '../components/Image' 
import SimpleSlider from '../components/SimpleSlider'
 

const ProductCatalog = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All categories')


    const categories = [
        { name: 'All categories', count: 33 },
        { name: 'Beverages', count: 33 },
        { name: 'Chips & Snacks', count: 33 },
        { name: 'Candy & Sweets', count: 33 },
        { name: 'Convenience Items', count: 7 },
        { name: 'Gum & Mint', count: 7 }
      ]
    
      const products = [
        { id: 1, name: 'Popcorn', category: 'Chips & Snacks', image: '/popcorn.jpg' },
        { id: 2, name: 'Chocolate Bars', category: 'Candy & Sweets', image: '/chocolate.jpg' },
        { id: 3, name: 'Lollipop', category: 'Candy & Sweets', image: '/lollipop.jpg' },
        { id: 4, name: 'Tea & Iced Teas', category: 'Chips & Snacks', image: '/popcorn.jpg' },
        { id: 5, name: 'Coffee Drinks', category: 'Candy & Sweets', image: '/chocolate.jpg' },
        { id: 6, name: 'Chewing Gum', category: 'Candy & Sweets', image: '/gum.jpg' },
        { id: 7, name: 'OTC Medicines', category: 'Chips & Snacks', image: '/popcorn.jpg' },
        { id: 8, name: 'Batteries', category: 'Candy & Sweets', image: '/chocolate.jpg' },
        { id: 9, name: 'Cleaning Supplies', category: 'Candy & Sweets', image: '/supplies.jpg' }
      ]
    
      const brands = [
        'Starburst', 'Reeses', 'Fudgies', 'M&Ms', 'Brandt', 'Almond Joy',
        'Chex Mix', 'Lays', 'Hershey', 'Planters', 'Fritos', 'Cupcakes'
      ]


  return (
    <Layout>
      <NextSeo title="Product Catalogue" />
      <div className="homebanner inner_banner">
        <div className='breadCrumb'>
             <div className="breadcrumb_section">
                <div className="container">
                <span className="breadcrumb_text">Home / <span className="active">Product Catalog</span></span>
                </div>
      </div>
        </div>
    </div>  
    <div className="catalog_container">
        <div className="container">
          <div className="catalog_layout">
            
            {/* Sidebar */}
            <aside className="catalog_sidebar">
              {/* Search Box */}
              <div className="search_section">
                <h3>Search Catalog</h3>
                <div className="search_box">
                  <input 
                    type="text" 
                    placeholder="Search Products"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <span className="search_icon">🔍</span>
                </div>
              </div>

              {/* Categories */}
              <div className="categories_section">
                <h3>Categories</h3>
                <ul className="category_list">
                  {categories.map((cat, index) => (
                    <li 
                      key={index}
                      className={selectedCategory === cat.name ? 'active' : ''}
                      onClick={() => setSelectedCategory(cat.name)}
                    >
                      <span className="cat_name">{cat.name}</span>
                      <span className="cat_count">{cat.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Main Product Area */}
            <main className="catalog_main">
              {/* Hero Carousel */}
              <div className="hero_carousel">
                <div className="carousel_content">
                  {/* Carousel content would go here */}
                </div>
                <div className="carousel_nav">
                  <button className="prev">←</button>
                  <button className="next">→</button>
                </div>
              </div>

              {/* Popular Products */}
              <section className="products_section">
                <h2>Popular Products</h2>
                <div className="products_grid">
                  {products.map((product) => (
                    <div key={product.id} className="product_card">
                      <div className="product_image">
                        <Image 
                          src={product.image} 
                          width={200} 
                          height={200} 
                          alt={product.name}
                        />
                      </div>
                      <div className="product_info">
                        <span className="product_category">{product.category}</span>
                        <h4 className="product_name">{product.name}</h4>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="pagination">
                  <button className="page_btn">1</button>
                  <button className="page_btn">2</button>
                  <button className="page_btn">3</button>
                </div>
              </section>

            
            </main>
          </div>
            {/* Shop by Category */}
            <section className="shop_category_section">
                <h2>Shop by Category</h2>
                <div className="industrial_traing">
            <div className="container- comman_slider">
                <SimpleSlider items={[ { src: '/gas_stations.jpg' , width: 501, height: 326, alt: 'Gas Stations' , caption: 'Core Engineering' , href: '/courses' }, { src: '/gas_stations.jpg' , width: 501, height: 326, alt: 'Convenience Stores' , caption: 'Convenience Stores' , href: '/courses' }, { src: '/gas_stations.jpg' , width: 501, height: 326, alt: 'Liquor Stores' , caption: 'Liquor Stores' , href: '/courses' }, { src: '/gas_stations.jpg' , width: 501, height: 326, alt: 'Liquor Stores' , caption: 'Liquor Stores' , href: '/courses' }, ]} />
            </div>
        </div>
              </section>

              {/* Featuring Brands */}
              <section className="brands_section">
                <h2>Featuring Brands</h2>
                <div className="brands_slider">
                <div className="scroll_img marquee">
        <Image src="/marquee_img.png" width={1440} height={72} alt="" />
    </div>
                </div>
              </section>
        </div>
      </div>

      <style jsx>{`
        .breadcrumb_section {
          padding: 20px 0;
          background: #f8f9fa;
        }
        .breadcrumb_text {
          color: #6c757d;
          font-size: 14px;
        }
        .breadcrumb_text .active {
          color: #16697a;
          font-weight: 500;
        }

        .catalog_container {
          padding: 40px 0 80px;
        }
        .catalog_layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 40px;
        }

        /* Sidebar Styles */
        .catalog_sidebar {
          background: #fff;
        }
        .search_section, .categories_section {
          margin-bottom: 30px;
        }
        .search_section h3, .categories_section h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 15px;
          color: #1a1a1a;
        }
        .search_box {
          position: relative;
        }
        .search_box input {
          width: 100%;
          padding: 12px 15px 12px 40px;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          font-size: 14px;
        }
        .search_icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
        }
        .category_list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .category_list li {
          display: flex;
          justify-content: space-between;
          padding: 12px 15px;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.2s;
        }
        .category_list li:hover {
          background: #f0f8f9;
        }
        .category_list li.active {
          background: #d4eef2;
          color: #16697a;
          font-weight: 500;
        }
        .cat_name {
          font-size: 14px;
        }
        .cat_count {
          font-size: 14px;
          color: #6c757d;
        }

        /* Main Content Styles */
        .hero_carousel {
          background: #d3d3d3;
          height: 320px;
          border-radius: 8px;
          margin-bottom: 40px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .carousel_nav {
          position: absolute;
          bottom: 20px;
          right: 20px;
          display: flex;
          gap: 10px;
        }
        .carousel_nav button {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: #fff;
          cursor: pointer;
          font-size: 18px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        .carousel_nav button.next {
          background: #16697a;
          color: #fff;
        }

        .products_section h2, .shop_category_section h2, .brands_section h2 {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 30px;
          color: #1a1a1a;
        }

        .products_grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 40px;
        }
        .product_card {
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
        }
        .product_card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .product_image {
          width: 100%;
          height: 200px;
          background: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;
        }
           .product_image img{
           max-width:100%; width:auto;}
        .product_info {
          padding: 16px;
        }
        .product_category {
          font-size: 12px;
          color: #6c757d;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .product_name {
          font-size: 16px;
          font-weight: 600;
          margin-top: 6px;
          color: #1a1a1a;
        }

        .pagination {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin: 40px 0;
        }
        .page_btn {
          width: 40px;
          height: 40px;
          border: 1px solid #e0e0e0;
          background: #fff;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .page_btn:hover {
          background: #16697a;
          color: #fff;
          border-color: #16697a;
        }

        .category_icons {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
          margin-bottom: 60px;
        }
        .category_icon_card {
          background: #f5f5f5;
          height: 140px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .icon_placeholder {
          position: relative;
          font-size: 48px;
        }
        .badge {
          position: absolute;
          top: -5px;
          right: -10px;
          background: #16697a;
          color: #fff;
          font-size: 12px;
          padding: 2px 8px;
          border-radius: 12px;
        }

        .brands_slider {
          display: flex;
          gap: 40px;
          overflow-x: auto;
          padding: 20px 0;
        }
        .brand_logo {
          min-width: 100px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
        }

        @media (max-width: 1024px) {
          .catalog_layout {
            grid-template-columns: 1fr;
          }
          .products_grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .category_icons {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 640px) {
          .products_grid {
            grid-template-columns: 1fr;
          }
          .category_icons {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      <style jsx global>{`
        header  {position:relative}
      `}</style>
    
   
    </Layout>
  )
}

export default ProductCatalog