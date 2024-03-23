import React, { useState, useEffect } from "react";
import DeleteConfirmationModal from "./DeleteConfirm";
import axios from "axios";

import {
  isEmpty,
  isPasswordValid,
  isEmailValid,
} from "../../helper/validation.js";
import { useSelector } from "react-redux";
import AdminNavbar from "./AdminNavbar";

export const AdminDash = () => {
  const [user, setUser] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editerr, setEditerr] = useState(false);
  const [editerrdef, setEditerrdef] = useState("");
  const [open, setOpen] = useState(false);

  const usersdata = useSelector((state) => state.user.currentUser);
  console.log("user data:@@@@@@", usersdata._id);

  const [editname, setEditname] = useState({
    name: "",
    id: "",
    value: "",
    user_id: usersdata._id,
  });
  const [error, setError] = useState({
    emailred: false,
    namered: false,
    passwordred: false,
    confirmpasswordred: false,
  });
  const [errordef, seterrordef] = useState({
    emailerr: "",
    nameerr: "",
    passworderr: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    Password: "",
  });
  const [deluser, setDelUser] = useState("");
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [delid, setDelid] = useState(null);

  const openAddModal = () => {
    setAddModalOpen(true);
  };
  const closeAddModal = () => {
    setNewUserData({
      name: "",
      email: "",
      Password: "",
    });
    setAddModalOpen(false);
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
    console.log(newUserData);
  };

  const addUser = () => {
    let errors = {
      emailred: false,
      namered: false,
      passwordred: false,
      confirmpasswordred: false,
    };

    let errorMessages = {
      emailerr: "",
      nameerr: "",
      passworderr: "",
      confirmpassworderr: "",
    };

    if (isEmpty(newUserData.email)) {
      errors.emailred = true;
      errorMessages.emailerr = "Email can't be empty";
    } else if (isEmailValid(newUserData.email)) {
      errors.emailred = true;
      errorMessages.emailerr = "Enter a valid email";
    }

    // Validate name
    if (isEmpty(newUserData.name)) {
      errors.namered = true;
      errorMessages.nameerr = "Name can't be empty";
    }

    // Validate password
    if (isEmpty(newUserData.Password)) {
      errors.passwordred = true;
      errorMessages.passworderr = "Password can't be empty";
    } else if (isPasswordValid(newUserData.Password)) {
      errors.passwordred = true;
      errorMessages.passworderr = "Password is too weak";
    }
    setError(errors);
    seterrordef(errorMessages);

    if (!errors.emailred && !errors.namered && !errors.passwordred) {
      async function register() {
        try {
          await axios
            .post("http://localhost:3000/admin/adduser/", newUserData)
            .then((response) => {
              if (response.data.success) {
                closeAddModal();
                axios
                  .get("http://localhost:3000/admin/fetchusertoadmin")
                  .then((response) => {
                    const fetchedUsers = response.data.data;
                    const usersWithId = fetchedUsers.map((user, index) => ({
                      ...user,
                      id: index + 1,
                    }));

                    setUser(usersWithId);
                    setIsLoading(false);
                  })
                  .catch((err) => {
                    console.log(err);
                    setIsLoading(false);
                  });
              } else if (response.data.error) {
                setError((previous) => ({
                  ...previous,
                  emailred: true,
                }));
                seterrordef((previous) => ({
                  ...previous,
                  emailerr: response.data.error,
                }));
              }
            });
        } catch (error) {
          console.log(error);
        }
      }
      register();
    }
  };

  //edit modal
  const openEditModal = (id) => {
    const userToEdit = user.find((item) => item.id === id);
    setEditModalOpen(true);
    setEditname({
      username: userToEdit.username,
      id: userToEdit.id,
      value: "",
      user_id: userToEdit._id,
    });
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditname("");
  };

  const editvalue = (event) => {
    const value = event.target.value;
    setEditname((previous) => ({
      ...previous,
      value: value,
    }));
  };

  //delete modal
  const handleDelete = async (id) => {
    const userToDelete = user.find((item) => item.id === id);
    setDelUser(userToDelete.name);
    setDeleteModalOpen(true);
    setDelid(id);
  };
  const handleConfirmDelete = () => {
    console.log("Deleting user with ID:", delid);
    setDeleteModalOpen(false);
    deletecred(delid);
  };

  ///delete user
  const deletecred = (id) => {
    const userToDelete = user.find((item) => item.id == id);
    axios
      .delete("http://localhost:3000/admin/deleteuser", {
        data: { id: userToDelete._id },
      })
      .then(() => {
        axios
          .get("http://localhost:3000/admin/fetchusertoadmin")
          .then((response) => {
            const fetchedUsers = response.data.data;
            const usersWithId = fetchedUsers.map((user, index) => ({
              ...user,
              id: index + 1,
            }));

            setUser(usersWithId);
            setIsLoading(false);
            setDelUser("");
            setDeleteModalOpen(false);
            setDelid(null);
          })
          .catch((err) => {
            console.error("Error fetching users after deletion:", err);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  ///edit user
  const handleEdit = () => {
    let valid = true;
    console.log(editname, "!@#$%^&*(*&^%$#");
    if (isEmpty(editname.value)) {
      valid = false;
      setEditerr(true);
      setEditerrdef("field can't be empty");
    }

    if (valid) {
      setEditerr(false);
      setEditerrdef("");

      axios
        .post("http://localhost:3000/admin/edituser", editname)
        .then(() => {
          setOpen(false);
          axios
            .get("http://localhost:3000/admin/fetchusertoadmin")
            .then((response) => {
              const fetchedUsers = response.data.data;
              const usersWithId = fetchedUsers.map((user, index) => ({
                ...user,
                id: index + 1,
              }));

              setUser(usersWithId);
              setIsLoading(false);
              setEditname({
                name: "",
                id: "",
                value: "",
              });
              setEditModalOpen(false);
            })
            .catch((err) => {
              console.error("Error fetching users after deletion:", err);
              setIsLoading(false);
            });
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    }
  };
  const [search, setSearch] = useState("");
  useEffect(() => {
    console.log(search,'!!!!!!!!!!!');
    axios
      .get(
        `http://localhost:3000/admin/fetchusertoadmin${
          search ? `?search=${search}` : ""
        }`
      )
      .then((response) => {
        const fetchedUsers = response.data.data;
        const usersWithId = fetchedUsers.map((user, index) => ({
          ...user,
          id: index + 1,
        }));

        setUser(usersWithId);
        setIsLoading(false);
      })

      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });

    //   const loadData = async () => {
    //     const res = await axios.get(
    //       "http://localhost:5000/admin/fetchusertoadmin"
    //     );
    //     if (res && res.data && res.data.data) {
    //       setUser(res.data.data);
    //     }
    //   };
    //   loadData();
  }, [search]);
  console.log(".then ~ setUser:", user);
  return (
    <>
      <AdminNavbar
        users={user}
        setUser={setUser}
        setAddModalOpen={setAddModalOpen}
        setSearch={setSearch}
      />

      <div className="container mx-auto mt-8 p-4 max-w-5xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 font-serif">
            User Management
          </h2>
          <button
            onClick={() => setAddModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300 font-semibold"
          >
            Add User
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-md shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-semibold"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-semibold"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-semibold"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-semibold"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {}
                {user.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-100 odd:bg-gray-50 even:bg-white"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openEditModal(user.id)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4 font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-900 font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <div className="bg-white rounded-lg shadow p-8 z-10">
            <h2 className="text-2xl font-bold mb-4 font-serif">
              Edit User Name
            </h2>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                New Name:
              </label>
              <input
                type="text"
                value={editname.value}
                onChange={editvalue}
                className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent font-medium"
              />
              {editerr && (
                <p className="text-red-500 mt-2 text-sm font-medium">
                  {editerrdef}
                </p>
              )}
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300 font-semibold"
              >
                Save
              </button>
              <button
                onClick={closeEditModal}
                className="ml-2 px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors duration-300 font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <div
            className="bg-white rounded-lg shadow p-8 z-10"
            style={{ width: "500px" }}
          >
            <h2 className="text-2xl font-bold mb-4 font-serif">Add User</h2>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={newUserData.name}
                onChange={handleAddChange}
                className={`border px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent font-medium ${
                  error.namered ? "border-red-500" : "border-gray-300"
                }`}
              />
              {error.namered && (
                <p className="text-red-500 mt-2 text-sm font-medium">
                  {errordef.nameerr}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={newUserData.email}
                onChange={handleAddChange}
                className={`border px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent font-medium ${
                  error.emailred ? "border-red-500" : "border-gray-300"
                }`}
              />
              {error.emailred && (
                <p className="text-red-500 mt-2 text-sm font-medium">
                  {errordef.emailerr}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password:
              </label>
              <input
                type="password"
                name="Password"
                value={newUserData.Password}
                onChange={handleAddChange}
                className={`border px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent font-medium ${
                  error.passwordred ? "border-red-500" : "border-gray-300"
                }`}
              />
              {error.passwordred && (
                <p className="text-red-500 mt-2 text-sm font-medium">
                  {errordef.passworderr}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={addUser}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300 font-semibold"
              >
                Add User
              </button>
              <button
                onClick={closeAddModal}
                className="ml-2 px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors duration-300 font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
