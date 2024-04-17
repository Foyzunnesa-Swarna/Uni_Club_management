"use client";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  roleId: number;
}

interface Role {
  id: number;
  title: string;
}

const UserRolesPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const fetchUsersAndRoles = async () => {
      //Mocking api call
      setUsers([
        { id: 1, name: "John Doe", roleId: 1 },
        { id: 2, name: "Jane Smith", roleId: 2 },
      ]);
      setRoles([
        { id: 1, title: "President" },
        { id: 2, title: "Vice President" },
        { id: 3, title: "Manager" },
        { id: 4, title: "Member" },
      ]);
    };

    fetchUsersAndRoles();
  }, []);

  const handleRoleChange = (userId: number, roleId: number) => {
    const index = users.findIndex((usr) => usr.id === userId);
    if (index < 0) return;
    const user = users[index];
    const updatedUser = { ...user, roleId };
    const allUsers = [...users];
    allUsers[index] = updatedUser;
    setUsers([...allUsers]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">User Roles</h1>
      <div className="w-1/2 mx-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">
                  <select
                    value={user.roleId}
                    onChange={(e) =>
                      handleRoleChange(user.id, Number(e.target.value))
                    }
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.title}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserRolesPage;
