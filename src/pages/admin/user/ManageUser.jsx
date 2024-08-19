import React, { useState } from 'react';
import { useDeleteUserMutation, useGetUserQuery, useUpdateUserRoleMutation } from '../../../redux/auth/authApi';

function ManageUser() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const { data: usersData = [], error, isLoading, refetch } = useGetUserQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();

  const users = usersData.users || [];

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        await deleteUser(id).unwrap();
        console.log("User successfully deleted");
        refetch();
      } catch (error) {
        console.error("Failed to delete the user:", error);
      }
    }
  };

  const handleRoleUpdate = async () => {
    if (newRole) {
      try {
        console.log("Updating user role:", { userId: selectedUser._id, role: newRole });
        const result = await updateUserRole({ userId: selectedUser._id, role: newRole }).unwrap();
        console.log("Update result:", result);
        setSelectedUser(null);
        setNewRole("");
        refetch();
      } catch (error) {
        console.error("Failed to update user role:", error);
        if (error.data) {
          console.error("Error data:", error.data);
        }
        alert(`Failed to update user role: ${error.message || 'Unknown error'}`);
      }
    } else {
      alert("Please enter a new role.");
    }
  };

  return (
    <>
      {isLoading && <p className="text-center py-4">Loading...</p>}
      {error && <p className="text-center py-4 text-red-500">Error fetching users: {error.message}</p>}

      <section className="bg-blueGray-50">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white shadow-lg rounded-lg">
            <div className="rounded-t-lg px-4 py-3 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg text-blueGray-700">All Users</h3>
                <button
                  onClick={() => refetch()}
                  className="bg-indigo-500 text-white text-xs font-bold uppercase px-4 py-2 rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Refresh
                </button>
              </div>
            </div>

            <div className="block w-full overflow-x-auto h-96">
              <table className="min-w-full bg-white divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <tr key={user._id} className={user.role === 'admin' ? 'bg-blue-50' : 'bg-green-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit Role
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="text-red-600 hover:text-red-900 ml-4"
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
      </section>

      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit User Role</h2>
            <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">New Role</label>
              <select
                id="role"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              >
                <option value="" disabled>Select role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              onClick={handleRoleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update {selectedUser.role === 'admin' ? 'Admin Role' : 'User Role'}
            </button>
            <button
              onClick={() => setSelectedUser(null)}
              className="mt-4 ml-2 bg-gray-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ManageUser;
