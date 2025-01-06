import { User } from "@packages/types";
import { Link } from "react-router-dom";

function HomePage() {
  const handleFetch = async () => {
    const response = await fetch("/api/users");
    const users: User[] = await response.json();
    console.log(users[0]);
  };

  handleFetch();

  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-red-700 text-4xl font-bold mb-4">Musik Samspil</h1>
          <p className="text-gray-800 text-xl text-center mb-6">
          The place where amateur musicians connect and play music together.
          </p>
          <div className="flex items-center gap-4">
            {/* Button */}
            <Link to="/ensembles" className="bg-blue-900 text-white text-lg font-medium px-8 py-3 rounded-lg hover:bg-red-700 transition duration-300">
              See ensembles
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default HomePage;