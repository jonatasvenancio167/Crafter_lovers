import { useState, useRef } from 'react';

interface ImportImageComponentProps { 
  image: any
}

interface Position {
  x: number
  y: number
}

interface Size {
  width: number
  height: number
}

const ImportImageComponent = ({ image }: ImportImageComponentProps) => {
  const [position, setPosition] = useState<Position>({ x: 50, y: 50 });
  const [size, setSize] = useState<Size>({ width: 300, height: 300 });
  const dragPos = useRef<Position>({ x: 0, y: 0 });
  const resizing = useRef<boolean>(false);
  const dragging = useRef<boolean>(false);

  const imageSrc = image ? URL.createObjectURL(image) : null;

  const onMouseDown = (e: any) => {
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
        x: clientX - position.x,
        y: clientY - position.y
      };
    }
    e.preventDefault();
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX, clientY } = e;
    if (resizing.current) {
      setSize({ 
        width: clientX - dragPos.current.x, 
        height: clientY - dragPos.current.y 
      });
    } else if (dragging.current && e.buttons === 1) { 
      setPosition({
        x: clientX - dragPos.current.x,
        y: clientY - dragPos.current.y
      });
    }
  };

  const onMouseUp = () => {
    dragging.current = false;
    resizing.current = false;
  };

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      style={{ 
        width: size.width, 
        height: size.height, 
        position: 'absolute', 
        userSelect: 'none',
        left: position.x,
        top: position.y,
        cursor: dragging ? 'grabbing' : 'grab', 
      }}
    >
      { imageSrc && (
        <>
          <img
          src={imageSrc}
          alt="Imported"
          style={{ width: '100%', height: '100%', position: 'absolute', top: position.y, left: position.x }}
          onMouseDown={onMouseDown}
        />
        {(resizing.current || dragging.current) && (
          <div
            className="resize-handle"
            style={{
              position: 'absolute',
              top: position.y,
              left: position.x,
              width: '10px',
              height: '10px',
              backgroundColor: 'red',
              cursor: 'nwse-resize'
            }}
            onMouseDown={onMouseDown}
          />
        )}
      </>
      )}
    </div>
  );
};

export { ImportImageComponent };
