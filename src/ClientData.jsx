import { useState, useEffect } from "react";
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
import{ Pencil, Trash, Save} from 'lucide-react';

function ClientData() {
  const [isAddUser, setIsAddUser] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [allUserData, setAllUserData] = useState({});

  const [editingNodeId, setEditingNodeId] = useState(null);
  const [selectedNodeIdForModalView, setSelectedNodeIdForModalView] =
    useState(null);

  const updateItem = (id, value, fieldName) => {
    console.log(id, value, fieldName);
    console.log(allUserData);
    const data = allUserData;
    data[id][fieldName] = value;
    setAllUserData({ ...data });
  };

  const handleClick = (id) => {
    console.log("id", id);
    setIsEditing((prevState) => !prevState); // Update isEditing
    setEditingNodeId(id); // Update editingNodeId
  };

  const handleModalView = (id) => {
    setIsShowModal(true);
    setSelectedNodeIdForModalView(id);
  };

  const handleDelete = (id) => {
    const data = allUserData;
    delete data[id];
    setAllUserData({ ...data });
  }

  // sample data Format
  // const dataTest = {
  //   abc: {
  //     id: "s1",
  //     key: crypto.randomUUID(),
  //     firstName: "John",
  //     lastName: "Doe",
  //     location: "Bangalore",
  //     noOfAppointments: "2",
  //     appointments: [
  //       {
  //         date: "2021-01-01",
  //         time: "10:00",
  //         key: crypto.randomUUID(),
  //       },
  //     ],
  //   },
  // };

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
      <h1 className="font-bold text-2xl">
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
                      {data.appointments.length} Appointments
                    </span>
                    {(data.appointments.length > 0) && (data.appointments.map((appointment) => {
                      return (
                        <p key={appointment.key} className="text-base">
                          {appointment.date} {appointment.time}
                        </p>
                      );
                    }))}
                    {(data.appointments.length > 0) && (<button
                      className="text-blue-500 font-semibold italic hover:text-green-500 hover:underline"
                      onClick={() => handleModalView(key)}
                    >
                      View All
                    </button>
                    )}
                  </span>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => handleClick(data.id)}
                    className="font-medium bg-cyan-500 text-gray-800 hover:bg-cyan-600 dark:text-cyan-500 text-xl mx-2 py-2 px-4 rounded"
                  >
                    {isEditing && editingNodeId === key ? <Save /> : <Pencil />}
                  </button>

                  <button
                    onClick={() => handleDelete(data.id)}
                    className="font-medium bg-red-500 text-gray-800 hover:bg-red-600 dark:text-cyan-500 text-xl mx-2 py-2 px-4 rounded"
                  >
                    <Trash />
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
        <InfoModal
          setIsShowModal={setIsShowModal}
          userData={allUserData}
          selectedID={selectedNodeIdForModalView}
        />
      )}
    </div>
  );
}

export default ClientData;
