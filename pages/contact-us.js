import { NextSeo } from 'next-seo'
import Link from '../components/ActiveLink'
import clsx from 'clsx'
import Layout from '../components/Layout'
import Image from '../components/Image'
import styles from '../styles/Home.module.scss'
import SimpleSlider from '../components/SimpleSlider'
 
 


const Home = () => {
  return ( 
    <Layout>
      <NextSeo
        title="Nava"
        description=""
        openGraph={{
          type: 'website',
        }}
      />     
      <div className="homebanner inner_banner">
        <figure className='bannerImage'>
            <Image src="/banner_contact_us.jpg" width={1440} height={604} alt="NextSSS" />
        </figure>
        <div className="bannerText">
            <div className="container">
                <div className="bannerDesc">
                    <p className="title">Get in Touch</p>
                    <span>We invite you to reach out and connect with us. Whether you have inquiries, need assistance, or want to explore partnership opportunities.</span>
                    <div className='btn_customer'><Link href=''>Customer Application Form</Link></div> 
                </div>
            </div>
        </div>
    </div>     
<div className="hm_contact-section inner_contact-section sectionpadding">
    <div className="container">
        <div>
            <div className="row align-items-center">
                <div className="col-lg-6 col-sm-12">
                    <div className="p_fnt26 maxwidth580">
                        <h2 className='hd2'><span>Contact Us</span>Ready to upgrade <br />your supply chain?</h2>
                        <p>Have a question or need a quote?<br />
                            Fill out the form and a member of our team will get back to you shortly.</p>
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
                <div className="col-lg-6 col-sm-12">
                    <div className="formContect">
                        <div class="formarea">
                            <form action="http://www.kincgroup.com/Career/sendmail" name="career_form" id="career_form" enctype="multipart/form-data" method="post" accept-charset="utf-8" novalidate="novalidate">
                                <div class="row">
                                    <div class="col-lg-6 col-md-6">
                                        <div class="form-group">
                                            <label class="lable_text">First Name*</label>
                                            <input type="text" placeholder="" name="txtfname" maxlength="200" minlength="2" class="form-control required" />
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6">
                                        <div class="form-group">
                                            <label class="lable_text">Last Name*</label>
                                            <input type="text" placeholder="" name="txtfname" maxlength="200" minlength="2" class="form-control required" />
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6">
                                        <div class="form-group">
                                            <label class="lable_text">Email*</label>
                                            <input type="text" placeholder="" name="txtemail" maxlength="200" minlength="2" class="form-control required email" />
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6">
                                        <div class="form-group">
                                            <label class="lable_text">Primary Number</label>
                                            <input type="text" placeholder="" name="txtphone" maxlength="10" minlength="10" class="form-control required number" />
                                        </div>
                                    </div>
                                    <div class="col-lg-12 col-md-12">
                                        <div class="form-group">
                                            <label class="lable_text">Business Name*</label>
                                            <input type="text" placeholder="" name="txtbusinessname" maxlength="10" minlength="10" class="form-control required" />
                                        </div>
                                    </div>
                                    <div class="col-lg-12 col-md-12">
                                        <div class="form-group">
                                            <label class="lable_text">Business Type*</label>
                                            <input type="text" placeholder="" name="txtbusinesstype" maxlength="200" minlength="2" class="form-control required" />
                                        </div>
                                    </div>
                                    <div class="col-lg-12 col-md-12">
                                        <div class="form-group">
                                            <label class="lable_text">Message</label>
                                            <textarea class="form-control" rows="4" placeholder="" name="txtcomment" maxlength="500"></textarea>
                                        </div>
                                    </div>
                                    <div class="col-lg-12 col-md-12">
                                        <div class="form-group">Required fields are marked as *</div>
                                    </div>
                                    <div class="col-lg-12 col-md-12">
                                        <div class="btnarea text-right">
                                            <input type="hidden" name="heading_V" value="Contact Details" />
                                            <input type="hidden" name="footer_V" value=" Sutra All Rights Reserved." />
                                            <button type="submit" class="btn_comman btn_primary1" href="javascript:void(0)">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<style jsx global>{`
    header .headermain .logo .inner_logo {
       display: block!important; 
    }
    header .headermain .logo .home_logo {
        display: none!important;
    }
    header .headermain nav.navbar .navigation .navbar-nav .nav-item .nav-link {
        color: #ffffff;
    }
    header .headermain nav.navbar .navigation .navbar-nav { padding-top: 0px!important; padding-bottom: 0px!important; }
    header .headermain nav.navbar .navigation .btn_customer{ display:none!important; }
    `}</style>
    </Layout>
  )
}
export default Home
