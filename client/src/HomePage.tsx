import './HomePage.css'
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
      <div>
        Welcome to the home page!
      </div>
    </>
  )
}

export default HomePage