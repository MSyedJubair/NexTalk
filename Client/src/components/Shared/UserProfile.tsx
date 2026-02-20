type User = {
  _id: number;
  fullname: string;
  email: string;
  imageUrl: string;
};


const User = (user:User, activeUser:User, setActiveUser) => {
  return (
    <div
      key={user._id}
      onClick={() => setActiveUser(user)}
      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition ${
        activeUser?._id === user._id
          ? "bg-indigo-600/20 border border-indigo-500"
          : "hover:bg-gray-800"
      }`}
    >
      <img
        src={user.imageUrl || "../ProfilePlaceholder.png"}
        alt={user.fullname}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-1">
        <p className="font-medium">{user.fullname}</p>
        <p className="text-sm text-gray-400 truncate">{user.email}</p>
      </div>
    </div>
  );
};

export default User;
