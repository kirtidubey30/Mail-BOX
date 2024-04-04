import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmailDetail from "./EmailDetail";

function Inbox() {
  const [emails, setEmails] = useState([]);
  // Add this useEffect hook at the end of your component
  useEffect(() => {
    fetchData(); // Refetch data after emails state is updated
  }, []); // Trigger refetch when emails state changes

  const fetchData = () => {
    fetch("https://mailbox-9ba1a-default-rtdb.firebaseio.com/email.json").then(
      (res) => {
        if (res.ok) {
          res.json().then((data) => {
            console.log("data fetched succesfully", data);
            const emailData = Object.values(data);
            setEmails(emailData);
          });
        } else {
          res.json().then((data) => {
            console.log("Err Occurred : ", data.error.message);
            window.alert(data.error.data.message);
          });
        }
      }
    );
  };
  const userEmail = localStorage.getItem("email");
  useEffect(() => {
    console.log("val of email from Inbox.js =", emails);
  }, [emails]);

  const handleMailState = (emailId) => {
    const emailIndex = emails.findIndex((email) => emailId === email.id);
    if (emailIndex !== -1) {
      const updatedEmails = [...emails];
      updatedEmails[emailIndex] = {
        ...updatedEmails[emailIndex],
        isRead: true,
      };
      setEmails(updatedEmails);

      fetch(
        `https://mailbox-9ba1a-default-rtdb.firebaseio.com/email/${emailId}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({
            isRead: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (!res.ok) {
          res.json().then((data) => {
            console.log("Err occured", data.error.message);
            window.alert(data.error.message);
          });
        }
      });
    }
  };
  const [selectedEmail, setSelectedEmail] = useState(null);
  const handleEmailClick = (email) => {
    setSelectedEmail(email); // Set selected email data
  };
  useEffect(() => {
    console.log("selected val of email=", selectedEmail);
  }, [selectedEmail]);
  // Close email detail view
  const closeEmailDetail = () => {
    setSelectedEmail(""); // Clear selected email data
  };
  const handleOnDelete = (emailIndexToDelete) => {
    if (emailIndexToDelete < 0 || emailIndexToDelete >= emails.length) {
      console.error("Invalid email index:", emailIndexToDelete);
      return;
    }

    // Create a copy of the emails array without the email to delete
    const updatedEmails = [...emails];
    updatedEmails.splice(emailIndexToDelete, 1);

    // Update the state with the modified emails array
    setEmails(updatedEmails);

    // Send DELETE request to remove the email from the server
    // fetch(
    //   `https://mailbox-9ba1a-default-rtdb.firebaseio.com/email/${emailIdToDelete}.json`,
    //   {
    //     method: "DELETE",
    //   }
    // ).then((res) => {
    //   if (!res.ok) {
    //     res.json().then((data) => {
    //       console.log("Err occurred", data.error.message);
    //       window.alert(data.error.message);
    //     });
    //   } else {
    //     // If deletion was successful, update the state to remove the deleted email
    //     const updatedEmails = [...emails];
    //     updatedEmails.splice(emailIndexToDelete, 1);
    //     setEmails(updatedEmails);
    //   }
    // });
  };

  return (
    <Link to="/inbox">
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          {selectedEmail && (
            <EmailDetail
              selectedEmail={selectedEmail}
              closeEmail={closeEmailDetail}
            />
          )}
          <div className="absolute container left-17rem mx-auto px-6 py-8 top-0 w-[70%]">
            <div className="flex flex-col">
              <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          From
                        </th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          To
                        </th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Message
                        </th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Status
                        </th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Actions
                        </th>
                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                      </tr>
                    </thead>

                    <tbody className="bg-white">
                      {emails
                        .filter((mail) => mail.to === userEmail)
                        .map((email, index) => (
                          <tr
                            key={email.id}
                            onClick={() => handleMailState(email?.id)}
                          >
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              {email.from}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              {email.to}
                            </td>
                            <td
                              className="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
                              onClick={() => {
                                handleEmailClick(email);
                              }}
                            >
                              {email.message}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <span
                                className={`inline-flex px-2 text-xs font-semibold leading-5 ${
                                  email.isRead
                                    ? "text-green-800 bg-green-100"
                                    : "text-red-800 bg-red-100"
                                } rounded-full`}
                              >
                                {email.isRead ? "Read" : "Unread"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              {/* <span
                                className={`inline-flex px-2 text-xs font-semibold leading-5 ${
                                  email.isRead
                                    ? "text-green-800 bg-green-100"
                                    : "text-red-800 bg-red-100"
                                } rounded-full`}
                              >
                                {email.isRead ? "Read" : "Unread"}
                              </span> */}
                              <button
                                className="bg-red-100 px-2 rounded-full"
                                onClick={() => handleOnDelete(index)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Link>
  );
}

export default Inbox;
