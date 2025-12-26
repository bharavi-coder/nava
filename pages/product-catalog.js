import { NextSeo } from 'next-seo'
import { useEffect, useState, useMemo } from 'react';
import Layout from '../components/Layout'
import Image from '../components/Image'
import ProductSlider from '../components/ProductSlider';

 

const ProductCatalog = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All categories')
     const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 9



  
    const heroSlider = [
      {
      "src": "/slider_img1.jpg",
      "width": 855,
      "height": 444,
      "alt": "Popcorn",
      "caption": "Popcorn",
      "href": "#"
    },
    {
      "src": "/slider_img2.jpg",
      "width": 855,
      "height": 444,
      "alt": "Chocolate Bars",
      "caption": "Chocolate Bars",
      "href": "#"
    },
    {
      "src": "/slider_img3.jpg",
      "width": 855,
      "height": 444,
      "alt": "Lollipop",
      "caption": "Lollipop",
      "href": "#"
    }
    ]

    const categories = [
        { "name": "All categories", "count": 33 },
    { "name": "Beverages", "count": 8 },
    { "name": "Chips & Snacks", "count": 10 },
    { "name": "Candy & Sweets", "count": 8 },
    { "name": "Convenience Items", "count": 4 },
    { "name": "Gum & Mint", "count": 3 }
      ]
    
      const products = [
    { "id": 1, "name": "Popcorn", "category": "Chips & Snacks", "image": "/popcorn.jpg" },
    { "id": 2, "name": "Chocolate Bars", "category": "Candy & Sweets", "image": "/chocolate_bars.jpg" },
    { "id": 3, "name": "Lollipop", "category": "Candy & Sweets", "image": "/lollipop.jpg" },
    { "id": 4, "name": "Coca Cola", "category": "Beverages", "image": "/popcorn.jpg" },
    { "id": 5, "name": "Coffee Drinks", "category": "Beverages", "image": "/chocolate_bars.jpg" },
    { "id": 6, "name": "Chewing Gum", "category": "Gum & Mint", "image": "/lollipop.jpg" },
    { "id": 7, "name": "OTC Medicines", "category": "Convenience Items", "image": "/popcorn.jpg" },
    { "id": 8, "name": "Batteries", "category": "Convenience Items", "image": "/chocolate_bars.jpg" },
    { "id": 9, "name": "Cleaning Supplies", "category": "Convenience Items", "image": "/lollipop.jpg" },
    { "id": 10, "name": "Doritos", "category": "Chips & Snacks", "image": "/popcorn.jpg" },
    { "id": 11, "name": "Lays Classic", "category": "Chips & Snacks", "image": "/chocolate_bars.jpg" },
    { "id": 12, "name": "Pringles", "category": "Chips & Snacks", "image": "/lollipop.jpg" },
    { "id": 13, "name": "Gummy Bears", "category": "Candy & Sweets", "image": "/popcorn.jpg" },
    { "id": 14, "name": "Skittles", "category": "Candy & Sweets", "image": "/chocolate_bars.jpg" },
    { "id": 15, "name": "M&Ms", "category": "Candy & Sweets", "image": "/lollipop.jpg" },
    { "id": 16, "name": "Pepsi", "category": "Beverages", "image": "/popcorn.jpg" },
    { "id": 17, "name": "Sprite", "category": "Beverages", "image": "/chocolate_bars.jpg" },
    { "id": 18, "name": "Mountain Dew", "category": "Beverages", "image": "/lollipop.jpg" },
    { "id": 19, "name": "Cheetos", "category": "Chips & Snacks", "image": "/popcorn.jpg" },
    { "id": 20, "name": "Sun Chips", "category": "Chips & Snacks", "image": "/chocolate_bars.jpg" },
    { "id": 21, "name": "Ruffles", "category": "Chips & Snacks", "image": "/lollipop.jpg" },
    { "id": 22, "name": "Twix", "category": "Candy & Sweets", "image": "/popcorn.jpg" },
    { "id": 23, "name": "Snickers", "category": "Candy & Sweets", "image": "/chocolate_bars.jpg" },
    { "id": 24, "name": "Kit Kat", "category": "Candy & Sweets", "image": "/lollipop.jpg" },
    { "id": 25, "name": "Red Bull", "category": "Beverages", "image": "/popcorn.jpg" },
    { "id": 26, "name": "Monster Energy", "category": "Beverages", "image": "/chocolate_bars.jpg" },
    { "id": 27, "name": "Iced Tea", "category": "Beverages", "image": "/lollipop.jpg" },
    { "id": 28, "name": "Mint Gum", "category": "Gum & Mint", "image": "/popcorn.jpg" },
    { "id": 29, "name": "Spearmint Gum", "category": "Gum & Mint", "image": "/chocolate_bars.jpg" },
    { "id": 30, "name": "Hand Sanitizer", "category": "Convenience Items", "image": "/lollipop.jpg" },
    { "id": 31, "name": "Tortilla Chips", "category": "Chips & Snacks", "image": "/popcorn.jpg" },
    { "id": 32, "name": "Potato Chips", "category": "Chips & Snacks", "image": "/chocolate_bars.jpg" },
    { "id": 33, "name": "Pretzels", "category": "Chips & Snacks", "image": "/lollipop.jpg" }
  ]

    const filteredProducts = useMemo(() => {
      let filtered = products;

      // Filter by category
      if (selectedCategory !== 'All categories') {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }

      // Filter by search term
      if (searchTerm) {
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      return filtered;
    }, [selectedCategory, searchTerm, products]);


    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    // Reset to page 1 when category or search changes
    useEffect(() => {
      setCurrentPage(1);
    }, [selectedCategory, searchTerm]);

    // Handle category change
    const handleCategoryChange = (categoryName) => {
      setSelectedCategory(categoryName);
    };

    // Handle page change
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
      // Scroll to top of products section
      window.scrollTo({ top: 300, behavior: 'smooth' });
    };

    // Generate page numbers for pagination
    const getPageNumbers = () => {
      const pages = [];
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    };

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
              <div className="search_section box-shado1">
                <h3 className='hd28'>Search Catalog</h3>
                <div className="search_box">
                  <input 
                    type="text" 
                    placeholder="Search Products"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <span className="search_icon"><Image src="/icon_serach.png" width={20} height={20} alt="Search icon" /></span>
                </div>
              </div>

              {/* Categories */}
              <div className="categories_section box-shado1">
                <h3 className='hd28'>Categories</h3>
                <ul className="category_list">
                  {categories.map((cat, index) => (
                    <li 
                      key={index}
                      className={selectedCategory === cat.name ? 'active' : ''}
                      onClick={() => handleCategoryChange(cat.name)}
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
              <div className="hero_carousel comman_slider">
                
<ProductSlider items={heroSlider} />
                {/* <ProductSlider items={[
                  { src: '/slider_img1.jpg', width: 855, height: 444, alt: 'Popcorn', caption: 'Popcorn', href: '#' },
                  { src: '/slider_img2.jpg', width: 855, height: 444, alt: 'Chocolate Bars', caption: 'Chocolate Bars', href: '#' },
                  { src: '/slider_img3.jpg', width: 855, height: 444, alt: 'Lollipop', caption: 'Lollipop', href: '#' }
                ]} /> */}
              
              </div> 
              {/* <div className="hero_carousel">
                <div className="carousel_content">
                
                </div>
                <div className="carousel_nav">
                  <button className="prev">←</button>
                  <button className="next">→</button>
                </div>
              </div> */}

              {/* Popular Products */}
               <section className="products_section">
                  <div className="products_header">
                    <h2 className='hd28'>
                      {selectedCategory === 'All categories' ? 'All Products' : selectedCategory}
                    </h2>
                    <span className="results_count">
                      Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} results
                    </span>
                  </div>

                  {currentProducts.length > 0 ? (
                    <>
                      <div className="products_grid">
                        {currentProducts.map((product) => (
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
                      {totalPages > 1 && (
                        <div className="pagination">
                          <button 
                            className="page_btn prev_btn"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            ←
                          </button>
                          
                          {getPageNumbers().map((pageNum) => (
                            <button 
                              key={pageNum}
                              className={`page_btn ${currentPage === pageNum ? 'active' : ''}`}
                              onClick={() => handlePageChange(pageNum)}
                            >
                              {pageNum}
                            </button>
                          ))}
                          
                          <button 
                            className="page_btn next_btn"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          >
                            →
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="no_results">
                      <p>No products found matching your criteria.</p>
                    </div>
                  )}
                </section>

            
            </main>
          </div>
            {/* Shop by Category */}
            {/* <section className="shop_category_section">
                <h2 className='hd28'>Shop by Category</h2>
                <div className="industrial_traing">
            <div className="container- comman_slider">
                <SimpleSlider items={[ { src: '/gas_stations.jpg' , width: 501, height: 326, alt: 'Gas Stations' , caption: 'Core Engineering' , href: '/courses' }, { src: '/gas_stations.jpg' , width: 501, height: 326, alt: 'Convenience Stores' , caption: 'Convenience Stores' , href: '/courses' }, { src: '/gas_stations.jpg' , width: 501, height: 326, alt: 'Liquor Stores' , caption: 'Liquor Stores' , href: '/courses' }, { src: '/gas_stations.jpg' , width: 501, height: 326, alt: 'Liquor Stores' , caption: 'Liquor Stores' , href: '/courses' }, ]} />
            </div>
        </div>
              </section> */}

              {/* Featuring Brands */}
              {/* <section className="brands_section">
                <h2 className='hd28'>Featuring Brands</h2>
                <div className="brands_slider">
                <div className="scroll_img marquee">
        <Image src="/marquee_img.png" width={1440} height={72} alt="" />
    </div>
                </div>
              </section> */}
        </div>
      </div>


      <style dangerouslySetInnerHTML={{__html: `header  {position:relative}`}} />
    
   
    </Layout>
  )
}

export default ProductCatalog