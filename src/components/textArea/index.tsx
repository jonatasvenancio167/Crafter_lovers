import { useEffect, useState } from "react";
import { StyledParagraph } from "../whiteboard/style";
import { TextItem } from "../../interface/TextItem";
import { useSidebarContext } from "../../hooks/useSidebarProvider";

interface Position {
  x: number;
  y: number;
}

interface TextAreaComponentProps {
  handleGetText: Array<TextItem>
}

const TextAreaComponent = ({ handleGetText }: TextAreaComponentProps) => {
  const [texts, setTexts] = useState<TextItem[]>(handleGetText);
  const [draggingTextId, setDraggingTextId] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<Position | null>(null);

  const { handleSetTextArea } = useSidebarContext()

  useEffect(() => {
    setTexts(handleGetText)
  }, [handleGetText])

  const handleMouseDown = (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>, id: number) => {
    setDraggingTextId(id);
    setDragOffset({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (draggingTextId !== null && dragOffset !== null) {
      const newTexts = texts.map(text =>
        text.id === draggingTextId
          ? { ...text, positionX: text.positionX + event.clientX - dragOffset.x, positionY: text.positionY + event.clientY - dragOffset.y }
          : text
      );
      setTexts(newTexts);
      handleSetTextArea(newTexts)
      setDragOffset({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseUp = () => {
    setDraggingTextId(null);
    setDragOffset(null);
  };

  return (
    <div onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      {texts.map(text => (
        <article
          key={text.id}
          style={{
            position: "absolute",
            cursor: draggingTextId === text.id ? "grabbing" : "grab",
            left: text.positionX,
            top: text.positionY,
          }}
        >
          <StyledParagraph
            onMouseDown={(e) => handleMouseDown(e, text.id)}
            fontFamily={text.fontFamily}
            fontSize={text.fontSize}
            color={text.color.hex}
            translateX={text.positionX}
            translateY={text.positionY}
            rotation={text.rotation}
          >
            {text.text}
          </StyledParagraph>
        </article>
      ))}
    </div>
  );
};

export { TextAreaComponent };
