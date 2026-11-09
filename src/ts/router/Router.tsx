import { useGSAP } from '@gsap/react';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ScrollToTop from '../assets/ScrollToTop';
// import { TransitionProvider } from '../context/TransitionContext';
// import TransitionComponent from '../components/Transition';

// import { MenuFloat } from '../modules/Menu-float';
// import { AboutPage } from '../pages/AboutPage.jsx';
// import { HomePage } from '../pages/HomePage.jsx';
// import { ServicesPage } from '../pages/ServicesPage.jsx';

// import returnToSavedPosition from '../assets/return-position';

// const baseUrl = '.';

export default function Router() {
  const location = useLocation();

  // Инициализация ScrollSmoother
  useGSAP(
    () => {
      const smoother = ScrollSmoother.create({
        wrapper: '#wrapper',
        content: '#content',
        smooth: 1,
        effects: true,
        smoothTouch: 0.1,
      });
      return () => {
        smoother.kill(); // Удаляем Smooth при размонтировании
      };
    },
    {
      dependencies: [location],
    }
  );

  useEffect(() => {
    // returnToSavedPosition();
  }, []);

  return (
    <>
      <ScrollToTop /> {/* Компонент для сброса прокрутки */}
      <main className="page__main-content">
        <div className="main-content" id="wrapper">
          <div className="main-content__content" id="content"></div>
        </div>
      </main>
      <div className="page__menu-float">
        {/* <MenuFloat baseUrl={baseUrl} /> */}
      </div>
      <div className="page__aside" id={'scrollButton'}>
        <i className="icon-angle-down _button"></i>
      </div>
    </>
  );
}
