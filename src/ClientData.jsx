import { useState, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import AddUser from "./AddUser";
import InfoModal from "./InfoModal";
import EditableCell from "./EditableCell";

function ClientData() {
  const [isAddUser, setIsAddUser] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [allUserData, setAllUserData] = useState({});

  const [editingNodeId, setEditingNodeId] = useState(null);

  const updateItem = (id, value, fieldName) => {
    console.log(id, value, fieldName);
    console.log(allUserData);
    const data = allUserData;
    data[id][fieldName] = value;
    setAllUserData({ ...data });
  };

  const handleClick = (id) => {
    console.log("id", id);
    if (isEditing) {
      setEditingNodeId(id);
      setIsEditing(false);
    } else {
      setIsEditing(true);
      setEditingNodeId(null);
    }
  };

  const dataTest = {
    abc: {
      id: "s1",
      key: crypto.randomUUID(),
      firstName: "John",
      lastName: "Doe",
      location: "Bangalore",
      noOfAppointments: "2",
      appointments: [
        {
          id: "A1",
          date: "2021-01-01",
          time: "10:00 AM",
          duration: "30",
          status: "Completed",
          key: crypto.randomUUID(),
        },
      ],
    },
  };

  useEffect(() => {
    const dataInObject = JSON.parse(localStorage.getItem("appointments"));
    if (dataInObject) {
      setAllUserData(dataInObject);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(allUserData).length > 0) {
      localStorage.setItem("appointments", JSON.stringify({ ...allUserData }));
    }
  }, [allUserData]);
  return (
    <div className="flex p-4 flex-col">
      <h1 className="font-bold text-2xl ">
        Welcome to Fitness Trainer Appointment Scheduler
      </h1>
      <Table hoverable className="w-full">
        <TableHead className="border rounded-s-xl">
          <TableHeadCell>First Name</TableHeadCell>
          <TableHeadCell>Last Name</TableHeadCell>
          <TableHeadCell>Location</TableHeadCell>
          <TableHeadCell>Appointments</TableHeadCell>
          <TableHeadCell>
            <span className="sr-only">Edit</span>
          </TableHeadCell>
        </TableHead>
        <TableBody>
          {Object.keys(allUserData).length > 0 &&
            Object.entries(allUserData).map(([key, data]) => (
              <TableRow
                className="bg-white dark:border-gray-700 dark:bg-gray-800 border border-b-gray-400"
                key={key}
              >
                <TableCell className="text-lg">
                  <EditableCell
                    value={data.firstName}
                    isEditing={isEditing}
                    updateItem={updateItem}
                    id={key}
                    inputName={"firstName"}
                    editingNodeId={editingNodeId}
                  />
                </TableCell>

                <TableCell className="text-lg">
                  <EditableCell
                    value={data.lastName}
                    isEditing={isEditing}
                    updateItem={updateItem}
                    id={key}
                    inputName={"lastName"}
                    editingNodeId={editingNodeId}
                  />
                </TableCell>
                <TableCell className="text-lg">
                  <EditableCell
                    value={data.location}
                    isEditing={isEditing}
                    updateItem={updateItem}
                    id={key}
                    inputName={"location"}
                    editingNodeId={editingNodeId}
                  />
                </TableCell>
                <TableCell>
                  <span className="text-base">
                    <span className="text-blue-500 font-semibold">
                      {/* {data.noOfAppointments} Appointments */}
                    </span>
                    {data.appointments.map((appointment) => {
                      return (
                        <p key={appointment.key} className="text-base">
                          {appointment.date} {appointment.time}
                        </p>
                      );
                    })}
                    <button
                      className="text-blue-500 font-semibold italic hover:text-green-500 hover:underline"
                      onClick={() => setIsShowModal(true)}
                    >
                      View All
                    </button>
                  </span>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => handleClick(data.id)}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 text-xl"
                  >
                    {isEditing && editingNodeId === key ? "Save" : "Edit"}
                  </button>
                </TableCell>
              </TableRow>
            ))}
          {Object.keys(allUserData).length == 0 && !isAddUser && (
            <TableRow className="text-gray-600 font-base">
              <TableCell colSpan={5} className="text-center">
                No Records Found
              </TableCell>
            </TableRow>
          )}
          {isAddUser && (
            <AddUser
              setIsAddUser={setIsAddUser}
              allusers={allUserData}
              setAllUsers={setAllUserData}
            />
          )}
        </TableBody>
      </Table>
      <div>
        <button
          onClick={() => setIsAddUser(true)}
          className="p-3 my-4 bg-blue-500 text-white font-bold border-2 border-blue-500 rounded-xl"
        >
          Add User
        </button>
      </div>

      {isShowModal && (
        <InfoModal setIsShowModal={setIsShowModal} userData={allUserData} />
      )}
    </div>
  );
}

export default ClientData;
