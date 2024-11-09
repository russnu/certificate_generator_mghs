import React, { useEffect, useState, useContext } from "react";
import Modal from "react-modal";
import styles from "./AddUserModal.module.css";
import baseUrl from "../../config";

function AddUserModal({ modalShow, setModalShow }) {
  const [userFullname, setUserFullname] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRole, setUserRole] = useState("");

  Modal.setAppElement("#root");

  //=============================================================//
  function closeModal() {
    setUserFullname("");
    setUserEmail("");
    setUserPassword("");
    setUserRole("");

    setModalShow(false);
  }

  //=============================================================//
  const handleAdd = async (e) => {
    e.preventDefault();

    const emailIsValid = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    if (!userEmail || !emailIsValid(userEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    const token = sessionStorage.getItem("token");

    console.log("Token:", token);

    try {
      const formData = new FormData();
      formData.append("user_fullname", userFullname);
      formData.append("user_email", userEmail);
      formData.append("user_password", userPassword);
      formData.append("user_role", userRole);

      const users = await fetch(baseUrl + "auth/createUser.php", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: formData,
      });

      const response = await users.json();

      console.log(response);

      if (response.success) {
        closeModal();
        setTimeout(() => {
          alert(response.message);
        }, 100);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Error adding user:", error);
      closeModal();
      setTimeout(() => {
        alert("There was an error adding the user.");
      }, 100);
    }
  };

  //=========================================================================================================//
  return (
    <>
      <div>
        <Modal
          isOpen={modalShow}
          onRequestClose={closeModal}
          className={styles.modalContainer}
          overlayClassName={styles.modalOverlay}
          contentLabel="Add User Modal"
        >
          <h2 className={styles.modalTitle}>Add a New User</h2>

          <form action="" onSubmit={handleAdd}>
            <div className={styles.formGroup}>
              <div className={styles.recipientEmail}>
                <label htmlFor="user_fullname">
                  <b>Name</b>
                </label>
                <input
                  type="text"
                  id="user_fullname"
                  value={userFullname}
                  onChange={(e) => setUserFullname(e.target.value)}
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div className={styles.recipientEmail}>
                <label htmlFor="user_email">
                  <b>Email</b>
                </label>
                <input
                  type="text"
                  id="user_email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Enter a valid email"
                  required
                />
              </div>

              <div className={styles.recipientEmail}>
                <label htmlFor="user_password">
                  <b>Password</b>
                </label>
                <input
                  type="password"
                  id="user_password"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  placeholder="Enter a password"
                  required
                />
              </div>

              <div className={styles.userRoleButtons}>
                <label htmlFor="user_role">
                  <b>Role: </b>
                </label>

                <div
                  className={userRole === "admin" ? styles.selectedRole : ""}
                >
                  <input
                    type="radio"
                    id="user_role_admin"
                    name="user_role"
                    value="admin"
                    onChange={(e) => setUserRole(e.target.value)}
                    required
                  />
                  <label htmlFor="admin_role">Admin</label>
                </div>

                <div className={userRole === "user" ? styles.selectedRole : ""}>
                  <input
                    type="radio"
                    id="user_role_user"
                    name="user_role"
                    value="user"
                    onChange={(e) => setUserRole(e.target.value)}
                  />
                  <label htmlFor="user_role">User</label>
                </div>
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.sendButton}>
                Add
              </button>
              <button className={styles.cancelButton} onClick={closeModal}>
                Cancel
              </button>

              {/* <button type='button' className={styles.cancelButton} onClick={handleAdd}>
                                debug
                            </button> */}
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
}

export default AddUserModal;
