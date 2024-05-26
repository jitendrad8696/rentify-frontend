import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProperties, deleteProperty } from "../data/propertySlice";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

const likeIcon =
  "https://img.freepik.com/free-photo/blue-bubble-like-button-icon-thumbs-up-like-sign-feedback-concept-white-background-3d-rendering_56104-1133.jpg";

function Properties() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [propertiesPerPage] = useState(3);
  const [loading, setLoading] = useState(true);

  const properties = useSelector((state) => state.properties.properties);
  const offset = currentPage * propertiesPerPage;
  const currentProperties = properties.slice(
    offset,
    offset + propertiesPerPage
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://rentify-backend-llkc.onrender.com/api/v1/properties/get-properties");
        dispatch(getProperties(response.data.data));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, [dispatch]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleEdit = (id) => {
    navigate(`/edit-property/${id}`);
  };

  const handleDeleteProperty = async (propertyId) => {
    try {
      const response = await axios.delete(
        `https://rentify-backend-llkc.onrender.com/api/v1/properties/delete/${propertyId}`
      );
      if (response.data.success) {
        dispatch(deleteProperty(propertyId));
        alert("Property deleted successfully!");
        window.location.reload();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("An error occurred while deleting the property.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
                <div className="flex items-center">
                  <img
                    className="w-20 h-10 mr-1"
                    src={likeIcon}
                    alt="Like Icon"
                  />
                  <span className="text-gray-700">{property.likes.length}</span>
                </div>
                <div className="mt-4">
                  <button
                    className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleEdit(property._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleDeleteProperty(property._id)}
                  >
                    Delete
                  </button>
                </div>
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

export default Properties;
