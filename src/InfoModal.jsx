import React from "react";

const InfoModal = ({ setIsShowModal, userData, selectedID }) => {
  return (
    <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <div className="absolute w-full h-full bg-gray-900 opacity-50"></div>

      <div className="bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">User Details</p>
          </div>
          <div className="mb-2">
            <p className="text-sm font-semibold text-gray-400">First Name:</p>
            <p className="text-base font-medium text-black">
              {userData[selectedID].firstName}
            </p>
          </div>
          <div className="mb-2">
            <p className="text-sm font-semibold text-gray-400">Last Name:</p>
            <p className="text-base font-medium text-black">
              {userData[selectedID].lastName}
            </p>
          </div>
          <div className="mb-2">
            <p className="text-sm font-semibold text-gray-400">Location:</p>
            <p className="text-base font-medium text-black">
              {userData[selectedID].location}
            </p>
          </div>
          <div className="mb-2">
            <p className="text-sm font-semibold text-gray-400">Appointments:</p>
            <p className="text-base font-medium text-black">
              {userData[selectedID].appointments}
            </p>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              className="px-4 bg-blue-500 py-2 ml-3 rounded-lg border-red-400 text-white hover:bg-blue-400"
              onClick={() => setIsShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
