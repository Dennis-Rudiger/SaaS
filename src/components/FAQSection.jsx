import React, { useState } from 'react';

const faqs = [
  {
    id: 1,
    question: "How does the 14-day free trial work?",
    answer: "Our 14-day free trial gives you full access to all features of the platform with no credit card required. At the end of your trial, you can choose the plan that best fits your needs or continue with our free basic plan."
  },
  {
    id: 2,
    question: "Do I need a credit card to sign up?",
    answer: "No, you don't need a credit card to sign up for our 14-day free trial. We only require your email address and basic information to get started. You'll only need to provide payment details if you decide to continue with a paid plan after your trial ends."
  },
  {
    id: 3,
    question: "Can I change my plan later?",
    answer: "Yes, you can upgrade, downgrade, or change your plan at any time. When upgrading, you'll be billed the prorated amount for the remainder of your billing cycle. If you downgrade, the new pricing will take effect at the beginning of your next billing cycle."
  },
  {
    id: 4,
    question: "Is there a setup fee?",
    answer: "No, there are no setup fees or hidden charges with any of our plans. The price you see is the price you pay. We believe in transparent pricing and providing outstanding value to our customers."
  },
  {
    id: 5,
    question: "What kind of support do you offer?",
    answer: "We offer different levels of support depending on your plan. All customers receive access to our help center, documentation, and community forums. Professional and Enterprise plans include email support, while Enterprise customers also receive priority phone support and a dedicated account manager."
  },
  {
    id: 6,
    question: "Can I export my data if I decide to cancel?",
    answer: "Absolutely. We believe your data belongs to you. If you decide to cancel your subscription, we provide easy tools to export all of your data in standard formats that can be imported into other systems."
  },
  {
    id: 7,
    question: "Do you offer discounts for non-profits or educational institutions?",
    answer: "Yes, we offer special pricing for qualified non-profit organizations, educational institutions, and student projects. Please contact our sales team with verification of your status to learn more about our discount programs."
  },
  {
    id: 8,
    question: "How secure is my data?",
    answer: "We take security very seriously. All data is encrypted in transit and at rest. We implement industry-standard security measures including regular security audits, two-factor authentication, and SOC 2 compliance. Our systems are hosted in secure, certified data centers with 24/7 monitoring."
  }
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white" id="faq">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about our service? Find answers to common questions below.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="border-b border-gray-200 last:border-b-0"
            >
              <button
                className="w-full flex items-center justify-between py-5 px-3 text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                <svg
                  className={`w-6 h-6 text-gray-500 transform transition-transform ${
                    activeIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? 'max-h-96 pb-5' : 'max-h-0'
                }`}
              >
                <p className="px-3 text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">Still have questions?</p>
          <a
            href="/contact"
            className="inline-flex items-center text-primary font-medium hover:text-primary-dark transition"
          >
            Contact our support team
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
