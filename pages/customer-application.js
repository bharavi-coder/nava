import { NextSeo } from 'next-seo'
import React, { useState } from 'react'
import Layout from '../components/Layout'

const ApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    title: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    legalBusinessName: '',
    dba: '',
    businessType: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    businessPhone: '',
    businessEmail: '',
    website: '',
    yearsInBusiness: '',
    locations: '',
    monthlyPurchaseVolume: '',
    preferredOrderingMethod: '',
    
    // Step 2: Tax Details
    ein: '',
    resellCertificate: '',
    
    // Step 3: Additional References
    ref1Title: '',
    ref1FirstName: '',
    ref1LastName: '',
    ref1Phone: '',
    ref1Email: '',
    ref2Title: '',
    ref2FirstName: '',
    ref2LastName: '',
    ref2Phone: '',
    ref2Email: '',
    buyer1Title: '',
    buyer1FirstName: '',
    buyer1LastName: '',
    buyer1Phone: '',
    buyer1Email: '',
    buyer2Title: '',
    buyer2FirstName: '',
    buyer2LastName: '',
    buyer2Phone: '',
    buyer2Email: '',
    uploadedDocuments: null
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = (e) => {
    setFormData(prev => ({ ...prev, uploadedDocuments: e.target.files }))
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = () => {
    // Handle form submission
  }

  return (
    <Layout>
      <NextSeo title="Customer Application Form" />
      
      <div className="application_form_container">
        <div className="container">
          {/* Header */}
          <div className="form_header">
            <h1>Customer Application Form</h1>
            <p>We provide top-selling products, competitive prices, and fast, reliable fulfillment to businesses across the Chicagoland area and beyond.</p>
          </div>

          {/* Progress Stepper */}
          <div className="stepper">
            <div className={`step ${currentStep >= 1 ? 'completed' : ''} ${currentStep === 1 ? 'active' : ''}`}>
              <div className="step_circle">
                {currentStep > 1 ? '✓' : '1'}
              </div>
              <div className="step_label">Basic Information</div>
            </div>
            <div className="step_line"></div>
            <div className={`step ${currentStep >= 2 ? 'completed' : ''} ${currentStep === 2 ? 'active' : ''}`}>
              <div className="step_circle">
                {currentStep > 2 ? '✓' : '2'}
              </div>
              <div className="step_label">Tax Details</div>
            </div>
            <div className="step_line"></div>
            <div className={`step ${currentStep >= 3 ? 'completed' : ''} ${currentStep === 3 ? 'active' : ''}`}>
              <div className="step_circle">3</div>
              <div className="step_label">Additional References</div>
            </div>
          </div>

          {/* Form Content */}
          <div className="form_content">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="form_step">
                <div className="form_section">
                  <h2>Primary Contact Details</h2>
                  <div className="form_row">
                    <div className="form_field small">
                      <label>Title</label>
                      <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
                    </div>
                    <div className="form_field">
                      <label>First Name</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                    </div>
                    <div className="form_field">
                      <label>Last Name</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="form_row">
                    <div className="form_field">
                      <label>Phone</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
                    </div>
                    <div className="form_field">
                      <label>Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                    </div>
                  </div>
                </div>

                <div className="form_section">
                  <h2>Business Information</h2>
                  <div className="form_row">
                    <div className="form_field">
                      <label>Legal Business Name</label>
                      <input type="text" name="legalBusinessName" value={formData.legalBusinessName} onChange={handleInputChange} />
                    </div>
                    <div className="form_field">
                      <label>DBA</label>
                      <input type="text" name="dba" value={formData.dba} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="form_row">
                    <div className="form_field full">
                      <label>Business Type</label>
                      <input type="text" name="businessType" value={formData.businessType} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="form_row">
                    <div className="form_field full">
                      <label>Address</label>
                      <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="form_row">
                    <div className="form_field">
                      <label>City</label>
                      <input type="text" name="city" value={formData.city} onChange={handleInputChange} />
                    </div>
                    <div className="form_field">
                      <label>State</label>
                      <input type="text" name="state" value={formData.state} onChange={handleInputChange} />
                    </div>
                    <div className="form_field">
                      <label>ZIP</label>
                      <input type="text" name="zip" value={formData.zip} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="form_row">
                    <div className="form_field">
                      <label>Phone</label>
                      <input type="tel" name="businessPhone" value={formData.businessPhone} onChange={handleInputChange} />
                    </div>
                    <div className="form_field">
                      <label>Email</label>
                      <input type="email" name="businessEmail" value={formData.businessEmail} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="form_row">
                    <div className="form_field full">
                      <label>Website</label>
                      <input type="url" name="website" value={formData.website} onChange={handleInputChange} />
                    </div>
                  </div>
                </div>

                <div className="form_section">
                  <h2>Business Details</h2>
                  <div className="form_row">
                    <div className="form_field">
                      <label>Years in Business</label>
                      <input type="text" name="yearsInBusiness" value={formData.yearsInBusiness} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="form_row">
                    <div className="form_field">
                      <label>Locations</label>
                      <input type="text" name="locations" value={formData.locations} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="form_row">
                    <div className="form_field">
                      <label>Monthly Purchase Volume</label>
                      <input type="text" name="monthlyPurchaseVolume" value={formData.monthlyPurchaseVolume} onChange={handleInputChange} />
                    </div>
                    <div className="form_field">
                      <label>Preferred Ordering Method</label>
                      <input type="text" name="preferredOrderingMethod" value={formData.preferredOrderingMethod} onChange={handleInputChange} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Tax Details */}
            {currentStep === 2 && (
              <div className="form_step">
                <div className="form_section">
                  <h2>Tax Information</h2>
                  <div className="form_row">
                    <div className="form_field medium">
                      <label>EIN</label>
                      <input type="text" name="ein" value={formData.ein} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="form_row">
                    <div className="form_field medium">
                      <label>Resell Certificate</label>
                      <input type="text" name="resellCertificate" value={formData.resellCertificate} onChange={handleInputChange} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Additional References */}
            {currentStep === 3 && (
              <div className="form_step">
                <div className="form_section">
                  <h2>Trade References</h2>
                  
                  <h3>Reference 1</h3>
                  <div className="form_row">
                    <div className="form_field small">
                      <label>Title</label>
                      <input type="text" name="ref1Title" value={formData.ref1Title} onChange={handleInputChange} />
                    </div>
                    <div className="form_field">
                      <label>First Name</label>
                      <input type="text" name="ref1FirstName" value={formData.ref1FirstName} onChange={handleInputChange} />
                    </div>
                    <div className="form_field">
                      <label>Last Name</label>
                      <input type="text" name="ref1LastName" value={formData.ref1LastName} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="form_row">
                    <div className="form_field">
                      <label>Phone</label>
                      <input type="tel" name="ref1Phone" value={formData.ref1Phone} onChange={handleInputChange} />
                    </div>
                    <div className="form_field">
                      <label>Email</label>
                      <input type="email" name="ref1Email" value={formData.ref1Email} onChange={handleInputChange} />
                    </div>
                  </div>

                  <h3>Reference 2</h3>
                  <div className="form_row">
                    <div className="form_field small">
                      <label>Title</label>
                      <input type="text" name="ref2Title" value={formData.ref2Title} onChange={handleInputChange} />
                    </div>
                    <div className="form_field">
                      <label>First Name</label>
                      <input type="text" name="ref2FirstName" value={formData.ref2FirstName} onChange={handleInputChange} />
                    </div>
                    <div className="form_field">
                      <label>Last Name</label>
                      <input type="text" name="ref2LastName" value={formData.ref2LastName} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="form_row">
                    <div className="form_field">
                      <label>Phone</label>
                      <input type="tel" name="ref2Phone" value={formData.ref2Phone} onChange={handleInputChange} />
                    </div>
                    <div className="form_field">
                      <label>Email</label>
                      <input type="email" name="ref2Email" value={formData.ref2Email} onChange={handleInputChange} />
                    </div>
                  </div>
                </div>

                <div className="form_section">
                  <h2>Authorized Buyers</h2>
                  
                  <h3>Buyer Details 1</h3>
                  <div className="form_row">
                    <div className="form_field small">
                      <label>Title</label>
                      <input type="text" name="buyer1Title" value={formData.buyer1Title} onChange={handleInputChange} />
                    </div>
                    <div className="form_field">
                      <label>First Name</label>
                      <input type="text" name="buyer1FirstName" value={formData.buyer1FirstName} onChange={handleInputChange} />
                    </div>
                    <div className="form_field">
                      <label>Last Name</label>
                      <input type="text" name="buyer1LastName" value={formData.buyer1LastName} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="form_row">
                    <div className="form_field">
                      <label>Phone</label>
                      <input type="tel" name="buyer1Phone" value={formData.buyer1Phone} onChange={handleInputChange} />
                    </div>
                    <div className="form_field">
                      <label>Email</label>
                      <input type="email" name="buyer1Email" value={formData.buyer1Email} onChange={handleInputChange} />
                    </div>
                  </div>

                  <h3>Buyer Details 2</h3>
                  <div className="form_row">
                    <div className="form_field small">
                      <label>Title</label>
                      <input type="text" name="buyer2Title" value={formData.buyer2Title} onChange={handleInputChange} />
                    </div>
                    <div className="form_field">
                      <label>First Name</label>
                      <input type="text" name="buyer2FirstName" value={formData.buyer2FirstName} onChange={handleInputChange} />
                    </div>
                    <div className="form_field">
                      <label>Last Name</label>
                      <input type="text" name="buyer2LastName" value={formData.buyer2LastName} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="form_row">
                    <div className="form_field">
                      <label>Phone</label>
                      <input type="tel" name="buyer2Phone" value={formData.buyer2Phone} onChange={handleInputChange} />
                    </div>
                    <div className="form_field">
                      <label>Email</label>
                      <input type="email" name="buyer2Email" value={formData.buyer2Email} onChange={handleInputChange} />
                    </div>
                  </div>

                  <div className="form_row">
                    <div className="form_field full">
                      <label>Upload Documents <span className="optional">Optional</span></label>
                      <div className="file_upload">
                        <input type="file" id="fileUpload" onChange={handleFileUpload} multiple accept=".pdf,.png,.jpg,.jpeg" style={{display: 'none'}} />
                        <label htmlFor="fileUpload" className="upload_area">
                          <div className="upload_icon">📄</div>
                          <div className="upload_text">
                            <span className="click_text">Click to upload</span> or drag and drop
                            <br />
                            <span className="file_types">(PDF, PNG, JPEG)</span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="form_actions">
              {currentStep > 1 && (
                <button className="btn_secondary" onClick={prevStep}>
                  Back
                </button>
              )}
              {currentStep === 1 && (
                <button className="btn_secondary" onClick={() => window.history.back()}>
                  Cancel
                </button>
              )}
              <button className="btn_primary" onClick={currentStep === 3 ? handleSubmit : nextStep}>
                {currentStep === 3 ? 'Proceed to review' : 'Save and Continue'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx>{`
        .application_form_container {
          padding: 60px 0 100px;
          background: #f8f9fa;
        }

        .form_header {
          text-align: center;
          margin-bottom: 60px;
        }

        .form_header h1 {
          font-size: 36px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 16px;
        }

        .form_header p {
          font-size: 16px;
          color: #6c757d;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Stepper */
        .stepper {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 50px;
          padding: 0 20px;
        }

        .step {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .step_circle {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #d3d3d3;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 12px;
          transition: all 0.3s;
        }

        .step.active .step_circle {
          background: #b87333;
          box-shadow: 0 4px 12px rgba(184, 115, 51, 0.3);
        }

        .step.completed .step_circle {
          background: #b87333;
          border: 2px solid #b87333;
        }

        .step_label {
          font-size: 14px;
          color: #6c757d;
          white-space: nowrap;
        }

        .step.active .step_label {
          color: #b87333;
          font-weight: 600;
        }

        .step_line {
          height: 2px;
          width: 120px;
          background: #d3d3d3;
          margin: 0 -10px;
          margin-bottom: 40px;
        }

        /* Form Content */
        .form_content {
          background: #fff;
          border-radius: 12px;
          padding: 50px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          max-width: 900px;
          margin: 0 auto;
        }

        .form_section {
          margin-bottom: 40px;
        }

        .form_section h2 {
          font-size: 20px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 24px;
        }

        .form_section h3 {
          font-size: 16px;
          font-weight: 600;
          color: #16697a;
          margin: 30px 0 20px;
        }

        .form_row {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
        }

        .form_field {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .form_field.small {
          flex: 0 0 120px;
        }

        .form_field.medium {
          flex: 0 0 400px;
        }

        .form_field.full {
          flex: 1 1 100%;
        }

        .form_field label {
          font-size: 14px;
          color: #6c757d;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .optional {
          font-weight: 400;
          font-size: 13px;
        }

        .form_field input,
        .form_field select {
          padding: 12px 16px;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          font-size: 14px;
          transition: border-color 0.2s;
        }

        .form_field input:focus {
          outline: none;
          border-color: #16697a;
        }

        /* File Upload */
        .file_upload {
          margin-top: 8px;
        }

        .upload_area {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          border: 2px dashed #d0d0d0;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          background: #fafafa;
        }

        .upload_area:hover {
          border-color: #16697a;
          background: #f0f8f9;
        }

        .upload_icon {
          font-size: 40px;
          margin-bottom: 12px;
        }

        .upload_text {
          text-align: center;
          font-size: 14px;
          color: #6c757d;
          line-height: 1.6;
        }

        .click_text {
          color: #b87333;
          font-weight: 600;
        }

        .file_types {
          font-size: 13px;
        }

        /* Form Actions */
        .form_actions {
          display: flex;
          justify-content: flex-end;
          gap: 16px;
          margin-top: 40px;
          padding-top: 30px;
          border-top: 1px solid #e0e0e0;
        }

        .btn_secondary,
        .btn_primary {
          padding: 12px 32px;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
        }

        .btn_secondary {
          background: #fff;
          color: #16697a;
          border: 1px solid #16697a;
        }

        .btn_secondary:hover {
          background: #f0f8f9;
        }

        .btn_primary {
          background: #16697a;
          color: #fff;
        }

        .btn_primary:hover {
          background: #135763;
        }

        @media (max-width: 768px) {
          .form_content {
            padding: 30px 20px;
          }

          .form_row {
            flex-direction: column;
          }

          .form_field.small,
          .form_field.medium {
            flex: 1 1 100%;
          }

          .stepper {
            flex-wrap: wrap;
          }

          .step_line {
            width: 60px;
          }

          .step_label {
            font-size: 12px;
          }
        }
      `}</style>

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
        header .headermain nav.navbar .navigation .navbar-nav { 
          padding-top: 0px!important; 
          padding-bottom: 0px!important; 
        }
        header .headermain nav.navbar .navigation .btn_customer{ 
          display:none!important; 
        }
      `}</style>
    </Layout>
  )
}

export default ApplicationForm