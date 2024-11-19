import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../../constants";

const EditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();

        if (response.ok) {
          setName(data.name);
          setEmail(data.email);
          setIsAdmin(data.isAdmin);
        } else {
          toast.error(data.message || "Error fetching user details");
        }
      } catch (error) {
        toast.error("Error loading user details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email, isAdmin }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("User updated successfully");
        navigate("/admin/userlist");
      } else {
        toast.error(data.message || "Error updating user");
      }
    } catch (error) {
      toast.error("An error occurred while updating the user");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          <label className="text-gray-700">Is Admin</label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUserPage;
