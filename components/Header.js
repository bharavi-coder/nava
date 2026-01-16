import Link from './ActiveLink'
import { useState, useEffect } from 'react'


const Header = () => {
const [isMenuOpen, setIsMenuOpen] = useState(false)

useEffect(() => {
  if (isMenuOpen) {
    document.body.classList.add('overflow-hidden')
  } else {
    document.body.classList.remove('overflow-hidden')
  }
}, [isMenuOpen])

const toggleMenu = () => {
  setIsMenuOpen(!isMenuOpen)
}

return (
<header>
    <div className="container">
      <div className="headermain">
        <div className="logo">
          <Link href="/">
            <span className="home_logo"><img src="/nava.svg" alt="nava" /></span>
            <span className="inner_logo"><img src="/nava_withe.svg" alt="nava" /></span>
          </Link>
        </div>
        <nav className="navbar navbar-expand-lg">
            <div className="navigation">           
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={toggleMenu}>
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={toggleMenu}>
                    <span className="navbar-toggler-icon" />
                </button>
                    <ul className="navbar-nav me-auto">
                        {[
                        // Next.js client-side navigation between pages (no full reload)
                        { label: 'About Us',        href: '/#about' },
                        { label: 'Product Catalog', href: '/product-catalog/' }, // TODO: create this page or adjust route
                        { label: 'Contact Us',      href: '/contact-us' },
                        ].map(({ href, label }, i) => (
                        <li className="nav-item" key={i}>
                            <Link href={href} className="nav-link" activeClassName="active">
                            {label}
                            </Link>
                        </li>
                        ))}
                        <li className="nav-item customerbtn">
                          <Link href="/customer-application" className="nav-link">
                        Customer Application Form
                      </Link>
                      </li>
                    </ul> 
                    {/* <div className='btn_customer'>
                      <Link href="/customer-application" className="nav-link">
                        Customer Application Form
                      </Link>
                    </div>                   */}
                </div>
            </div>
        </nav>
      </div>      
    </div>
</header>
)
}

export default Header