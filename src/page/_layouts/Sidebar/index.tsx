import { FaTimes } from "react-icons/fa"
import { Container, Content } from "./style"
import { Upload } from "../../../components/upload"
import { useSidebarContext } from "../../../hooks/useSidebarProvider"
import { SelectFont } from "../../../components/selectFont"
import { Stickers } from "../../../components/stickers"

interface SidebarProps {
  active: boolean
  handleSetActive: ( active: boolean ) => void
}

const Sidebar = ({ active, handleSetActive }: SidebarProps) => {
  const { 
    handleSetTextArea, 
    handleSendImage, 
    handleSetFontFamily,
    handleSetEmoji,
    handleSetExportWhiteboard,
  } = useSidebarContext()

  const handleImagechange = (file: File) => {
    if (handleSendImage) {
      handleSendImage(file)
    } 
  }
  
  const closeSidebar = () => {
    if(handleSetActive) handleSetActive(false)
  }

  const exportWhiteboard = () => {
    if(handleSetExportWhiteboard) handleSetExportWhiteboard(true)
  }

  return (
    <Container sidebar={active}>
      <FaTimes onClick={closeSidebar}/>
      <Content className="w-full flex-col items-start justify-start">
        <div>
          <div className="ml-10">
            <h3>Selecione a fonte</h3>
          </div>
          <SelectFont handleSetFontFamily={handleSetFontFamily} handleSetTextArea={handleSetTextArea}/>
          <div className="justify-center">
            <div className="ml-10 mt-5">
              <h3>Upload de imagem</h3>
            </div>
            <div className="mt-2 justify-center ml-10 mr-20 w-full">
              <Upload onFileChange={handleImagechange}/>
            </div>
          </div>
          <Stickers handleSetEmoji={handleSetEmoji}/>
          <div className="relative left-5 justify-center">
            <button 
              className="px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600 text-center ml-5 w-full"
              onClick={exportWhiteboard}
            >
              Exportar
            </button>
          </div>
        </div>
      </Content>
    </Container>
  )
}

export { Sidebar }