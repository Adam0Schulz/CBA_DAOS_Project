import { User } from "@packages/types"


function HomePage() {


  const handleFetch = async () => {

    const response = await fetch("/api/users");
    const users: User[] = await response.json();
    console.log(users[0]);

  }

  handleFetch();

  

  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-4 bg-white bg-opacity-75 rounded shadow-md">
          <h2 className="text-3xl font-semibold mb-4">Welcome to the home page!</h2>
          <p className="text-lg">We're glad to have you here.</p>
        </div>
      </main>
    </>
  );
}

export default HomePage