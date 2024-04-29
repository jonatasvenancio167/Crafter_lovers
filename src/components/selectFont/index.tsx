import { useState } from "react";
import { TextConfiguration } from "../textConfiguration";
import { TextItem } from "../../interface/TextItem";

interface SelectFontProps {
  handleSetFontFamily?: (font: string) => void;
  handleSetTextArea: (texts: TextItem[]) => void;
}

const SelectFont = ({ handleSetFontFamily, handleSetTextArea }: SelectFontProps) => {
  const [selectedFont, setSelectedFont] = useState<string>("");

  const fonts = [
    { id: 1, family: 'Arial' },
    { id: 2, family: 'Lexend' },
    { id: 3, family: 'courier' },
    { id: 4, family: 'vegan' },
    { id: 5, family: 'Roboto' },
    { id: 6, family: 'Beautiful' },
    { id: 7, family: 'Comics' },
    { id: 8, family: 'Cosmopolitan Script'}
  ];

  const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const fontId = event.target.value;
    const selectedFont = fonts.find(font => font.id === parseInt(fontId));
    if (selectedFont) {
      setSelectedFont(selectedFont.family);
      if (handleSetFontFamily) handleSetFontFamily(selectedFont.family);
    }
  };

  return (
    <>
      <div className="mt-2 justify-center mb-4 ml-10">
        <select
          id="fonts"
          name="fonts"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 border-none dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleFontChange}
        >
          <option selected={true} disabled={true} > Selecione...</option>

          {fonts.map((font) => (
            <option key={font.id} value={font.id}>
              {font.family}
            </option>
          ))}
        </select>
      </div>
      <div className="ml-10">
        <h3>Configurações de Texto</h3>
        <TextConfiguration handleSetFontFamily={selectedFont} handleSetTexts={handleSetTextArea}/>
      </div>
    </>
  );
};

export { SelectFont };
