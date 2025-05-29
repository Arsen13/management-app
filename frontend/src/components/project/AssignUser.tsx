const users = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com",
  },
  {
    id: 3,
    firstName: "Jane",
    lastName: "Doe",
    email: "janedoe@gmail.com",
  },
];

export default function AssignUser() {
  const handleAssign = (id: number) => {
    console.log(id);
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
      {users.map((user) => (
        <option
          key={user.id}
          value={user.id}
        >{`${user.firstName} ${user.lastName}`}</option>
      ))}
    </select>
  );
}
