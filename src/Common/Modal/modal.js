/**
 * File: /src/components/common/modal.js 
 */

'use strict';

/***********************/
/* THIRD-PARTY IMPORTS */
/***********************/

import * as React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

/*****************************************************************************/

/****************************/
/* TAGGED TEMPLATE LITERALS */
/****************************/

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  z-index: 999;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: calc(100% - 4em);
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.5), -10px 0 8px -4px rgba(0, 0, 0, 0.25);
  z-index: 1000;

  bottom: ${(props) => (props.center ? '150' : '')};
  margin: ${(props) => (props.center ? '160px auto' : '3em auto')};
  height: ${(props) => (props.size === 'big' ? 'calc(100% - 8em)' : 'auto')};
  max-height: ${(props) =>
    props.maxHeight ? props.maxHeight : 'calc(100% - 6em)'};
  max-width: ${(props) =>
    props.size === 'medium' || props.size === 'big'
      ? '768px'
      : props.size === 'small'
        ? '560px'
        : props.maxWidth
          ? props.maxWidth
          : 'none'};

  @media (max-width: 640px) {
    margin: 1em auto;
    width: calc(100% - 2em);
    max-height: calc(100% - 2em);
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 2rem 3rem 0;
`;

const ModalTitle = styled.h3`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.85);

  color: ${(props) => props.theme.lightCobalt};
`;

const CloseBtn = styled.button`
  background: transparent;
  font-size: 0.875rem;
  font-weight: 700;
  border: 0;
  width: 1rem;
  height: 1rem;
  padding: 0;
  cursor: pointer;

  color: ${(props) => props.theme.lightCobalt};
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 2rem 3rem;
  overflow-y: auto;

  > iframe {
    width: 100%;
    height: 100%;
  }
`;

const ModalAction = styled.button`
  position: absolute;
  left: 0;
  bottom: -52px;
  width: 100%;
  border: 0;
  color: #fff;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1rem;
  padding: 1em;
  text-align: center;
  text-transform: uppercase;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  background: ${(props) => props.theme.azure};
`;

/***********/
/* CLASSES */
/***********/

class Modal extends React.Component {
  constructor(props) {
    super(props);

    /* Create the HTML element specified by tagName */
    this.el = document.createElement('div');

    /* Set the element's display type */
    this.el.style.display = 'contents';
  }

  /*********************/
  /* LIFECYCLE METHODS */
  /*********************/

  /**
   *
   */
  componentDidMount() {
    document.body.appendChild(this.el);
    document.body.style.overflow = 'hidden';
  }

  /**
   *
   */
  componentWillUnmount() {
    document.body.removeChild(this.el);
    document.body.removeAttribute('style');
  }

  /*************/
  /* FUNCTIONS */
  /*************/

  /**
   * @returns {jsx}
   */
  render() {
    /* Unpack values from the props using destructuring assignment */
    const {
      size,
      maxWidth,
      title,
      close,
      makeAction,
      action,
      center,
      maxHeight,
    } = this.props;

    /**
     * Provide a way to render children into a DOM node that exists outside
     * the hierarchy of the DOM component
     *
     * @see: https://reactjs.org/docs/react-dom.html#createportal
     */
    return ReactDOM.createPortal(
      /* Group a list of children without adding extra nodes to the DOM */
      <>
        <Overlay onClick={close} />
        <ModalBody
          size={size}
          maxWidth={maxWidth}
          center={center}
          maxHeight={maxHeight}
        >
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            <CloseBtn onClick={close}>&#10005;</CloseBtn>
          </ModalHeader>

          <ModalContent>{this.props.children}</ModalContent>

          {makeAction ? (
            <ModalAction onClick={makeAction}>{action}</ModalAction>
          ) : null}
        </ModalBody>
      </>,
      this.el,
    );
  }
}

/***********/
/* EXPORTS */
/***********/

export default Modal;
