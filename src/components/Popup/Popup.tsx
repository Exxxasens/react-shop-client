import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import useAppSelector from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useAppDispatch';
import { hide } from '../../store/slices/popupSlice';

const Background = styled.div`
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
`;

const PopupWrapper = styled.div`
    padding: 1rem;
    background: white;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 2rem 0px rgb(0 0 0 / 10%);
    margin: 1rem;
    border-radius: 0.5rem;
    position: absolute;
`;

const ContentWrapper = styled.div``;

const ButtonWrapper = styled.div`
    position: absolute;
    right: 1rem;
    top: 1rem;
`;

const Button = styled.button`
    // padding: 0.875rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    border: none;
    color: tomato;
    border-radius: 0.75rem;
    background: none;
    border: none;
    outline: none;
    height: 1.5rem;
    width: 1.5rem;
    padding: 0;
    &:hover {
        cursor: pointer;
        background: rgb(240, 240, 240);
    }
`;

interface PopupProps {
    onClose: () => void;
}

const Popup = ({ children, onClose }: PropsWithChildren<PopupProps>) => {
    return (
        <Background>
            <PopupWrapper>
                <ButtonWrapper>
                    <Button onClick={onClose}>
                        <IoClose />
                    </Button>
                </ButtonWrapper>
                <ContentWrapper>{children}</ContentWrapper>
            </PopupWrapper>
        </Background>
    );
};

export default Popup;
