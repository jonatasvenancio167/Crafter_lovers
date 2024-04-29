import { useState } from "react";
import { Container } from "./style";
import { FaBars } from 'react-icons/fa'
import { Sidebar } from "../Sidebar";

const Header = () => {
  const [sidebar, setSidebar] = useState<boolean>(true)
  const showSidebar = () => setSidebar(!sidebar)

  return(
    <Container>
      <FaBars onClick={showSidebar}/>
      { sidebar && <Sidebar active={sidebar} handleSetActive={setSidebar} /> }
    </Container>
  )
}

export { Header }