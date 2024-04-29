import { useContext } from "react";
import { createContext, useState } from "react";
import { EmojiProps, TextItem } from "../interface/TextItem";

interface Props {
  children: JSX.Element | JSX.Element;
}

interface SidebarContextState {
  handleSetActive?: (active: boolean) => void;
  handleSendImage?: (image: any) => void;
  handleSetTextArea: (texts: TextItem[]) => void;
  handleSetFontSize: (fontsize: number) => void;
  handleSetFontFamily?: (font: string) => void;
  handleSetEmoji: (emojis: Array<EmojiProps>) => void;
  handleSetExportWhiteboard?: (exportWhiteboard: boolean) => void;
  handleSetColor: (color: string) => void;
  handleSetBackground: (background: boolean) => void
  active: boolean;
  textArea: TextItem[];
  fontFamily: string;
  fontSize: any;
  image: any;
  urlEmoji: Array<EmojiProps>;
  exportedImageData: boolean
  color: string
  background: boolean
}

const SidebarContext = createContext<SidebarContextState>({} as SidebarContextState)

function useSidebarContext(){
  const context = useContext(SidebarContext)

  if (!context) {
    throw new Error('insira o useSidebarContext ao redor do seu elemento');
  }
  return context;
}

const SideBarProvider = ({ children }: Props) => {

  const [active, setActive] = useState<boolean>(false);
  const [textArea, setTextArea] = useState<TextItem[]>([]);
  const [fontFamily, setFontFamily] = useState<string>("");
  const [fontSize, setFontSize] = useState<number>(12);
  const [image, setImage] = useState<any>();
  const [urlEmoji, setUrlEmoji] = useState<Array<EmojiProps>>([])
  const [exportedImageData, setExportedImageData] = useState<boolean>(false);
  const [color, setColor] = useState<string>('#000')
  const [background, setBackground] = useState<boolean>(false)

  const handleSetActive = (value: boolean) => {
    setActive(value)
  };
  
  const handleSendImage = (value: any) => {
    setImage(value)
  };
  
  const handleSetTextArea = (value: TextItem[]) => {
    setTextArea(value)
  };

  const handleSetFontSize = (value: number) => {
    setFontSize(value)
  };

  const handleSetFontFamily = (value: string) => {
    setFontFamily(value)
  };

  const handleSetEmoji = (value: Array<EmojiProps>) => {
    setUrlEmoji(value)
  }

  const handleSetExportWhiteboard = (data: boolean) => {
    setExportedImageData(data);
  };
  
  const handleSetColor = (color: string) => {
    setColor(color)
  }

  const handleSetBackground = (background: boolean) => {
    setBackground(background)
  }

  return (
    <SidebarContext.Provider value={{ 
        handleSetTextArea, 
        handleSendImage, 
        handleSetActive, 
        handleSetFontFamily, 
        handleSetFontSize,
        handleSetEmoji,
        handleSetExportWhiteboard,
        handleSetColor,
        handleSetBackground,
        active,
        fontFamily,
        fontSize,
        image,
        textArea,
        urlEmoji,
        exportedImageData,
        color,
        background
      }}>
      {children}
    </SidebarContext.Provider>
  )
}


export { useSidebarContext, SideBarProvider }