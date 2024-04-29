import './style.css';
import { useSidebarContext } from '../../hooks/useSidebarProvider';
import { TextAreaComponent } from '../textArea';
import { ImportImageComponent } from '../importImage';
import { ImportEmojiComponent } from '../importEmoji';
import html2canvas from 'html2canvas';

const Whiteboard = () => {
  const { textArea, image, urlEmoji, exportedImageData } = useSidebarContext()

  const exportWhiteboard = () => {
    const whiteboardElement = document.querySelector('.blank-screen') as HTMLElement;

    if(whiteboardElement) {
      html2canvas(whiteboardElement, {
        width: 827,
        height: 1718,
        scale: 2
      }).then(canvas => {
        const imgData = canvas.toDataURL('image/jpeg');
        const link = document.createElement('a');
        link.download = 'whiteboard.jpg';
        link.href = imgData;
        link.click();
      });
    } else {
      console.error(whiteboardElement)
    }
  }

  if(exportedImageData) {
    exportWhiteboard()
  }

  return (
    <section className="centered-container" >
      <div className="blank-screen">
        {image && <ImportImageComponent image={image} />}
        {urlEmoji && <ImportEmojiComponent emojis={urlEmoji} />}
        {textArea && <TextAreaComponent handleGetText={textArea}/>}
      </div>
    </section>
  );
};

export { Whiteboard };
