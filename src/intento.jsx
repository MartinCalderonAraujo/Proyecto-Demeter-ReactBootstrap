import React, { useState } from 'react';

export default function Test() {
  const [text, setText] = useState();
  const [update, setUpdate] = useState();
  const textOnChange = (event) => {
    setText(event.target.value);
  };
  const actualizarTexto = () => {
    setUpdate(text);
  }
  return (
    <div>
      <input type="text" value={text} onChange={textOnChange} />
      <button onClick={actualizarTexto}>Actualizar</button>
      <p>texto input: {text}</p>
      <p>texto actualizado: {update}</p>
    </div>
  )
}