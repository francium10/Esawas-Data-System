import { useState, useEffect } from "react";
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

        if (response.status >= 200 && response.status < 300) {
          setUsers(data);
        }
      } catch (err) {
        toast.error(err.message || "An error occurred while fetching users");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteHandler = () => {
    console.log("Delete");
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
              <td className="border border-gray-300  px-4 py-2">{user.name}</td>
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
                  <FaCheck className="text-green-500"></FaCheck> // Check mark
                ) : (
                  <FaTimes className="text-red"></FaTimes> // Cross mark
                )}
              </td>
              <td className="flex items-center justify-center space-x-4 border border-gray-300 py-2 text-center">
                <a
                  href={`/admin/user/${user._id}/edit`}
                  className="text-blue-500 hover:underline mr-2"
                >
                  <FaEdit className="hover:scale-125 transition duration-300" />
                </a>
                <button onClick={() => deleteHandler(user._id)}>
                  <FaTrash className="text-red hover:scale-125 transition duration-300" />
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
