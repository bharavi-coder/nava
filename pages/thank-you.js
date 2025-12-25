import { NextSeo } from 'next-seo'
import React from 'react'
import Layout from '../components/Layout'

import Image from '../components/Image' 

const Thankyou = () => { 

  return (
    <Layout>
      <NextSeo title="Customer Application Form" />
      
      <div className="application_form_container">
        <div className="container">
          {/* Header */}
          <div className="form_header p_fnt26">
            <div className="icon_tankyou"><Image src="/icon_thank_you.png" width={114} height={108} alt="" /></div>
            <h1>Thank you for your application! <br/>Your application number is #12345</h1>
            <p>Your application has been submitted.  <br/>A member of our team will get in touch with you shortly.</p>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `header{position: relative!important;}`}} />
    </Layout>
  )
}

export default Thankyou