'use client';

import { motion } from 'motion/react';
import { useState } from 'react';

export function PlanYourVisitContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div id='contact-form' className="w-full flex-1  bg-white py-16 md:py-24 px-6 md:px-8">
      <motion.div
        className="max-w-225 mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div className="text-center mb-12 md:mb-16" variants={itemVariants}>
          <h2 className="text-[36px] font-display text-black md:text-[42px] lg:text-[48px] font-bold tracking-tight leading-tight mb-4">
            LET US KNOW YOU'RE COMING
          </h2>
          <p className="text-[16px] md:text-[18px] lg:text-[24px] text-black/80">
            Planning to Visit? Fill out this quick form so we can welcome you!
          </p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* First Name & Last Name */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8"
            variants={itemVariants}
          >
            <div>
              <label
                htmlFor="firstName"
                className="block text-black text-[15px] font-semibold mb-3"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onFocus={() => setFocusedField('firstName')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-6 py-4 border-2 border-black/80 rounded-full outline-none transition-all duration-200 focus:border-black focus:shadow-lg ${
                  focusedField === 'firstName' ? 'text-black' : 'text-black/50'
                }`}
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-black text-[15px] font-semibold mb-3"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onFocus={() => setFocusedField('lastName')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-6 py-4 border-2 border-black/80 rounded-full outline-none transition-all duration-200 focus:border-black focus:shadow-lg ${
                  focusedField === 'lastName' ? 'text-black' : 'text-black/50'
                }`}
              />
            </div>
          </motion.div>

          {/* Email & Phone Number */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8"
            variants={itemVariants}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-black text-[15px] font-semibold mb-3"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-6 py-4 border-2 border-black/80 rounded-full outline-none transition-all duration-200 focus:border-black focus:shadow-lg ${
                  focusedField === 'email' ? 'text-black' : 'text-black/50'
                }`}
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-black text-[15px] font-semibold mb-3"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-6 py-4 border-2 border-black/80 rounded-full outline-none transition-all duration-200 focus:border-black focus:shadow-lg ${
                  focusedField === 'phone' ? 'text-black' : 'text-black/50'
                }`}
              />
            </div>
          </motion.div>

          {/* Subject */}
          <motion.div className="mb-6 md:mb-8" variants={itemVariants}>
            <label
              htmlFor="subject"
              className="block text-black text-[15px] font-semibold mb-3"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              onFocus={() => setFocusedField('subject')}
              onBlur={() => setFocusedField(null)}
              className={`w-full px-6 py-4 border-2 border-black/80 rounded-full outline-none transition-all duration-200 focus:border-black focus:shadow-lg ${
                focusedField === 'subject' ? 'text-black' : 'text-black/50'
              }`}
            />
          </motion.div>

          {/* Message */}
          <motion.div className="mb-8 md:mb-10" variants={itemVariants}>
            <label
              htmlFor="message"
              className="block text-black text-[15px] font-semibold mb-3"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              rows={5}
              className={`w-full px-6 py-4 border-2 border-black/80 rounded-4xl outline-none transition-all duration-200 focus:border-black focus:shadow-lg resize-none ${
                focusedField === 'message' ? 'text-black' : 'text-black/50'
              }`}
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants}>
            <button
              type="submit"
              className="w-full font-display bg-black text-white py-5 rounded-full text-[14px] font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-black/90"
            >
              LET US KNOW YOU'RE COMING
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
