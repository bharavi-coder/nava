import { NextSeo } from 'next-seo'
import { useEffect, useState, useMemo } from 'react';
import Layout from '../components/Layout'
import Image from '../components/Image'
import ProductSlider from '../components/ProductSlider';
import Link from 'next/link';



const ProductCatalog = () => {
const [searchTerm, setSearchTerm] = useState('')
const [selectedCategory, setSelectedCategory] = useState('All categories')
const [currentPage, setCurrentPage] = useState(1)
const itemsPerPage = 9


const brands = [
'Cheetos',
'Fritos',
'Cupcakes',
'Ruffles',
'Starburst',
"Reese’s",
'Pringles',
'Brandt',
'Almond Joy',
'Chex Mix',
"Lay’s",
"Hershey’s",
'Planters',
]

const heroSlider = [
{
"src": "/slider_img1.jpg",
"width": 855,
"height": 444,
"alt": "",
"caption": "",
"href": ""
}
]

const categories = [
{ "name": "All categories", "count": 33 },
{ "name": "Beverages", "count": 9 },
{ "name": "Chips & Snacks", "count": 7 },
{ "name": "Candy & Sweets", "count": 6 },
{ "name": "Convenience Items", "count": 7 },
{ "name": "Gum & Mint", "count": 4 }
]

const products = [
{ "id": 1, "name": "Popcorn", "category": "Chips & Snacks", "image": "/popcorn.jpg" },
{ "id": 2, "name": "Chocolate Bars", "category": "Candy & Sweets", "image": "/chocolate_bars.jpg" },
{ "id": 3, "name": "Lollipop", "category": "Candy & Sweets", "image": "/lollipop.jpg" },
{ "id": 4, "name": "Tea & Iced Teas", "category": "Beverages", "image": "/comming_soon.svg" },
{ "id": 5, "name": "Coffee Drinks", "category": "Beverages", "image": "/coffee_drinks.jpg" },
{ "id": 6, "name": "Chewing Gum", "category": "Gum & Mint", "image": "/chewing_gum.jpg" },
// Convenience Items
{ "id": 7, "name": "OTC Medicines", "category": "Convenience Items", "image": "/comming_soon.svg" },
{ "id": 8, "name": "Batteries", "category": "Convenience Items", "image": "/batteries.jpg" },
{ "id": 9, "name": "Cleaning Supplies", "category": "Convenience Items", "image": "/comming_soon.svg" },
{ "id": 10, "name": "Toiletries", "category": "Convenience Items", "image": "/comming_soon.svg" },
{ "id": 11, "name": "Personal Care", "category": "Convenience Items", "image": "/comming_soon.svg" },
{ "id": 12, "name": "Automotive", "category": "Convenience Items", "image": "/comming_soon.svg" },
{ "id": 13, "name": "Seasonal Items", "category": "Convenience Items", "image": "/comming_soon.svg" },
// Gum & Mint
{ "id": 14, "name": "Bubble Gum", "category": "Gum & Mint", "image": "/bubble_gum.jpg" },
{ "id": 15, "name": "Mint Tins", "category": "Gum & Mint", "image": "/comming_soon.svg" },
{ "id": 16, "name": "Breath Mints", "category": "Gum & Mint", "image": "/comming_soon.svg" },
//Beverages
{ "id": 17, "name": "Energy Drinks", "category": "Beverages", "image": "/comming_soon.svg" },
{ "id": 18, "name": "Water", "category": "Beverages", "image": "/comming_soon.svg" },
{ "id": 19, "name": "Sports Drinks", "category": "Beverages", "image": "/comming_soon.svg" },
{ "id": 20, "name": "Protein & Nutritional Drinks", "category": "Beverages", "image": "/comming_soon.svg" },
{ "id": 21, "name": "Soda", "category": "Beverages", "image": "/comming_soon.svg" },
{ "id": 22, "name": "Enhanced Waters", "category": "Beverages", "image": "/comming_soon.svg" },
{ "id": 23, "name": "Juice and Fruit Drinks ", "category": "Beverages", "image": "/comming_soon.svg" },
//Candy & Sweets
{ "id": 24, "name": "Gummies", "category": "Candy & Sweets", "image": "/popcorn.jpg" },
{ "id": 25, "name": "Hard Candy", "category": "Candy & Sweets", "image": "/comming_soon.svg" },
{ "id": 26, "name": "Novelty Candy", "category": "Candy & Sweets", "image": "/comming_soon.svg" },
{ "id": 27, "name": "Fruity/Chewy/Sours", "category": "Candy & Sweets", "image": "/comming_soon.svg" },
//Chips & Snacks
{ "id": 28, "name": "Protein Bars & Fruit Snacks", "category": "Chips & Snacks", "image": "/comming_soon.svg" },
{ "id": 39, "name": "Pretzels", "category": "Chips & Snacks", "image": "/comming_soon.svg" },
{ "id": 30, "name": "Nuts & Trail Mix", "category": "Chips & Snacks", "image": "/comming_soon.svg" },
{ "id": 31, "name": "Snack Cakes", "category": "Chips & Snacks", "image": "/comming_soon.svg" },
{ "id": 32, "name": "Jerky & Meat Snacks", "category": "Chips & Snacks", "image": "/comming_soon.svg" },
{ "id": 33, "name": "Healthy Snacks", "category": "Chips & Snacks", "image": "/comming_soon.svg" }
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
for (let i = 1; i <= totalPages; i++) { pages.push(i); } return pages; }; return ( <Layout>
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
            <div className='bell_section'>
                <div className='icon_box'><img src="/icon_bell.svg" alt="Bell" /></div>
                <p>Building something big for you! Our full catalogue is on its way.<br /> Interested in a preview? Email us at <Link href="mailto:support@navadistributor.com">support@navadistributor.com</Link>
                </p>
            </div>
            <div className="catalog_layout">

                {/* Sidebar */}
                <aside className="catalog_sidebar">
                    {/* Search Box */}
                    <div className="search_section box_comman box-shado1">
                        <h3 className='hd28'>Search Catalog</h3>
                        <div className="search_box">
                            <input type="text" placeholder="Search Products" value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)}
                            />
                            <span className="search_icon">
                                <Image src="/icon_serach.svg" width={20} height={20} alt="Search icon" />
                            </span>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="categories_section box_comman box-shado1">
                        <h3 className='hd28'>Categories</h3>
                        <ul className="category_list">
                            {categories.map((cat, index) => (
                            <li key={index} className={selectedCategory===cat.name ? 'active' : '' } onClick={()=> handleCategoryChange(cat.name)}
                                >
                                <span className="cat_name">{cat.name}</span>
                                <span className="cat_count">{cat.count}</span>
                            </li>
                            ))}
                        </ul>
                    </div>
                    <div className="brandsBox_section box_comman box-shado1">
                        <div className='header'>
                            <h3 className='hd28'>Brands</h3>
                            <span className='btn_comingsoon'>Coming soon</span>
                        </div>
                        <div className='list_input'>
                            {brands.map((brand, index) => (
                            <label key={index} className='item'>
                                <input type="checkbox" disabled />
                                <span>{brand}</span>
                            </label>
                            ))}
                        </div>
                    </div>

                </aside>


                {/* Main Product Area */}
                <main className="catalog_main">
                    {/* Hero Carousel */}
                    <div className="hero_carousel comman_slider">

                        <ProductSlider items={heroSlider} />
                        {/*
                        <ProductSlider items={[ { src: '/slider_img1.jpg' , width: 855, height: 444, alt: 'Popcorn' , caption: 'Popcorn' , href: '#' }, { src: '/slider_img2.jpg' , width: 855, height: 444, alt: 'Chocolate Bars' , caption: 'Chocolate Bars' , href: '#' }, { src: '/slider_img3.jpg' , width: 855, height: 444, alt: 'Lollipop' , caption: 'Lollipop' , href: '#' } ]} /> */}

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
                                        <Image src={product.image} width={200} height={200} alt={product.name} />
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
                                <button className="page_btn prev_btn" onClick={()=> handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    >
                                    &nbsp;
                                </button>

                                {getPageNumbers().map((pageNum) => (
                                <button key={pageNum} className={`page_btn ${currentPage===pageNum ? 'active' : '' }`} onClick={()=> handlePageChange(pageNum)}
                                    >
                                    {pageNum}
                                </button>
                                ))}

                                <button className="page_btn next_btn" onClick={()=> handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    >
                                    &nbsp;
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
