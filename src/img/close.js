import React from 'react';

const Close = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg> )
}
const Tick = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" fill="currentColor" height="24" viewBox="0 0 24 24">
      <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
      </svg>)
}
const BackArrow  = ({ className }) => {
  return (
<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z"/></svg>    )
}
  
export default Close;
export  {Close,Tick,BackArrow};