import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, Phone, Car, Train, Bus } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { motion } from 'framer-motion';

const Location = () => {



  useEffect(() => {
    // Ensure Leaflet CSS is loaded
    if (typeof window !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: .5,
        ease: "easeOut"
      }
    }
  };
  const [activeTab, setActiveTab] = useState('Overview');



  const apartmentDetails = {
    address: "House no-04, Sector-6",
    area: "Uttara, Dhaka 1230",
    country: "Bangladesh",

    coordinates: { lat: 23.87000437026965, lng: 90.40266492968561 },
    landmark: "Near Uttara Sector 6 Central Park & Uttara University"
  };

  const transportOptions = [
    {
      icon: <Car className="w-5 h-5" />,
      type: "By Car",
      time: "15-20 mins from Airport",
      details: "Take Airport Road → Uttara Sector 6 (Direct route)"
    },
    {
      icon: <Train className="w-5 h-5" />,
      type: "By Metro",
      time: "10 mins from Uttara Center Station",
      details: "Take MRT Line 6 to Uttara Center (2 stops from Airport)"
    },
    {
      icon: <Bus className="w-5 h-5" />,
      type: "By Bus",
      time: "25-30 mins from city center",
      details: "Routes: Uttara Express, BRTC AC buses to Uttara"
    }
  ];

  const nearbyPlaces = [
    { name: "Uttara Sector 6 Park", distance: "3 min walk", type: "Recreation" },
    { name: "Uttara Town Center", distance: "8 min drive", type: "Shopping" },
    { name: "United Hospital", distance: "10 min drive", type: "Healthcare" },
    { name: "Uttara University", distance: "5 min walk", type: "Education" },
    { name: "Uttara Central Mosque", distance: "7 min walk", type: "Religious" },
    { name: "Sector 6 Market", distance: "5 min walk", type: "Market" }
  ];

  return (
    <div id='findUs' className=" py-4 md:py-8 bg-[#e4edec] px-3 md:px-[3%] manrope ">
      <motion.div variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} className=" mx-auto  container">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div variants={itemVariants} className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#bed4d1] to-[#142921] rounded-full mb-6">
            <MapPin className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-4xl font-bold text-gray-800 mb-4">
            Find Your Perfect Location
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our premium apartment in Uttara, Dhaka's most modern planned residential area
          </motion.p>
        </div>

        {/* Address Card */}
        <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-2xl p-6  md:p-8 mb-8 border  border-gray-100">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <MapPin className="w-6 h-6 mr-3 text-[#142921]" />
                Address Details
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#142921] rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-800">{apartmentDetails.address}</p>
                    <p className="text-gray-600">{apartmentDetails.area}</p>
                    <p className="text-gray-600">{apartmentDetails.country}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 md:pt-4">
                  <Navigation className="w-5 h-5 text-[#142921]" />
                  <span className="text-gray-700">{apartmentDetails.landmark}</span>
                </div>
              </div>
            </div>

            {/* Interactive Map */}
            <div className="relative">
              <div className="rounded-2xl h-64 overflow-hidden shadow-lg">
                <MapContainer
                  center={[apartmentDetails.coordinates.lat, apartmentDetails.coordinates.lng]}
                  zoom={15}
                  scrollWheelZoom={true}
                  style={{ height: '100%', width: '100%' }}

                >
                  <TileLayer

                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  <Marker position={[apartmentDetails.coordinates.lat, apartmentDetails.coordinates.lng]}>
                    <Popup>
                      <div className="text-center">

                        <strong>{apartmentDetails.address}</strong><br />
                        {apartmentDetails.area}<br />

                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center mb-8">
          <div className="bg-white/1 backdrop-blur-md rounded-full p-1 shadow-2xl flex border border-[#bed4d1]">
            {['Overview', 'Transport', 'Nearby'].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative  px-6 py-3  font-medium  ${activeTab === tab ? 'text-white' : 'text-[#142921] '
                  }`}
                initial={false}
                animate={{
                  transition: { duration: 0.3 }
                }}
              >
                {activeTab === tab && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#142921] rounded-full z-0"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10 ">
                  {tab}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Content Sections */}
        <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          {activeTab === 'Overview' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Location Overview</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">About the Area</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Uttara is Dhaka's most modern planned residential area, known for its wide roads,
                    organized sectors, and excellent infrastructure. Located close to the airport,
                    it offers a perfect blend of urban convenience and peaceful living, making it
                    ideal for professionals and families seeking a well-planned community.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Key Features</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center"><span className="w-2 h-2 bg-[#bed4d1] rounded-full mr-3"></span>Planned residential area</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-[#bed4d1] rounded-full mr-3"></span>Close to airport</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-[#bed4d1] rounded-full mr-3"></span>Modern infrastructure</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-[#bed4d1] rounded-full mr-3"></span>Well-organized sectors</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Transport' && (
            <div >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Transportation Options</h3>
              <div className="grid md:gap-6 gap-3 ">
                {transportOptions.map((option, index) => (
                  <div key={index} className="border border-gray-200 rounded-2xl p-3 md:p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-2 md:mb-4">
                      <div className=" w-10 h-10 md:w-12  md:h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-2 md:mr-4">
                        {option.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{option.type}</h4>
                        <p className="text-sm text-gray-600 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {option.time}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 ml-[15%] md:ml-16">{option.details}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Nearby' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Nearby Places</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {nearbyPlaces.map((place, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800">{place.name}</h4>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {place.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 flex items-center">
                      <Navigation className="w-4 h-4 mr-1" />
                      {place.distance}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>


      </motion.div>
    </div>
  );
};

export default Location;
















