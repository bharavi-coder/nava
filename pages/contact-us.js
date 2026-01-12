import { NextSeo } from 'next-seo'
import Link from '../components/ActiveLink'
import Layout from '../components/Layout'
import Image from '../components/Image'

import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from '../styles/Home.module.scss';
import InputMask from 'react-input-mask';
import { submitSupplyChainForm } from '../services/supplyChainService';



const Home = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        phoneFull: '',
        businessName: '',
        businessType: '',
        message: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validateEmail = (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);



    const validateForm = () => {
        const invalid = {};
        const newErrors = {};

        if (!formData.firstName.trim()) {
            invalid.firstName = true;
            newErrors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            invalid.lastName = true;
            newErrors.lastName = 'Last name is required';
        }

        if (!formData.email.trim()) {
            invalid.email = true;
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            invalid.email = true;
            newErrors.email = 'Enter a valid email address';
        }

        if (!formData.phone) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = 'Phone number must be 10 digits';
        }



        if (!formData.businessName.trim()) {
            invalid.businessName = true;
            newErrors.businessName = 'Business name is required';
        }

        if (!formData.businessType.trim()) {
            invalid.businessType = true;
            newErrors.businessType = 'Business type is required';
        }


        setErrors(newErrors);

        return Object.keys(invalid).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            // Call API service function
            const response = await submitSupplyChainForm(formData);

            if (response && response.success) {
                toast.success(response.message || 'Form submitted successfully');

                // Reset form
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    phoneFull: '',
                    businessName: '',
                    businessType: '',
                    message: '',
                });

                setErrors({});

            } else {
                toast.error(response.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            toast.error(error.message || 'Server error. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const isAnyFieldFilled = () => {
        return Object.values(formData).some(
            (value) => value && value.toString().trim() !== ''
        );
    };





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
                            <div className='btn_customer'><Link href='/customer-application/'>Customer Application Form</Link></div>
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
                            <div className="col-lg-6 col-sm-12">
                                <div className="formContect">
                                    <div className="formarea">
                                        <form onSubmit={handleSubmit} noValidate action="http://www.kincgroup.com/Career/sendmail" name="career_form" id="career_form" encType="multipart/form-data" method="post" acceptCharset="utf-8">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label className="lable_text">First Name <span className="required">*</span></label>
                                                        <input
                                                            type="text"
                                                            name="firstName"
                                                            value={formData.firstName}
                                                            onChange={handleChange}
                                                            className={`form-control ${errors.firstName ? styles.inputError : ''}`}
                                                        />

                                                        {errors.firstName && <small className="text-danger">{errors.firstName}</small>}

                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label className="lable_text">Last Name<span className="required">*</span></label>
                                                        {/* <input type="text" placeholder="" name="txtfname" maxlength="200" minlength="2" className="form-control required" /> */}
                                                        <input
                                                            type="text"
                                                            name="lastName"
                                                            value={formData.lastName}
                                                            onChange={handleChange}
                                                            className={`form-control ${errors.lastName ? styles.inputError : ''}`}
                                                        />

                                                        {errors.lastName && <small className="text-danger">{errors.lastName}</small>}

                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label className="lable_text">Email<span className="required">*</span></label>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            className={`form-control ${errors.email ? styles.inputError : ''}`}
                                                        />

                                                        {errors.email && <small className="text-danger">{errors.email}</small>}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label className="lable_text">Primary Number<span className="required">*</span></label>
                                                        {/* <input
                                                            type="text"
                                                            name="phone"
                                                            maxLength="10"
                                                            value={formData.phone}
                                                            onChange={handleChange}
                                                            className={`form-control ${errors.phone ? styles.inputError : ''}`}
                                                        /> */}

                                                        <InputMask
                                                            mask="+01 (999) - 9999 - 999"
                                                            value={formData.phoneFull}
                                                            onChange={(e) => {
                                                                const digitsOnly = e.target.value.replace(/\D/g, '');

                                                                // full number including country code (01xxxxxxxxxx)
                                                                const fullNumber = digitsOnly;
                                                                // const fullNumber = `+${digitsOnly}`;

                                                                // last 10 digits only (validation)
                                                                const last10 = digitsOnly.slice(-10);

                                                                setFormData((prev) => ({
                                                                    ...prev,
                                                                    phone: last10,         // used ONLY for validation
                                                                    phoneFull: fullNumber // sent to API
                                                                }));

                                                                setErrors((prev) => ({ ...prev, phone: '' }));
                                                            }}
                                                        >
                                                            {(inputProps) => (
                                                                <input
                                                                    {...inputProps}
                                                                    type="text"
                                                                    className={`form-control ${errors.phone ? styles.inputError : ''}`}
                                                                    placeholder="+01 (xxx) - xxxx - xxx"
                                                                />
                                                            )}
                                                        </InputMask>


                                                        {errors.phone && <small className="text-danger">{errors.phone}</small>}

                                                    </div>
                                                </div>
                                                <div className="col-lg-12 col-md-12">
                                                    <div className="form-group">
                                                        <label className="lable_text">Business Name<span className="required">*</span></label>
                                                        <input
                                                            type="text"
                                                            name="businessName"
                                                            value={formData.businessName}
                                                            onChange={handleChange}
                                                            className={`form-control ${errors.businessName ? styles.inputError : ''}`}
                                                        />

                                                        {errors.businessName && <small className="text-danger">{errors.businessName}</small>}

                                                    </div>
                                                </div>
                                                <div className="col-lg-12 col-md-12">
                                                    <div className="form-group">
                                                        <label className="lable_text">Business Type<span className="required">*</span></label>
                                                        <input
                                                            type="text"
                                                            name="businessType"
                                                            value={formData.businessType}
                                                            onChange={handleChange}
                                                            className={`form-control ${errors.businessType ? styles.inputError : ''}`}
                                                        />

                                                        {errors.businessType && <small className="text-danger">{errors.businessType}</small>}

                                                    </div>
                                                </div>
                                                <div className="col-lg-12 col-md-12">
                                                    <div className="form-group">
                                                        <label className="lable_text">Message</label>
                                                        <textarea
                                                            name="message"
                                                            value={formData.message}
                                                            onChange={handleChange}
                                                            className="form-control"
                                                            rows="4"
                                                        />

                                                    </div>
                                                </div>
                                                <div className="col-lg-12 col-md-12">
                                                    <div className="form-group">Required fields are marked as <span className="required">*</span></div>
                                                </div>
                                                <div className="col-lg-12 col-md-12">
                                                    <div className="btnarea text-right">
                                                        <input type="hidden" name="heading_V" value="Contact Details" />
                                                        <input type="hidden" name="footer_V" value=" Sutra All Rights Reserved." />
                                                        <button type="submit" href="javascript:void(0)"
                                                            className={`btn_comman btn_primary2 ${loading || !isAnyFieldFilled() ? 'btn_disabled' : ''
                                                                }`}
                                                            disabled={loading || !isAnyFieldFilled()}
                                                        >{loading ? 'Submitting...' : 'Submit'}</button>
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

            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                theme="colored"
            />


            <style
                dangerouslySetInnerHTML={{
                    __html: `
      header .headermain .logo .inner_logo {
        display: block !important;
      }
      header .headermain .logo .home_logo {
        display: none !important;
      }
        header .headermain nav.navbar .navbar-toggler .navbar-toggler-icon{color: #14565B; background-image: url(../download1.svg);}
        @media (min-width: 992px){
            header .headermain nav.navbar .navigation .navbar-nav .nav-item .nav-link {color: #ffffff;}
            header .headermain nav.navbar .navigation .navbar-nav { padding-top: 0px !important; padding-bottom: 0px !important;}
        }
      
      
      header .headermain nav.navbar .navigation .btn_customer {
        display: none !important;
      }        
    `,
                }}
            />

        </Layout>
    )
}
export default Home
