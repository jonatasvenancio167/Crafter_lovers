import styled from 'styled-components';

interface ContainerProps {
  sidebar?: boolean;
}

export const Container = styled.div<ContainerProps>`
  background-color: #FFB6C1;
  position: fixed;
  height: 100%;
  top: 0px;
  left: 0px;
  width: 300px;
  left: ${props => props.sidebar ? '0' : '-100%'};
  animation: showSidebar .4s;
  overflow-y: auto;

  > svg {
    position: fixed;
    color: white;
    width: 30px;
    height: 30px;
    margin-top: 32px;
    margin-left: 32px;
    cursor: pointer;
  }

  @keyframes showSidebar {
    from {
      opacity: 0;
      width: 0;
    }
    to {
      opacity: 1;
      width: 300px;
    }
  }

  @media (max-width: 768px) {
    width: 250px;
  }

  @media (max-width: 576px) {
    width: 200px;
  }
`;

export const Content = styled.div`
  margin-top: 100px;
`;

export const Emojis = styled.div`
  display: flex;
  flex-direction: column;
`;
