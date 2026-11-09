import './App.css';
// import { gsap } from 'gsap';
// import { useGSAP } from '@gsap/react';
import Router from './ts/router/Router';
// import { ScrollSmoother } from 'gsap/ScrollSmoother';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from './ts/components/header';

// gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);

export default function App() {
  return (
    <>
      <header className="page__header">
        <Header />
      </header>
      {/* <Router isHomepage={true} /> */}
    </>
  );
}
