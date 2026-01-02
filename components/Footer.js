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
                                        <a href="https://www.google.com/maps/place/111+S+Lombard+Rd+%23+2,+Addison,+IL+60101,+USA/@41.9263186,-88.0248963,567m/data=!3m2!1e3!4b1!4m6!3m5!1s0x880fad68bd400001:0xbdf111d4a11aec78!8m2!3d41.9263146!4d-88.0223214!16s%2Fg%2F11mbn7crsh?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D" target="_blank" rel="noopener noreferrer">111 S Lombard Rd Ste 2 Addison, IL 60101</a>
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
