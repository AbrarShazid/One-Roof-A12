import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { FiFilter, FiLayers, FiHome, FiHash } from "react-icons/fi";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import Loading from "../Components/Loading";
import { MdOutlineReportGmailerrorred } from "react-icons/md";

const Apartments = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");

  // fetch apartments 
  const { data: apartmentsData, isLoading, isError, refetch } = useQuery({
    queryKey: ['apartments', page, minRent, maxRent],
    queryFn: async () => {
      const res = await axiosSecure.get("/apartments", {
        params: {
          page,
          minRent: minRent || 0,
          maxRent: maxRent || 999999,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
    staleTime: 60000, // 1 minute
    onError: (error) => {
      console.error("Error fetching apartments:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch apartments. Please try again later.',
        confirmButtonColor: '#142921'
      });
    }
  });

  const apartments = apartmentsData?.apartments || [];
  const totalPages = apartmentsData?.totalPages || 1;

  // Create agreement 
  const { mutate: createAgreement } = useMutation({
    mutationFn: async (apt) => {

      if (!user) {
        // just navigating unauthenticated person 
        navigate("/auth", { state: { from: "/apartments" } });
        throw new Error("User not authenticated");
      }
      const payload = {
        userName: user.displayName,
        userEmail: user.email,
        userImg: user.photoURL,
        floor: apt.floor,
        block: apt.block,
        apartmentNo: apt.apartmentNo,
        rent: apt.rent,
        status: 'pending',
      };

      const res = await axiosSecure.post("/agreements", payload);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'Agreement Submitted!',
        text: 'Your apartment agreement has been submitted for review.',
        confirmButtonColor: '#142921',
        timer: 3000,
        showConfirmButton: false
      });
      queryClient.invalidateQueries(['apartments']);
    },
    onError: (err) => {
      if (err.message === "User not authenticated") return; // as we don't want to show error swal for un authenticated person

      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: err.response?.data?.message || 'An error occurred while submitting the agreement.',
        confirmButtonColor: '#142921'
      });
    }
  });

  const handleFilter = () => {
    setPage(1);
  };

  const handleAgreement = (apt) => {
    createAgreement(apt);
  };

  // animation variants 
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const pageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const loadingVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    }
  };

  if (isError) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6">
        <div className="max-w-md text-center bg-white rounded-xl p-8 shadow-md">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-red-100">
            <MdOutlineReportGmailerrorred className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to load apartments</h3>
          <p className="text-gray-600 mb-6">We couldn't fetch the apartments. Please try again.</p>
          <button
            onClick={refetch}
            className="px-6 py-2 bg-[#142921] text-white rounded-lg hover:opacity-90 transition-opacity shadow-md hover:shadow-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }




  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-[#e5eeed] to-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div
        className="bg-[#142921] text-white py-16 px-4"
        variants={headerVariants}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-[#e5eeed] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Find Your Perfect Apartment
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Discover modern living spaces tailored to your lifestyle
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filter Section */}
        <AnimatePresence>
          <motion.div
            className="mb-8 bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2 className="text-2xl font-semibold text-[#142921] mb-6">Filter Apartments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rent Range
                </label>
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      min="0"
                      placeholder="Min rent"
                      value={minRent}
                      onChange={(e) => setMinRent(e.target.value)}
                      className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#142921] focus:border-transparent transition-all duration-300"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <FaBangladeshiTakaSign />
                    </div>
                  </div>
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      min="0"
                      placeholder="Max rent"
                      value={maxRent}
                      onChange={(e) => setMaxRent(e.target.value)}
                      className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#142921] focus:border-transparent transition-all duration-300"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <FaBangladeshiTakaSign />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <motion.button
                onClick={handleFilter}
                disabled={isLoading}
                className="bg-[#142921] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoading ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <>
                    <FiFilter />
                    Apply Filters
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Loading State */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              className="flex justify-center items-center py-20"
              variants={loadingVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Loading></Loading>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Apartments Grid */}
        <AnimatePresence mode="wait">
          {!isLoading && (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {apartments.map((apt) => (
                <motion.div
                  key={apt._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                  whileHover="hover"
                  layout
                  layoutId={apt._id}
                >
                  <div className="relative overflow-hidden h-48">
                    <motion.img
                      loading="lazy"
                      src={apt.image || '/default-apartment.jpg'}
                      alt={`Apartment ${apt.apartmentNo}`}
                      className="h-full w-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className="absolute top-4 right-4 bg-[#142921] text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaBangladeshiTakaSign className="text-xs" />
                      <span>{apt.rent.toLocaleString()}</span>
                    </motion.div>
                  </div>

                  <div className="p-6">
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500 flex items-center gap-2">
                          <FiLayers className="text-[#142921]" />
                          Floor
                        </span>
                        <span className="text-lg font-semibold text-[#142921]">{apt.floor}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500 flex items-center gap-2">
                          <FiHome className="text-[#142921]" />
                          Block
                        </span>
                        <span className="text-lg font-semibold text-[#142921]">{apt.block}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500 flex items-center gap-2">
                          <FiHash className="text-[#142921]" />
                          Apartment No
                        </span>
                        <span className="text-lg font-semibold text-[#142921]">{apt.apartmentNo}</span>
                      </div>
                    </div>

                    <motion.button
                      onClick={() => handleAgreement(apt)}
                      className="w-full bg-gradient-to-r from-[#142921] to-[#1a3429] text-white py-3 rounded-lg font-medium hover:from-[#1a3429] hover:to-[#142921] transition-all duration-300 flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Submit Agreement
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        <AnimatePresence>
          {!isLoading && apartments.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🏠
              </motion.div>
              <motion.h3
                className="text-2xl font-semibold text-gray-600 mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                No Apartments Found
              </motion.h3>
              <motion.p
                className="text-gray-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Try adjusting your search or filter criteria
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex gap-1 bg-white rounded-xl shadow-lg p-1">
              <motion.button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 hover:bg-gray-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                &lt;
              </motion.button>

              {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }

                return (
                  <motion.button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${page === pageNum
                      ? "bg-[#142921] text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                      }`}
                    variants={pageVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                  >
                    {pageNum}
                  </motion.button>
                );
              })}

              <motion.button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 hover:bg-gray-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                &gt;
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Apartments;