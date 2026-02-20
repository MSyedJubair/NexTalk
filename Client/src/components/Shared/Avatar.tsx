interface AvatarProps {
  name: string;
  imageUrl?: string;
  size?: number;
}

const Avatar = ({ name, imageUrl, size = 40 }: AvatarProps) => {
  const firstLetter = name?.charAt(0).toUpperCase();

  const getColorFromName = (name: string) => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-yellow-500",
      "bg-indigo-500",
    ];

    const index =
      name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
      colors.length;

    return colors[index];
  };

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className={`rounded-full flex items-center justify-center text-white font-semibold ${getColorFromName(
        name
      )}`}
      style={{ width: size, height: size }}
    >
      {firstLetter}
    </div>
  );
};

export default Avatar