import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

const FaqHome = () => {
  const navigate = useNavigate();
  const [openItem, setOpenItem] = useState(null);

  const faqs = [
    {
      question: "How do I find and rent an apartment?",
      answer: "Browse available apartments on our Apartments page, filter by your preferred rent range, then submit an agreement request. Once approved by our team, you'll become a member and can move in on your selected apartment."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, and ACH bank transfers. Corporate payments and wire transfers are also available for special circumstances."
    },
    {
      question: "How can I contact customer support?",
      answer: "Our support team is available via email at info@oneroof.com or phone at (+88) 01904382308 from 9AM to 6PM EST, Monday through Friday."
    },
    {
      question: "Are utilities included in the rent?",
      answer: "Yes! All utilities including water, electricity, and internet are included in your monthly rent."
    }
  ];

  const toggleItem = (index) => {
    setOpenItem(prev => prev === index ? null : index);
  };

  const handleSeeMore = () => {
    // Navigate to the full FAQ page
    navigate('/faq');
  };

  return (
    <div className="bg-[#e4edec] manrope py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Quick answers to the most common questions we receive
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-10">
          {faqs.map((faq, index) => {
            const isOpen = openItem === index;
            
            return (
              <motion.div 
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden bg-white"
                initial={false}
                animate={{ 
                  backgroundColor: isOpen ? "#f0f9ff" : "white",
                  borderColor: isOpen ? "#38bdf8" : "#e5e7eb"
                }}
                transition={{ duration: 0.2 }}
              >
                <button
                  className="flex justify-between items-center w-full p-5 text-left font-medium text-lg focus:outline-none"
                  onClick={() => toggleItem(index)}
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

        {/* See More Button */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSeeMore}
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#142921] to-[#5e736d] text-white  font-medium rounded-lg  transition-colors"
          >
            See More FAQs
            <ArrowRight className="w-5 h-5 ml-2" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default FaqHome;