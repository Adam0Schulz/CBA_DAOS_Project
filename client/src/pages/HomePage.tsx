import { User } from "@packages/types";
import { Link } from "react-router-dom";
import image from "../assets/image.png"  

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
        <div className="flex flex-row items-center justify-center gap-16 max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-start space-y-4">
            <h1 className="text-red-700 text-4xl font-bold mb-4 uppercase">THE PLACE WHERE AMATEUR MUSICIANS CONNECT AND PLAY MUSIC TOGETHER.</h1>
            <div className="flex items-center gap-4">
              {/* Button */}
              <Link to="/ensembles" 
                className="bg-blue-900 text-white text-lg font-medium px-8 py-3 rounded-lg hover:opacity-90 transition duration-300"
                style={{"backgroundColor": "rgb(52, 59, 93)"}}
              >
                See ensembles
              </Link>
            </div>
          </div>
          <div className="flex-shrink-0">
            <img src={image} alt="abstract music notes" className="max-w-md" />
          </div>
        </div>
      </main>
    </>
  );
}

export default HomePage;