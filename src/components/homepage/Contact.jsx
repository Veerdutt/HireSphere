import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-gray-900">Get In Touch</h2>
          <p className="mt-4 text-gray-600">
            Have questions? We're here to help you succeed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Contact Information
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-100 text-blue-600 shrink-0">
                  <Mail size={20} />
                </span>
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="text-sm text-gray-600">support@HireSphere.com</p>
                  <p className="text-sm text-gray-600">partnerships@HireSphere.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-green-100 text-green-600 shrink-0">
                  <Phone size={20} />
                </span>
                <div>
                  <p className="font-semibold text-gray-900">Phone</p>
                  <p className="text-sm text-gray-600">+91 98765 43210</p>
                  <p className="text-sm text-slate-600">+91 98765 43211 (Partnership)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-purple-100 text-purple-600 shrink-0">
                  <MapPin size={20} />
                </span>
                <div>
                  <p className="font-semibold text-gray-900">Address</p>
                  <p className="text-sm text-gray-600">Tower A, Tech Park</p>
                  <p className="text-sm text-gray-600">Sector 17, Chandigarh</p>
                  <p className="text-sm text-gray-600">Chandigarh 160017 , India</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Send us a message</h3>
            <p className="text-sm text-gray-500 mb-6">
              We'll get back to you within 24 hours.
            </p>

            {submitted ? (
              <div className="rounded-lg bg-green-50 text-green-700 text-sm p-4">
                Thanks — your message has been sent. We'll be in touch soon.
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-semibold py-3"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
