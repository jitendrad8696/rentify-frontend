import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { updateProperty } from "../data/propertySlice";

const likeIcon =
  "https://img.freepik.com/free-photo/blue-bubble-like-button-icon-thumbs-up-like-sign-feedback-concept-white-background-3d-rendering_56104-1133.jpg";

function BuyerProperties() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [propertiesPerPage] = useState(3);
  const [showOwnerDetails, setShowOwnerDetails] = useState({});

  const properties = useSelector((state) => state.properties.properties);
  const buyer = useSelector((state) => state.user.user);
  const offset = currentPage * propertiesPerPage;
  const currentProperties = properties.slice(
    offset,
    offset + propertiesPerPage
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const sendOwnerInfo = async (property) => {
    try {
      const response = await axios.post("https://rentify-backend-llkc.onrender.com/api/v1/properties/sendOwnerInfo", {
        propertyId: property._id,
        buyerId: buyer._id,
      });
      if (response.data.success) {
        alert("Owner info sent to your email");
      } else {
        alert("Failed to send owner info");
      }
    } catch (error) {
      console.error("Error sending owner info:", error);
      alert("An error occurred while sending owner info");
    }
  };

  const toggleOwnerDetails = async (property) => {
    const propertyId = property._id;
    if (!showOwnerDetails[propertyId]) {
      await sendOwnerInfo(property);
    }
    setShowOwnerDetails((prevState) => ({
      ...prevState,
      [propertyId]: !prevState[propertyId],
    }));
  };

  const handleToggleLike = async (property) => {
    try {
      const response = await axios.post("https://rentify-backend-llkc.onrender.com/api/v1/properties/toggle-like", {
        propertyId: property._id,
        userId: buyer._id,
      });

      if (response.data.success) {
        dispatch(updateProperty(response.data.data));
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Properties</h1>
      {currentProperties.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          Oops, no property found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProperties.map((property) => (
            <div
              key={property._id}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{property.title}</h2>
                <p className="text-gray-700 mb-2">
                  Property Type: {property.propertyType}
                </p>
                <p className="text-gray-700 mb-2">
                  Location: {property.city}, {property.state}
                </p>
                <p className="text-gray-700 mb-2">Price: {property.price}</p>
                <p className="text-gray-700 mb-2">
                  Bedrooms: {property.bedrooms}
                </p>
                <p className="text-gray-700 mb-2">
                  Bathrooms: {property.bathrooms}
                </p>
                <p className="text-gray-700 mb-2">
                  {property.bachelorsAllowed
                    ? "Bachelors Allowed"
                    : "No Bachelors Allowed"}
                </p>
                <p className="text-gray-700 mb-2">
                  Nearby Railway Station Distance:{" "}
                  {property.nearbyRailwayStationDistance} KM
                </p>
                <p className="text-gray-700 mb-2">
                  Nearby Hospital Distance: {property.nearbyHospitalDistance} KM
                </p>
                <div className="flex items-center mb-4">
                  <img
                    className="w-20 h-10 mr-1 cursor-pointer"
                    src={likeIcon}
                    alt="Like Icon"
                    onClick={() => handleToggleLike(property)}
                  />
                  <span className="text-gray-700">{property.likes.length}</span>
                </div>
                <button
                  onClick={() => toggleOwnerDetails(property)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {showOwnerDetails[property._id]
                    ? "Hide Owner Details"
                    : "Show Owner Details"}
                </button>
                {showOwnerDetails[property._id] && (
                  <div className="mt-4">
                    <p className="text-gray-700 mb-2">
                      Owner Name: {property.owner.firstName}{" "}
                      {property.owner.lastName}
                    </p>
                    <p className="text-gray-700 mb-2">
                      Email: {property.owner.email}
                    </p>
                    <p className="text-gray-700 mb-2">
                      Phone: {property.owner.phoneNumber}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-6">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={Math.ceil(properties.length / propertiesPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
}

export default BuyerProperties;
