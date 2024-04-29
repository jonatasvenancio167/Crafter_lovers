import { useEffect, useState } from "react";
import { TextItem } from "../../interface/TextItem";
import { ChromePicker, ColorResult } from "react-color";
import { useSidebarContext } from "../../hooks/useSidebarProvider";

interface TextConfigurationProps {
  handleSetTexts: ( textsArea: TextItem[]) => void
  handleSetFontFamily: string
}

const TextConfiguration = ({ handleSetTexts, handleSetFontFamily }: TextConfigurationProps) => {
  const { textArea } = useSidebarContext()

  const [texts, setTexts] = useState<TextItem[]>(textArea);
  const [nextId, setNextId] = useState(1);
  const [inputText, setInputText] = useState("");
  const [selectedTextId, setSelectedTextId] = useState<number | null>(null);
  const [rotationRight, setRotationRight] = useState(0);
  const [fontSize, setFontSize] = useState(12)
  const [rotationLeft, setRotationLeft] = useState(0);
  const [showColorText, setShowColorText] = useState<boolean>(false)
  const [color, setColor] = useState<ColorResult>({
    hex: '#333',
    rgb: {
      r: 51,
      g: 51,
      b: 51,
      a: 1,
    },
    hsl: {
      h: 0,
      s: 0,
      l: .20,
      a: 1,
    }
  })

  useEffect(() => {
    setTexts(textArea)
  }, [textArea])

  const handleAddOrUpdateText = () => {
    if (selectedTextId) {
      const updatedTexts = texts.map(text =>
        text.id === selectedTextId
          ? { ...text, text: inputText,
              positionX: text.positionX, 
              positionY: text.positionY, 
              rotation: rotationRight - rotationLeft, 
              fontSize: text.fontSize,
              color: text.color,
            }
          : text
      );
      handleSetTexts(updatedTexts)
      setTexts(updatedTexts);
    } else {
      const newText: TextItem = {
        id: nextId,
        text: inputText,
        fontFamily: handleSetFontFamily,
        rotation: rotationRight - rotationLeft,
        fontSize: fontSize,
        color: color,
        positionX: 50,
        positionY: 50
      };
      handleSetTexts([...texts, newText])
      setTexts([...texts, newText]);
      setNextId(nextId + 1);
    }
    setInputText("");
    setSelectedTextId(null);
    setRotationRight(0);
    setRotationLeft(0);
  };

  const handleSelectText = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(e.target.value, 10);
    const foundText = texts.find(text => text.id === id);
    if (foundText) {
      setInputText(foundText.text);
      setSelectedTextId(id);
      setRotationRight(foundText.rotation >= 0 ? foundText.rotation : 0);
      setRotationLeft(foundText.rotation < 0 ? Math.abs(foundText.rotation) : 0);
    }
  };

  const handleDeleteText = () => {
    if (selectedTextId) {
      const filteredTexts = texts.filter(text => text.id !== selectedTextId);
      setTexts(filteredTexts);
      setInputText("");
      setSelectedTextId(null);
      setRotationRight(0);
      setRotationLeft(0);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddOrUpdateText();
    }
  };

  const handleChangeComplete = (updatedColor: ColorResult) => {
    setColor(updatedColor);
  };

  const changeTextColor = () => {
    if(showColorText) {
      return setShowColorText(false)
    } else {
      return setShowColorText(true)
    }
  }

  return (
    <div className="flex flex-col">
      <input
        type="text"
        value={inputText}
        onChange={e => setInputText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Digite seu texto aqui"
        className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
   
      {texts.length > 0 && (
        <>
        <div className="mt-3">
          <label>Textos em tela</label>
          <select 
            onChange={handleSelectText} 
            value={selectedTextId || "default"}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 border-none dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option disabled value="default">Selecione um texto para editar</option>
            {texts.map((text) => (
              <option key={text.id} value={text.id}>
                {text.id} - {text.text.slice(0, 10)}...
              </option>
            ))}
          </select>
        </div>
        </>
      )}
      <div className="mt-3">
        <label>Tamanho da fonte</label>
        <input
          type="number"
          id="fontSize"
          value={fontSize}
          onChange={e => setFontSize(parseInt(e.target.value))}
          className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <label className="mt-3">Cor da fonte</label>
      <button 
        className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 text-center w-full"
        onClick={() => {changeTextColor()}}
      >
        Cor da fonte
      </button>
      <button 
        onClick={handleAddOrUpdateText}
        className="px-4 py-2 bg-green-500 text-white rounded-md cursor-pointer hover:bg-green-600 text-center w-full mb-3 mt-3"
      >
        {selectedTextId ? "Atualizar Texto" : "Adicionar Texto"}
      </button>
      {selectedTextId && (
        <>
          <button 
            onClick={handleDeleteText}
            className="px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600 text-center w-full mb-3"
          >
            Deletar Texto
          </button>
        </>
      )}
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4 pr-2">
          <label htmlFor="rotationRight" className="block">Rotação para Direita:</label>
          <input
            type="number"
            id="rotationRight"
            value={rotationRight}
            onChange={e => setRotationRight(parseInt(e.target.value))}
            className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4 pl-2">
          <label htmlFor="rotationLeft" className="block">Rotação para Esquerda:</label>
          <input
            type="number"
            id="rotationLeft"
            value={rotationLeft}
            onChange={e => setRotationLeft(parseInt(e.target.value))}
            className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div className="fixed right-32 top-5">
        { showColorText && (
          <ChromePicker color={color.hex} onChange={uptatedColor => handleChangeComplete(uptatedColor)} className="relative"/>
        )}
      </div>
    </div>
  );
};

export { TextConfiguration };
