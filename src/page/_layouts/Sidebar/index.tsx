import { FaTimes } from "react-icons/fa"
import { Container, Content } from "./style"
import { useState } from "react"
import { Upload } from "../../../components/upload"
import EmojiPicker from "emoji-picker-react"
import { useSidebarContext } from "../../../hooks/useSidebarProvider"
import { SelectFont } from "../../../components/selectFont"

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

  const [addEmoji, setAddEmoji] = useState<boolean>(false)

  const handleImagechange = (file: File) => {
    if (handleSendImage) {
      handleSendImage(file)
    } 
  }
  
  const closeSidebar = () => {
    if(handleSetActive) handleSetActive(false)
  }

  const getEmoji = (e: { imageUrl: string }) => {
    const emojis = []
    emojis.push(e.imageUrl)
    if(handleSetEmoji) handleSetEmoji(e.imageUrl)
  }

  const showEmoji = () => {
    if(addEmoji) {
      return setAddEmoji(false)
    } else {
      return setAddEmoji(true)
    }
  }

  const exportWhiteboard = () => {
    if(handleSetExportWhiteboard) handleSetExportWhiteboard(true)
  }

  return (
    <Container sidebar={active}>
      <FaTimes onClick={closeSidebar}/>
      <Content className="min-w-[200px] w-full flex-col items-start justify-start">
        <div>
          <div className="ml-10">
            <h3>Selecione a fonte</h3>
          </div>
          <SelectFont handleSetFontFamily={handleSetFontFamily} handleSetTextArea={handleSetTextArea}/>
          <div className="justify-center">
            <div className="ml-10 mt-5">
              <h3>Upload de imagem</h3>
            </div>
            <div className="mt-2 justify-center ml-10 mr-20">
              <Upload onFileChange={handleImagechange}/>
            </div>
          </div>
          <div className='ml-10 mt-4 justify-center'>
            <h3>Stickers</h3>
            <div className="mt-2 justify-center mr-20 mb-20">
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 text-center w-80"
                onClick={() => {showEmoji()}}
              >
                Adicionar Emoji
              </button>
            </div>
            <div className="fixed right-10 bottom-10">
              {addEmoji && (
                <EmojiPicker onEmojiClick={(e) => getEmoji(e)}/>
              )}
            </div>
          </div>
          <div className="relative left-5">
            <div>
              <button 
                className="px-5 py-2 bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600 text-center ml-5 w-96"
                onClick={exportWhiteboard}
              >
                Exportar
              </button>
            </div>
          </div>
        </div>
      </Content>
    </Container>
  )
}

export { Sidebar }