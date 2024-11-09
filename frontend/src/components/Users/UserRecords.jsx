import React, { useEffect, useState, useContext } from "react";
import styles from "./UserRecords.module.css";
import AddUserModal from "./AddUserModal";
import DeleteConfirmation from "../ConfirmationModal/DeleteConfirmation";
import { jwtDecode } from "jwt-decode";
import baseUrl from "../../config";

function UserRecords() {
  const [users, setUsers] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [deleteConfirmationShow, setDeleteConfirmationShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchUsers = async () => {
    const token = sessionStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      setCurrentUser(decodedToken);
    }

    const users = await fetch(baseUrl + "auth/getUsers.php", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await users.json();

    if (response.success) {
      setUsers(response.data);
      console.log(response.data);
    } else {
      alert(response.message);
    }
  };

  const deleteUser = async (userId) => {
    var formData = new FormData();

    formData.append("user_id", userId);

    const token = sessionStorage.getItem("token");

    const deleteUser = await fetch(baseUrl + "auth/deleteUser.php", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: formData,
    });

    const response = await deleteUser.json();

    if (response.success) {
      fetchUsers();
      setDeleteConfirmationShow(false);
      setTimeout(() => {
        alert(response.message);
      }, 100);
    } else {
      alert(response.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [modalShow, deleteConfirmationShow]);

  const filteredUsers = users.filter(
    (user) => user.user_id !== currentUser?.user_id
  );

  return (
    <>
      <div className={styles.parentContainer}>
        <div className={styles.addUserButtonContainer}>
          <button onClick={() => setModalShow(true)}>Add User</button>
        </div>
        <div className={styles.listContainer}>
          {filteredUsers.map((item, index) => (
            <div key={index} className={styles.userItemContainer}>
              <div className={styles.userItemRow}>
                <div className={styles.userItemColumn}>
                  <p>Name</p>
                  <p>{item.user_fullname}</p>
                </div>
                <div className={styles.userItemColumn}>
                  <p>Email</p>
                  <p className={styles.email}>{item.user_email}</p>
                </div>
                <div className={styles.userItemColumn}>
                  <p>Role</p>
                  <p>{item.role === "user" ? "User" : "Admin"}</p>
                </div>

                <div className={styles.userItemColumn}>
                  <p>Date Added</p>
                  <p>
                    {new Date(item.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div className={styles.userItemColumn}>
                  <div className={styles.buttonsContainer}>
                    <button
                      className={styles.deleteUserButton}
                      onClick={() => {
                        setSelectedUser(item);
                        setDeleteConfirmationShow(true);
                      }} /*onClick = {() => deleteUser(item.user_id)}*/
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddUserModal modalShow={modalShow} setModalShow={setModalShow} />
      {selectedUser && (
        <DeleteConfirmation
          deleteConfirmationShow={deleteConfirmationShow}
          setDeleteConfirmationShow={setDeleteConfirmationShow}
          userDetails={selectedUser}
          onConfirm={() => deleteUser(selectedUser.user_id)}
        />
      )}
    </>
  );
}

export default UserRecords;
