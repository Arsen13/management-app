import UserInfo from "./UserInfo";

export default function Navbar() {
  return (
    <div className="bg-[var(--widjet)] h-16 flex justify-between items-center px-12 border-b border-b-gray-500 shadow-sm shadow-gray-500">
      <div>
        <h1 className="text-2xl">
          Management <span className="text-sky-500">App</span>
        </h1>
      </div>

      <div className="flex gap-14 text-xl">
        {/* <Link href='/' className="hover:text-sky-500 duration-300">Dashboard</Link>
                <Link href='/transactions' className="hover:text-sky-500 duration-300">Transactions</Link>
                <Link href='/categories' className="hover:text-sky-500 duration-300">Categories</Link> */}
      </div>

      <UserInfo />
    </div>
  );
}
