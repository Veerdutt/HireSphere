import { useState } from 'react';
import { Mail, Phone, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';
import { validateEmail } from '../../utils/validation';

export default function Contact() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.firstName.trim()) {
      newErrors.firstName = 'First name is required.';
    } else if (form.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters.';
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = 'Last name is required.';
    } else if (form.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters.';
    }

    const emailCheck = validateEmail(form.email);
    if (!emailCheck.isValid) {
      newErrors.email = emailCheck.error;
    }

    if (!form.subject.trim()) {
      newErrors.subject = 'Subject is required.';
    } else if (form.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters.';
    }

    if (!form.message.trim()) {
      newErrors.message = 'Message is required.';
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Please enter at least 10 characters.';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm({
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: '',
    });
    setErrors({});
    setSubmitted(false);
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

          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Send us a message</h3>
            <p className="text-sm text-gray-500 mb-6">
              We'll get back to you within 24 hours.
            </p>

            {submitted ? (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={26} />
                </div>
                <h4 className="font-bold text-lg text-emerald-900">Message Sent Successfully!</h4>
                <p className="text-sm text-emerald-700">
                  Thanks, <span className="font-semibold">{form.firstName}</span>! We've received your message and will be in touch soon.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className={`w-full rounded-lg border px-3 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 ${
                        errors.firstName
                          ? 'border-red-400 bg-red-50/20 focus:ring-red-400'
                          : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-red-600 text-xs mt-1.5 font-medium flex items-center gap-1">
                        <AlertCircle size={13} className="shrink-0" />
                        <span>{errors.firstName}</span>
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className={`w-full rounded-lg border px-3 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 ${
                        errors.lastName
                          ? 'border-red-400 bg-red-50/20 focus:ring-red-400'
                          : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-red-600 text-xs mt-1.5 font-medium flex items-center gap-1">
                        <AlertCircle size={13} className="shrink-0" />
                        <span>{errors.lastName}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className={`w-full rounded-lg border px-3 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 ${
                      errors.email
                        ? 'border-red-400 bg-red-50/20 focus:ring-red-400'
                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-xs mt-1.5 font-medium flex items-center gap-1">
                      <AlertCircle size={13} className="shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="e.g., Campus drive inquiry"
                    className={`w-full rounded-lg border px-3 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 ${
                      errors.subject
                        ? 'border-red-400 bg-red-50/20 focus:ring-red-400'
                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-red-600 text-xs mt-1.5 font-medium flex items-center gap-1">
                      <AlertCircle size={13} className="shrink-0" />
                      <span>{errors.subject}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className={`w-full rounded-lg border px-3 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 resize-none ${
                      errors.message
                        ? 'border-red-400 bg-red-50/20 focus:ring-red-400'
                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-600 text-xs mt-1.5 font-medium flex items-center gap-1">
                      <AlertCircle size={13} className="shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-semibold py-3 cursor-pointer shadow-sm hover:shadow"
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
