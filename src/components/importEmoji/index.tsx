import { useRef, useState } from "react";

interface ImportEmojiComponentProps {
  emojis: string
}

interface Position {
  x: number
  y: number
}

interface Size {
  width: number
  height: number
}

const ImportEmojiComponent = ({ emojis }: ImportEmojiComponentProps) => {
  const [positionEmoji, setPositionEmoji] = useState<Position>({ x: 50, y: 50 });
  const [size, setSize] = useState<Size>({ width: 300, height: 300 });
  const resizing = useRef<boolean>(false);
  const dragPos = useRef<Position>({ x: 0, y: 0 });
  const dragging = useRef<boolean>(false);
  
  const handleMouseDown = (e: any) => {
    const { clientX, clientY } = e;
    if (e.target.className === 'resize-handle') {
      resizing.current = true;
      dragPos.current = {
        x: clientX - size.width,
        y: clientY - size.height
      };
    } else {
      dragging.current = true;
      dragPos.current = {
        x: clientX - positionEmoji.x,
        y: clientY - positionEmoji.y
      };
    }
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX, clientY } = e;
    if (resizing.current) {
      setSize({ 
        width: clientX - dragPos.current.x, 
        height: clientY - dragPos.current.y 
      });
    } else if (dragging.current && e.buttons === 1) { 
      setPositionEmoji({
        x: clientX - dragPos.current.x,
        y: clientY - dragPos.current.y
      });
    }
  };

  const handleMouseUp = () => {
    dragging.current = false;
    resizing.current = false;
  };

  return (
    <article
      style={{
        position: 'absolute',
        cursor: dragging ? 'grabbing' : 'grab',
        left: positionEmoji.x,
        top: positionEmoji.y,
        width: size.width, 
        height: size.height,
      }}
      
      onMouseMove={handleMouseMove} 
      onMouseUp={handleMouseUp}
    >
      {emojis && (
        <>
          <img
            src={emojis}
            alt="stickers"
            onMouseDown={handleMouseDown}
          />
        </>
      )}
    </article>
  )
}

export { ImportEmojiComponent }