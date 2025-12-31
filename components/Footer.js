import Link from './ActiveLink'
import Image from './Image'

const Footer = () => {
  return (
    <footer className="footer">
      {/* =========== Footer Area Start===========  */}   
        <div className="footerTop">
          <div className="container">
              <div className="row">
                  <div className="col-xl-5 col-lg-4 col-md-12 col-sm-12">
                    <div className='footerlogo'><Link href="/"><Image src="/nava_withe.svg" width={189} height={43} alt="nana" /></Link>
                    <p>Your trusted partner in wholesale distribution.</p></div>
                    
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                      <div className="footList">
                          <p className="footHeading">Quick links</p>
                          <ul>
                              <li><Link href="/#about">About us</Link></li>
                              <li><Link href="/product-catalog">Product Catalog</Link></li>
                              <li><Link href="/customer-application">Customer Application Forms</Link></li>
                              <li><Link href="/contact-us">Contact Us</Link></li>
                          </ul>
                      </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-6">
                      <div className="contact_footer">
                          <p className="footHeading">Contact us</p>
                          <div className="address">
                              <ul className="contactDetail">
                                  <li>
                                      <i className="fa fa-map-marker" aria-hidden="true"></i>
                                        111 S Lombard Rd Ste 2 Addison, IL 60101
                                  </li>
                                  <li>
                                      <i className="fa fa-phone" aria-hidden="true"></i>
                                      <Link href="tel:+18476604308">+1 (847) 660-4308</Link>
                                  </li>
                                  <li>
                                      <i className="fa fa-envelope" aria-hidden="true"></i>
                                      <Link href="mailto:support@navadistributor.com">support@navadistributor.com</Link>
                                  </li>
                              </ul>
                          </div>                          
                      </div>
                  </div>
              </div>          
          </div>
        </div>
     
{/* =========== Footer Area End=========== */}
    </footer>
  )
}

export default Footer
