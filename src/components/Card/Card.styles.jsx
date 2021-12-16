import styled from 'styled-components';

export const CardContainer = styled.div`
    border-radius: 5px;
    border: none;
    overflow-x: scroll;
    width: calc(100% - 90px);
    max-width:500px;
    margin: 10px 20px;
    padding: 20px 20px 60px 20px;
    position: relative;
    background-color: rgba(0,0,0,0.05);

    &.King {
        border-color: #673ab7;
        box-shadow: 0px 10px 13px -12px rgb(103, 58, 183);
    }

    &.Warrior {
        border-color: #03A9F4;
        box-shadow: 0px 10px 13px -12px rgb(3 169 244);
    }

    &.Magician {
        border-color: #FF5722;
        box-shadow: 0px 10px 13px -12px rgb(255, 87, 34);
    }

    &.Lover {
        border-color: #e91e63;
        box-shadow: 0px 10px 13px -12px rgb(233, 30, 99);
    }
`
