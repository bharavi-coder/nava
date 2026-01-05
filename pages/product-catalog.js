import { NextSeo } from 'next-seo'
import React from 'react'
import Layout from '../components/Layout'
import Link from '../components/ActiveLink'

import Image from '../components/Image' 

const ProductCatalog = () => { 

  return (
    <Layout>
    
      <div className="application_form_container">
        <div className="container">
          {/* Header */}
          <div className="form_header p_fnt26 max1000">
            <div className="icon_tankyou"><Image src="/timer.svg" width={114} height={108} alt="" /></div>
            <h1>The next chapter in wholesale begins at Nava. Our complete catalog launches soon.
              </h1>
            <p className="mailAddressLink">Interested in a preview? Email us at <Link href="mailto:support@navadistributor.com">support@navadistributor.com</Link></p>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `header{position: relative!important;}`}} />
    </Layout>
  )
}

export default ProductCatalog
