import { ColorResult } from "react-color";

export interface TextItem {
  id: number;
  text: string;
  rotation: number;
  positionX: number;
  positionY: number;
  fontFamily: string;
  fontSize: number;
  color: ColorResult
}
