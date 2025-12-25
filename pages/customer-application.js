import { NextSeo } from 'next-seo'
import React, { useState } from 'react'
import Layout from '../components/Layout'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({});
  const [invalidFields, setInvalidFields] = useState({});
  const requiredStep1Fields = [
    'firstName',
    'lastName',
    'phone',
    'email',
    'legalBusinessName',
    'businessType',
    'address',
    'city',
    'state',
    'zip',
  ];
  const requiredStep2Fields = ['ein', 'resellCertificate'];
  const emailFields = [
    'email',
    'businessEmail',
    'ref1Email',
    'ref2Email',
    'buyer1Email',
    'buyer2Email',
  ];

  const fieldLabels = {
    firstName: 'First Name',
    lastName: 'Last Name',
    phone: 'Phone',
    email: 'Email',
    legalBusinessName: 'Legal Business Name',
    businessType: 'Business Type',
    address: 'Address',
    city: 'City',
    state: 'State',
    zip: 'ZIP',
    ein: 'EIN',
    resellCertificate: 'Resell Certificate',
  };


  // const handleInputChange = (e) => {
  //   const { name, value } = e.target
  //   setFormData(prev => ({ ...prev, [name]: value }))
  // }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setInvalidFields((prev) => ({ ...prev, [name]: false }));
  };

  // const handleFileUpload = (e) => {
  //   setFormData(prev => ({ ...prev, uploadedDocuments: e.target.files }))
  // }
  const handleFileUpload = (e) => {
    setFormData(prev => ({
      ...prev,
      uploadedDocuments: e.target.files
    }));
  };


  // const nextStep = () => {
  //   if (currentStep < 3) setCurrentStep(currentStep + 1)
  // }

  const nextStep = () => {
    if (currentStep === 1) {
      if (!validateStep(requiredStep1Fields)) return;
    }

    if (currentStep === 2) {
      if (!validateStep(requiredStep2Fields)) return;
    }

    setCurrentStep((prev) => prev + 1);
  };


  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const validateStep = (fields) => {
    const newErrors = {};
    const invalid = {};

    // Required field validation
    fields.forEach((field) => {
      if (!formData[field] || !formData[field].toString().trim()) {
        newErrors[field] = `${fieldLabels[field]} is required`;
        invalid[field] = true;
      }
    });

    // Email format validation (ALL email fields)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    emailFields.forEach((emailField) => {
      if (formData[emailField]) {
        if (!emailRegex.test(formData[emailField])) {
          newErrors[emailField] = 'Please enter a valid email address';
          invalid[emailField] = true;
        }
      }
    });

    // Phone validation
    if (fields.includes('phone') && formData.phone) {
      if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = 'Phone number must be 10 digits';
        invalid.phone = true;
      }
    }

    setErrors(newErrors);
    setInvalidFields(invalid);

    return Object.keys(newErrors).length === 0;
  };

  const validateEmailsOnSubmit = () => {
    const newErrors = {};
    const invalid = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    emailFields.forEach((emailField) => {
      if (formData[emailField]) {
        if (!emailRegex.test(formData[emailField])) {
          newErrors[emailField] = 'Please enter a valid email address';
          invalid[emailField] = true;
        }
      }
    });

    setErrors((prev) => ({ ...prev, ...newErrors }));
    setInvalidFields((prev) => ({ ...prev, ...invalid }));

    return Object.keys(newErrors).length === 0;
  };



  const handleSubmit = async () => {
    if (!validateEmailsOnSubmit()) {
      toast.error('Please fix the highlighted errors');
      return;
    }
    setLoading(true)

    try {
      const payload = new FormData()

      // 🔹 Basic + Business Info
      payload.append('title', formData.title)
      payload.append('firstName', formData.firstName)
      payload.append('lastName', formData.lastName)
      payload.append('phone', formData.phone)
      payload.append('email', formData.email)
      payload.append('legalBusinessName', formData.legalBusinessName)
      payload.append('dba', formData.dba)
      payload.append('businessType', formData.businessType)
      payload.append('address', formData.address)
      payload.append('city', formData.city)
      payload.append('state', formData.state)
      payload.append('zip', formData.zip)
      payload.append('businessPhone', formData.businessPhone)
      payload.append('businessEmail', formData.businessEmail)
      payload.append('website', formData.website)
      payload.append('yearsInBusiness', formData.yearsInBusiness)
      payload.append('locations', formData.locations)
      payload.append('monthlyPurchaseVolume', formData.monthlyPurchaseVolume)
      payload.append('preferredOrderingMethod', formData.preferredOrderingMethod)

      // 🔹 Tax Details
      payload.append('ein', formData.ein)
      payload.append('resaleCertificate', formData.resellCertificate)

      // 🔹 References
      payload.append('reference1Title', formData.ref1Title)
      payload.append('reference1FirstName', formData.ref1FirstName)
      payload.append('reference1LastName', formData.ref1LastName)
      payload.append('reference1Phone', formData.ref1Phone)
      payload.append('reference1Email', formData.ref1Email)

      payload.append('reference2Title', formData.ref2Title)
      payload.append('reference2FirstName', formData.ref2FirstName)
      payload.append('reference2LastName', formData.ref2LastName)
      payload.append('reference2Phone', formData.ref2Phone)
      payload.append('reference2Email', formData.ref2Email)

      // 🔹 Buyers
      payload.append('buyer1Title', formData.buyer1Title)
      payload.append('buyer1FirstName', formData.buyer1FirstName)
      payload.append('buyer1LastName', formData.buyer1LastName)
      payload.append('buyer1Phone', formData.buyer1Phone)
      payload.append('buyer1Email', formData.buyer1Email)

      payload.append('buyer2Title', formData.buyer2Title)
      payload.append('buyer2FirstName', formData.buyer2FirstName)
      payload.append('buyer2LastName', formData.buyer2LastName)
      payload.append('buyer2Phone', formData.buyer2Phone)
      payload.append('buyer2Email', formData.buyer2Email)

      // 🔹 Documents
      if (formData.uploadedDocuments) {
        Array.from(formData.uploadedDocuments).forEach((file) => {
          payload.append('documents', file)
        })
      }

      const response = await fetch('https://nava-api.weblivelink.com/api/application-form', {
        method: 'POST',
        body: payload
      })

      const data = await response.json()

      if (response.ok && data.success) {
        toast.success(data.message || 'Application submitted successfully')

        // Optional reset
        setFormData({})
        setCurrentStep(1)
      } else {
        toast.error(data.message || 'Submission failed')
      }
    } catch (error) {
      console.error(error)
      toast.error('Server error. Please try again later.')
    } finally {
      setLoading(false)
    }
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
                  <h2 className='hd26'>Primary Contact Details</h2>
                  <div className="form_row">
                    <div className="form_field small">
                      <label>Title</label>
                      <input type="text" name="title" value={formData.title} onChange={handleInputChange} className={`form-control ${invalidFields.firstName ? 'input-error' : ''}`} />
                    </div>
                    <div className="form_field">
                      <label>First Name <span className="required">*</span></label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                      {errors.firstName && (
                        <small className="text-danger">{errors.firstName}</small>
                      )}
                    </div>
                    <div className="form_field">
                      <label>Last Name <span className="required">*</span></label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                      {errors.lastName && (<small className="text-danger">{errors.lastName}</small>)}
                    </div>
                  </div>
                  <div className="form_row">
                    <div className="form_field">
                      <label>Phone <span className="required">*</span></label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
                      {errors.phone && (<small className="text-danger">{errors.phone}</small>)}
                    </div>
                    <div className="form_field">
                      <label>Email <span className="required">*</span></label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                      {errors.email && (<small className="text-danger">{errors.email}</small>)}
                    </div>
                  </div>
                </div>

                <div className="form_section">
                  <h2 className='hd26'>Business Information</h2>
                  <div className="form_row">
                    <div className="form_field">
                      <label>Legal Business Name <span className="required">*</span></label>
                      <input type="text" name="legalBusinessName" value={formData.legalBusinessName} onChange={handleInputChange} />
                      {errors.legalBusinessName && (<small className="text-danger">{errors.legalBusinessName}</small>)}
                    </div>
                    <div className="form_field">
                      <label>DBA</label>
                      <input type="text" name="dba" value={formData.dba} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="form_row">
                    <div className="form_field full">
                      <label>Business Type <span className="required">*</span> </label>
                      <input type="text" name="businessType" value={formData.businessType} onChange={handleInputChange} />
                      {errors.businessType && (<small className="text-danger">{errors.businessType}</small>)}
                    </div>
                  </div>
                  <div className="form_row">
                    <div className="form_field full">
                      <label>Address <span className="required">*</span></label>
                      <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
                      {errors.address && (<small className="text-danger">{errors.address}</small>)}
                    </div>
                  </div>
                  <div className="form_row">
                    <div className="form_field">
                      <label>City <span className="required">*</span></label>
                      <input type="text" name="city" value={formData.city} onChange={handleInputChange} />
                      {errors.city && (<small className="text-danger">{errors.city}</small>)}
                    </div>
                    <div className="form_field">
                      <label>State <span className="required">*</span></label>
                      <input type="text" name="state" value={formData.state} onChange={handleInputChange} />
                      {errors.state && (<small className="text-danger">{errors.state}</small>)}
                    </div>
                    <div className="form_field">
                      <label>ZIP <span className="required">*</span></label>
                      <input type="text" name="zip" value={formData.zip} onChange={handleInputChange} />
                      {errors.zip && (<small className="text-danger">{errors.zip}</small>)}
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
                      {errors.businessEmail && (
                        <small className="text-danger">{errors.businessEmail}</small>
                      )}
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
                  <h2 className='hd26'>Business Details</h2>
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
                  <h2 className='hd26'>Tax Information</h2>
                  <div className="form_row">
                    <div className="form_field medium">
                      <label>EIN <span className="required">*</span></label>
                      <input type="text" name="ein" value={formData.ein} onChange={handleInputChange} />
                      {errors.ein && (<small className="text-danger">{errors.ein}</small>)}
                    </div>
                  </div>
                  <div className="form_row">
                    <div className="form_field medium">
                      <label>Resell Certificate <span className="required">*</span></label>
                      <input type="text" name="resellCertificate" value={formData.resellCertificate} onChange={handleInputChange} />
                      {errors.resellCertificate && (<small className="text-danger">{errors.resellCertificate}</small>)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Additional References */}
            {currentStep === 3 && (
              <div className="form_step">
                <div className="form_section">
                  <h2 className='hd26'>Trade References</h2>
                  <h3 className="hd24 brdnone">Reference 1</h3>
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
                      {errors.ref1Email && (
                        <small className="text-danger">{errors.ref1Email}</small>
                      )}
                    </div>
                  </div>

                  <h3 className="hd24">Reference 2</h3>
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
                      {errors.ref2Email && (
                        <small className="text-danger">{errors.ref2Email}</small>
                      )}
                    </div>
                  </div>
                </div>

                <div className="form_section">
                  <h2 className='hd26'>Authorized Buyers</h2>
                  <h3 className="hd24 brdnone">Buyer Details 1</h3>
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
                      {errors.buyer1Email && (
                        <small className="text-danger">{errors.buyer1Email}</small>
                      )}
                    </div>
                  </div>

                  <h3 className="hd24">Buyer Details 2</h3>
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
                      {errors.buyer2Email && (
                        <small className="text-danger">{errors.buyer2Email}</small>
                      )}
                    </div>
                  </div>

                  <div className="form_row">
                    <div className="form_field full">
                      <label>Upload Documents <span className="optional">Optional</span></label>
                      <div className="file_upload">
                        <input type="file" id="fileUpload" onChange={handleFileUpload} multiple accept=".pdf,.png,.jpg,.jpeg" style={{ display: 'none' }} />
                        <label htmlFor="fileUpload" className="upload_area">
                          <div className="upload_icon">📄</div>
                          <div className="upload_text">
                            <span className="click_text">Click to upload</span> or drag and drop
                            <br />
                            <span className="file_types">(PDF, PNG, JPEG)</span>
                          </div>
                        </label>
                      </div>
                      {formData.uploadedDocuments && formData.uploadedDocuments.length > 0 && (
                        <ul className="uploaded_file_list">
                          {Array.from(formData.uploadedDocuments).map((file, index) => (
                            <li key={index}>
                              {file.name}
                            </li>
                          ))}
                        </ul>
                      )}

                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="form_actions">
              {currentStep > 1 && (
                <button className="btn_comman btn_secondary" onClick={prevStep}>
                  Back
                </button>
              )}
              {currentStep === 1 && (
                <button className="btn_comman btn_secondary" onClick={() => window.history.back()}>
                  Cancel
                </button>
              )}
              <button className="btn_comman btn_primary2" onClick={currentStep === 3 ? handleSubmit : nextStep} disabled={loading}
              >{loading ? 'Submitting...' : currentStep === 3 ? 'Proceed to review' : 'Save and Continue'}
              </button>
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

      <style dangerouslySetInnerHTML={{
        __html: `
        header{position: relative!important;}
     `}} />
    </Layout>
  )
}

export default ApplicationForm;