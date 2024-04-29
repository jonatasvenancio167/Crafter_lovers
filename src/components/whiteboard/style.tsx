import styled from 'styled-components';

interface StyledParagraphProps {
  fontSize: number;
  fontFamily: string;
  left?: number;
  top?: number;
  zIndex?: number
  color?: string
  translateX?: number
  translateY?: number
  rotation?: number
}

export const StyledParagraph = styled.p<StyledParagraphProps>`
  position: absolute;
  top: ${props => props.top ? props.top : '50%'};
  left: ${props => props.left ? props.left : '50%'};
  font-size: ${({ fontSize }) => `${fontSize}px`};
  font-family: ${({ fontFamily }) => fontFamily};
  color: ${({ color }) => color};
  transform: translate(${props => props.translateX ? props.translateX : '0'}, ${props => props.translateY ? props.translateY : '0'}) rotate(${props => props.rotation ? props.rotation : '0'}deg);
`;

