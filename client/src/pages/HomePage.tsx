import { User } from "@packages/types";

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
            {/* Dropdown */}
            <select
              className="text-gray-700 text-lg border border-gray-300 rounded-lg px-6 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 w-60"
              defaultValue=""
            >
              <option value="" disabled hidden>
                Choose instrument
              </option>
              <option value="guitar">Guitar</option>
              <option value="piano">Piano</option>
              <option value="violin">Violin</option>
            </select>
            {/* Button */}
            <button className="bg-blue-900 text-white text-lg font-medium px-8 py-3 rounded-lg hover:bg-red-700 transition duration-300">
              See ensembles
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default HomePage;