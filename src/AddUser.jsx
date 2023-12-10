import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  TableCell,
  TableRow
} from "flowbite-react";

const AddUser = ( {setIsAddUser, allusers, setAllUsers} ) => {
  const userData = {};

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [appointments, setAppointments] = useState([]);

  const generateObject = (id, firstName, lastName, location) => {
    const appointments = [];
  
    return Object.assign({}, {
      id,
      firstName,
      lastName,
      location,
      appointments,
    });
  };

  const handleAddUserData = () => {
    if(firstName !== "" && lastName !== "" && location !== "" && appointments !== ""){
    const id = crypto.randomUUID();
    userData[id] = generateObject(id, firstName, lastName, location, appointments)
    setAllUsers({...allusers, ...userData})
    console.log(allusers)
    localStorage.setItem('appointments', {...allusers})
    setIsAddUser(false);
    }
    else{
      toast.error('Please Fill all the fields!', { position: toast.POSITION.TOP_CENTER })
    }
  };

  return (
    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800 add-user-data border border-b-blue-500 ">
      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-1/5">
        <input
          type="text"
          name="firstName"
          className="p-2 rounded-xl font-normal text-base"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </TableCell>
      <TableCell className="w-1/5  p-1">
        <input
          type="text"
          name="lastName"
          className="p-2 rounded-xl font-normal text-base"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </TableCell>
      <TableCell className="w-1/5  p-1">
        <input
          type="text"
          name="location"
          className="p-2 rounded-xl font-normal text-base"
          placeholder="Appointment Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </TableCell>
      <TableCell className="w-1/4 p-1">
        <input
          type="date"
          name="appointments"
          className="p-2 rounded-xl font-normal text-base mr-2"
          placeholder="Choose Appointment Date and Time"
          value={appointments.appointmentDate}
          onChange={(e) =>
            setAppointments({
              appointmentDate: e.target.value,
            })
          }
        />
        <input
          type="time"
          name="appointments"
          step={1}
          className="p-2 rounded-xl font-normal text-base md:mt-2"
          placeholder="Choose Appointment Date and Time"
          value={appointments.appointmentTime}
          onChange={(e) =>
            setAppointments({
              ...appointments,
              appointmentTime: e.target.value,
            })
          }
        />
      </TableCell>
      <TableCell className="w-1/12">
        <button
          onClick={() => handleAddUserData()}
          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 text-xl"
        >
          Add
        </button>
      </TableCell>
    </TableRow>
  );
};

export default AddUser;
