import React, { useState, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import CloseIcon from '@material-ui/icons/Close';
import Modal from 'react-modal';
import { Typography, Button } from '@material-ui/core';
import styles from './Sign.module.css';
import IconButton from '@material-ui/core/IconButton';

type Props = {
  modalIsOpen: boolean;
  setIsOpen: (state: boolean) => void;
  setSignature: (data: string) => void;
  setHasUploaded: (state: boolean) => void;
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '10px',
  },
};

const Sign = ({
  modalIsOpen,
  setIsOpen,
  setSignature,
  setHasUploaded,
}: Props): JSX.Element => {
  const [sigCanvas, setSigCanvas] = useState<any>({});
  const [width, setWidth] = useState(700);
  const [rotated, setRotated] = useState(false);

  const resize = () => setWidth(Math.min(window.innerWidth - 50, 700));
  const rotate = () => setRotated(!rotated);

  useEffect(() => {
    setWidth(Math.min(window.innerWidth - 50, 700));
    window.addEventListener('resize', resize);
    window.addEventListener('orientationchange', rotate);
    return () => {
      window.removeEventListener('resize', resize);
      window.addEventListener('orientationchange', rotate);
    };
  });

  const base64Encode = () => {
    setSignature(sigCanvas.getTrimmedCanvas().toDataURL('image/png'));
    setHasUploaded(true);
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className={styles.nav}>
        <Typography variant="h6">Unterschreib im Feld unten</Typography>
        <IconButton size="medium" onClick={() => setIsOpen(false)}>
          <CloseIcon />
        </IconButton>
      </div>
      <p
        style={{
          margin: 0,
          fontStyle: 'italic',
          fontSize: '10px',
          marginBottom: '-5px',
        }}
      >
        Tipp: Dreh das Smartphone
      </p>
      <SignatureCanvas
        penColor="black"
        backgroundColor="white"
        canvasProps={{
          width,
          height: 200,
          style: { border: '1px dashed black', margin: '5px 0' },
        }}
        ref={(ref: any) => setSigCanvas(ref)}
      />
      <div className={styles.nav}>
        <Button variant="contained" onClick={() => sigCanvas.clear()}>
          Beginne von neuem
        </Button>
        <Button variant="contained" color="primary" onClick={base64Encode}>
          Unterschrift benutzen
        </Button>
      </div>
    </Modal>
  );
};

export default Sign;
