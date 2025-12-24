import { NextSeo } from 'next-seo'
import Layout from '../components/Layout'
import Image from '../components/Image'
import styles from '../styles/About.module.scss'
import { useState } from 'react'
import emailjs from '@emailjs/browser'

const Services = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '', 
    message: ''
  })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus('')

    try {
      // Replace these with your EmailJS credentials
      const serviceID = 'service_9jhx40v'
      const templateID = 'template_sf7e8un'
      const publicKey = 'KMKnXWXIRpI_8-I9W'

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        to_name: 'Admin',
      }

      const response = await emailjs.send(
        serviceID,
        templateID,
        templateParams,
        publicKey
      )

      if (response.status === 200) {
        setStatus('Message sent successfully!')
        setFormData({ name: '', email: '', phone: '', message: '' })
      }
    } catch (error) {
      console.error('EmailJS Error:', error)
      setStatus('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <NextSeo title="Services" />
      <div className="mx-auto max-w-xl">
        <h1 className={styles.title}>Services</h1>
        <figure>
          <Image src="/logo@2x.png" width={1472} height={642} alt="NextSSS" />
        </figure>
        <p className="mt-4">
          Services NextSSS is a Next.js static site starter including full setup for
          TypeScript, Tailwind CSS, Google Analytics, Next SEO, etc.
        </p>

        {/* Contact Form Section */}
        <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Us</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone No. *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message/Comments *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                placeholder="Enter your message or comments..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Submit'}
            </button>

            {status && (
              <p className={`text-center text-sm ${status.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                {status}
              </p>
            )}
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Services