import { useEffect, useState } from "react";
import type { UserT } from "../../lib/types";
import { findUsers } from "../../api/user.api";
import { useAssignUserToTask } from "../../hooks/mutations/useAssignUserToTask";

export default function AssignUser({ taskId }: { taskId: number }) {
  const [users, setUsers] = useState<UserT[] | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await findUsers();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const assignUserMutation = useAssignUserToTask();

  const handleAssign = (userId: number) => {
    assignUserMutation.mutate({ taskId, userId });
  };

  return (
    <select
      defaultValue=""
      onChange={(e) => handleAssign(+e.target.value)}
      className="bg-[var(--widjet)] text-[var(--text)] w-2/5 text-sm italic border border-[var(--border)] rounded-md px-2 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
    >
      <option value="" disabled>
        Assign a user
      </option>
      {users &&
        users.map((user) => (
          <option
            key={user.id}
            value={user.id}
          >{`${user.firstName} ${user.lastName}`}</option>
        ))}
    </select>
  );
}
