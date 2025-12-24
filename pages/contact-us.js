import { NextSeo } from 'next-seo'
import Link from '../components/ActiveLink'
import Layout from '../components/Layout'
import Image from '../components/Image'
 
 


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
                        <div className="formarea">
                            <form action="http://www.kincgroup.com/Career/sendmail" name="career_form" id="career_form" encType="multipart/form-data" method="post" acceptCharset="utf-8" noValidate>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label className="lable_text">First Name*</label>
                                            <input type="text" placeholder="" name="txtfname" maxLength={200} minLength={2} className="form-control required" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label className="lable_text">Last Name*</label>
                                            <input type="text" placeholder="" name="txtfname" maxLength={200} minLength={2} className="form-control required" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label className="lable_text">Email*</label>
                                            <input type="text" placeholder="" name="txtemail" maxLength={200} minLength={2} className="form-control required email" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label className="lable_text">Primary Number</label>
                                            <input type="text" placeholder="" name="txtphone" maxLength={10} minLength={10} className="form-control required number" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label className="lable_text">Business Name*</label>
                                            <input type="text" placeholder="" name="txtbusinessname" maxLength={10} minLength={10} className="form-control required" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label className="lable_text">Business Type*</label>
                                            <input type="text" placeholder="" name="txtbusinesstype" maxLength={200} minLength={2} className="form-control required" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label className="lable_text">Message</label>
                                            <textarea className="form-control" rows="4" placeholder="" name="txtcomment" maxLength={500}></textarea>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">Required fields are marked as *</div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="btnarea text-right">
                                            <input type="hidden" name="heading_V" value="Contact Details" />
                                            <input type="hidden" name="footer_V" value=" Sutra All Rights Reserved." />
                                            <button type="submit" className="btn_comman btn_primary1">Submit</button>
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
{/* eslint-disable-next-line react/no-unknown-property */}
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
