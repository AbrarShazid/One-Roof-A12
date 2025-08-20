import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Mail, Phone } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      category: "Renting Process",
      questions: [
        {
          question: "How do I find and rent an apartment?",
          answer:
            "Browse available apartments on our Apartments page, filter by your preferred rent range and location, then submit an agreement request. Once approved by our team, you'll become a member and can move in on your selected date."
        },
        {
          question: "What documents do I need to rent an apartment?",
          answer:
            "Typically, you'll need a government-issued ID, proof of income (recent pay stubs or employment letter), and references from previous landlords. International applicants may need additional documentation like visa/passport details."
        },
        {
          question: "How long does the approval process take?",
          answer:
            "Most applications are processed within 24-48 hours during business days. Complex situations or missing documentation may extend this timeline slightly."
        }
      ]
    },
    {
      category: "Payments & Fees",
      questions: [
        {
          question: "How do I make a payment?",
          answer:
            "Go to the Payments page in your dashboard and pay securely through our Stripe integration. You can save payment methods for future use and set up autopay for convenience."
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards, debit cards, and ACH bank transfers. Corporate payments and wire transfers are also available for special circumstances."
        },
        {
          question: "Are there any upfront fees or deposits?",
          answer:
            "We require a security deposit equivalent to one month's rent, which is fully refundable upon move-out assuming no damages beyond normal wear and tear. There's also a $100 application fee."
        },
        {
          question: "How do I use a coupon or promotion?",
          answer:
            "During the payment process, you'll see an option to enter and apply your coupon code before submitting your payment details. Only one coupon can be applied per transaction."
        }
      ]
    },
    {
      category: "Agreement Management",
      questions: [
        {
          question: "What is an agreement request?",
          answer:
            "An agreement request is your application to rent an apartment. Our team reviews each request carefully before approval. Once approved, you'll receive a digital lease agreement to sign electronically."
        },
        {
          question: "Can I submit multiple agreement requests?",
          answer:
            "No. Each user account can only have one active agreement request at a time to ensure fair access to our available properties."
        },
        {
          question: "How can I change apartments?",
          answer:
            "First, you must complete or properly terminate your current lease agreement. After that, you can submit a new agreement request for another available apartment in our portfolio."
        },
        {
          question: "Can I cancel an agreement after signing?",
          answer:
            "Yes, but early termination fees may apply depending on how far in advance you cancel."
        }
      ]
    },
    {
      category: "Security & Support",
      questions: [
        {
          question: "Is my payment information secure?",
          answer:
            "Absolutely. All payments are processed through Stripe using advanced encryption and PCI-compliant security standards. We never store your full payment details on our servers."
        },
        {
          question: "What if I need maintenance or repairs?",
          answer:
            "Submit a maintenance request through  mail."
        },
        {
          question: "Are utilities included in the rent?",
          answer:
            "Yes!"
        },
        {
          question: "What if I have roommates?",
          answer:
            "All adult occupants must be listed on the lease agreement and complete the application process. We offer individual lease options in our co-living properties where each tenant is responsible only for their portion of the rent."
        },
        {
          question: "How can I contact customer support?",
          answer:
            "Our support team is available via email at info@oneroof.com or phone at (+88) 01904382308 from 9AM to 6PM EST, Monday through Friday."
        }
      ]
    }
  ];

  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenItem(prev => prev === key ? null : key);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e5eeed] to-white py-12 px-4 sm:px-6 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div 
            className="flex justify-center mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="p-3 rounded-full bg-white shadow-sm">
              <HelpCircle className="w-8 h-8 text-blue-500" />
            </div>
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about renting, payments, agreements, and more.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-10">
          {faqs.map((category, categoryIndex) => (
            <motion.div 
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-5 pb-2 border-b border-gray-200">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const key = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openItem === key;
                  
                  return (
                    <motion.div 
                      key={questionIndex}
                      className="border border-gray-200 rounded-xl overflow-hidden mb-4 bg-white"
                      initial={false}
                      animate={{ 
                        backgroundColor: isOpen ? "#f0f9ff" : "white",
                        borderColor: isOpen ? "#38bdf8" : "#e5e7eb"
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <button
                        className="flex justify-between items-center w-full p-5 text-left font-medium text-lg focus:outline-none"
                        onClick={() => toggleItem(categoryIndex, questionIndex)}
                      >
                        <span className={isOpen ? "text-blue-600" : "text-gray-800"}>{faq.question}</span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className={`w-5 h-5 ${isOpen ? "text-blue-500" : "text-gray-500"}`} />
                        </motion.div>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ 
                              height: "auto", 
                              opacity: 1,
                              transition: {
                                height: { duration: 0.3 },
                                opacity: { duration: 0.4, delay: 0.1 }
                              }
                            }}
                            exit={{ 
                              height: 0, 
                              opacity: 0,
                              transition: {
                                height: { duration: 0.3 },
                                opacity: { duration: 0.2 }
                              }
                            }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 text-base text-gray-600 leading-relaxed">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Support CTA */}
        <motion.div 
          className="mt-16 p-6 bg-white rounded-xl shadow-sm border border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Still have questions?</h3>
            <p className="text-gray-600 mb-5">Our support team is here to help you</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
            
              <a
                href="tel:+8801904382308"
                className="flex items-center justify-center gap-2 px-5 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call (+88) 01904382308
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FAQ;