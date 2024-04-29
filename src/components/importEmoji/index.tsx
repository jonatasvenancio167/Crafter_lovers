import { useEffect, useRef, useState } from "react";
import { EmojiProps } from "../../interface/TextItem";
import { useSidebarContext } from "../../hooks/useSidebarProvider";

interface ImportEmojiComponentProps {
  emojis: Array<EmojiProps>
}

interface Size {
  width: number
  height: number
}

interface Position {
  x: number;
  y: number;
}

const ImportEmojiComponent = ({ emojis }: ImportEmojiComponentProps) => {
  const [size, setSize] = useState<Size>({ width: 100, height: 100 });
  const resizing = useRef<boolean[]>(emojis.map(() => false));
  const [draggingEmojiId, setDraggingEmojiId] = useState<number | null>(null);
  const [emojisUrl, setEmojisUrl] = useState<EmojiProps[]>(emojis);
  const [dragOffset, setDragOffset] = useState<Position | null>(null);

  const { handleSetEmoji } = useSidebarContext()


  useEffect(() => {
    setEmojisUrl(emojis)
  }, [emojis])
  
  const handleMouseDown = (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>, id: number) => {
    setDraggingEmojiId(id);
    setDragOffset({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (draggingEmojiId !== null && dragOffset !== null) {
      const newTexts = emojis.map(emoji =>
        emoji.id === draggingEmojiId
          ? { ...emoji, positionX: emoji.positionX + event.clientX - dragOffset.x, positionY: emoji.positionY + event.clientY - dragOffset.y }
          : emoji
      );
      setEmojisUrl(newTexts);
      handleSetEmoji(newTexts)
      setDragOffset({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseUp = () => {
    setDraggingEmojiId(null);
    setDragOffset(null);
  };

  return (
    <>
      {emojis.map((emoji, index) => (
        <article
          key={index}
          style={{
            position: 'absolute',
            cursor: draggingEmojiId === emoji.id ? 'grabbing' : 'grab',
            left: emoji.positionX,
            top: emoji.positionY,
            width: size.width, 
            height: size.height,
          }}
          onMouseMove={handleMouseMove} 
          onMouseUp={handleMouseUp}
        >
          <img
            onMouseDown={(e) => handleMouseDown(e, emoji.id)} 
            src={emoji.url}
            alt="stickers"
          />
        </article>
      ))}
    </>
  );
}

export { ImportEmojiComponent }
