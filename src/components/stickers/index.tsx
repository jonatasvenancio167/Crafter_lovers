import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { EmojiProps } from "../../interface/TextItem";

interface StickersProps {
  handleSetEmoji: (emojis: EmojiProps[]) => void;
}

const Stickers = ({ handleSetEmoji }: StickersProps) => {
  const [addEmoji, setAddEmoji] = useState<boolean>(false);
  const [emojis, setEmojis] = useState<EmojiProps[]>([]);
  const [emojiId, setEmojiId] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [selectedEmojiId, setSelectedEmojiId] = useState<number | null>(null);

  const showEmoji = () => {
    setAddEmoji(!addEmoji);
  };

  const getEmoji = (imageUrl: string) => {
    const newEmoji: EmojiProps = { id: emojiId, url: imageUrl, rotation: rotation, positionX: 50, positionY: 50 };
    const updatedEmojis = [...emojis, newEmoji];
    setEmojis(updatedEmojis);
    if (handleSetEmoji) {
      handleSetEmoji(updatedEmojis);
    }
    setEmojiId(emojiId + 1);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(event.target.value);
    setSelectedEmojiId(id);
  };

  const handleRotationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRotation = parseInt(event.target.value);
    if (selectedEmojiId !== null) {
      const updatedEmojis = emojis.map((emoji) =>
        emoji.id === selectedEmojiId ? { ...emoji, rotation: newRotation } : emoji
      );
      setEmojis(updatedEmojis);
      if (handleSetEmoji) {
        handleSetEmoji(updatedEmojis);
      }
    }
  };

  return (
    <>
      <div className="ml-10 mt-4 justify-center">
        <h3>Stickers</h3>
        <div className="mt-2 justify-center mr-20 mb-3 w-full">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 text-center w-full"
            onClick={showEmoji}
          >
            Adicionar Emoji
          </button>
        </div>
        <div className="flex items-center mt-4 mb-3">
          <label className="mr-2">Rotação:</label>
          <input
            type="range"
            min="0"
            max="360"
            step="1"
            value={rotation}
            onChange={(e) => setRotation(parseInt(e.target.value))}
            className="mr-2"
          />
          <span>{rotation}°</span>
        </div>
        <label htmlFor="selectEmoji" className="mr-2">
          Selecione um Emoji:
        </label>
        <div className="flex items-center mb-5">
          <select
            id="selectEmoji"
            onChange={handleSelectChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 border-none dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Selecione um emoji</option>
            {emojis.map((emoji) => (
              <option key={emoji.id} value={emoji.id}>
                Emoji {emoji.id}
              </option>
            ))}
          </select>
          {selectedEmojiId !== null && (
            <div>
              <label htmlFor="rotationInput">Rotação:</label>
              <input
                type="number"
                id="rotationInput"
                value={emojis.find((emoji) => emoji.id === selectedEmojiId)?.rotation || ''}
                onChange={handleRotationChange}
                min="0"
                max="360"
                className="ml-2"
              />
              <span>°</span>
            </div>
          )}
        </div>
        <div 
          className="fixed right-32"
          style={{ width: '14rem', height: '10rem', bottom: '11rem'}}
        >
          {addEmoji && <EmojiPicker onEmojiClick={(e) => getEmoji(e.imageUrl)} />}
        </div>
      </div>
    </>
  );
};

export { Stickers };
