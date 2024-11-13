import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../constants";
import { toast } from "react-toastify";
import { FaTrash, FaEdit, FaTimes, FaCheck } from "react-icons/fa";

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await response.json();

        if (response.ok) {
          setUsers(data);
        } else {
          throw new Error(data.message || "Failed to fetch users");
        }
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteHandler = async (id) => {
    try {
      if (
        window.confirm(
          "Are you sure you want to permanently delete this user? This action cannot be undone."
        )
      ) {
        const response = await fetch(`${BASE_URL}/users/${id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        let data;
        try {
          // Attempt to parse the response as JSON
          data = await response.json();
        } catch (parseError) {
          // If parsing fails, handle as a non-JSON response
          throw new Error("Cannot delete Admin User");
        }

        if (response.ok) {
          toast.success(data.message);
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        } else {
          throw new Error(data.message || "Failed to delete user");
        }
      }
    } catch (err) {
      // Display the error message or fallback
      toast.error(err.message || "An unexpected error occurred");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-8 mx-auto font-sans">
      <h1 className="font-bold text-3xl mb-3">Users</h1>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">NAME</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              EMAIL
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              ADMIN
            </th>
            <th className="border border-gray-300 px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                <a
                  href={`mailto:${user.email}`}
                  className="text-blue-500 hover:underline"
                >
                  {user.email}
                </a>
              </td>
              <td className="border border-gray-300 px-2 py-2 text-center">
                {user.isAdmin ? (
                  <FaCheck className="text-green-500" />
                ) : (
                  <FaTimes className="text-red-500" />
                )}
              </td>
              <td className="flex items-center justify-center space-x-4 border border-gray-300 py-2 text-center">
                <Link
                  to={`/admin/user/${user._id}/edit`}
                  className="text-blue-500 hover:underline mr-2"
                >
                  <FaEdit className="hover:scale-125 transition duration-300" />
                </Link>
                <button onClick={() => deleteHandler(user._id)}>
                  <FaTrash className="text-red-500 hover:scale-125 transition duration-300" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListPage;
