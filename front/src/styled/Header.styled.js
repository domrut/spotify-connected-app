import styled from "styled-components";

export const HamburgerStyled = styled.div`
  width: 2rem;
  height: 2rem;
  justify-content: space-around;
  flex-flow: column nowrap;
  position: ${({isOpen}) => isOpen && 'fixed'};
  right: ${({isOpen}) => isOpen && '27px'};
  z-index: 32;
  & > div {
    width: 2rem;
    height: 0.25rem;
    border-radius: 10px;
    background-color: #fff;
    transform-origin: 1px;
    transition: all 0.3s linear;
  }
  & > div:nth-child(1) {
    transform: ${({isOpen}) => isOpen && 'rotate(47deg)'};
  }
  & > div:nth-child(2) {
    transform: ${({isOpen}) => isOpen && 'translateX(100%)'};
    opacity: ${({isOpen}) => isOpen && '0'};
  }
  & > div:nth-child(3) {
    transform: ${({isOpen}) => isOpen && 'rotate(-47deg)'};
  }
`
export const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 90px;
  & > a:nth-child(1) {
    margin-bottom: 1rem;
  }
`;
export const Menu = styled.div`
  align-self: center;
`;
export const Modal = styled.div`
  height: 100%;
  background: rgba(0, 0, 0, 1);
  width: 60%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 32;
  transition: all 0.3s linear;
  transform: ${({isOpen}) => isOpen ? 'translateX(0%)' : 'translateX(100%)'};
  @media screen and (max-width: 230px) {
    width: 80%;
  }
`;