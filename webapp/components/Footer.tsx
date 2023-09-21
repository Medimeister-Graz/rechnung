import React from 'react';

const Footer = (): JSX.Element => (
  <div
    style={{
      textAlign: 'center',
      width: '100%',
      fontSize: '15px',
      marginTop: '50px',
    }}
  >
    Original von und für <strong>Abakus</strong> | Adaptiert von den{' '}
    <strong>Medimeisterschaften Graz</strong> |{' '}
    <a
      style={{
        textDecoration: 'none',
        color: '#BC1818',
      }}
      href="https://github.com/Medimeister-Graz/rechnung"
      target="blank"
    >
      Unterstütze uns auf GitHub
    </a>
  </div>
);

export default Footer;
