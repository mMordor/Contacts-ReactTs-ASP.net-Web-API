import Container from "../Components/Container/Container"
import Haedar from "../Components/Haeder/Haedar"
import { Outlet } from "react-router-dom";


function Layout() {
  return (  
      <div className="w-full h-full absolute">
          <Haedar/>
          <Container >
            <Outlet/>
          </Container>
      </div>
  )
}

export default Layout