import { useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import { timeLineHeaderItem, initHeaderAnimation } from '../animations/anime-js.tsx';
import { CustomLink } from '../assets/CustomLink.tsx';
import '../../scss/layouts/header.scss';
// import reactLogo from '../../assets/react.svg'


export const Header = () => {
  const root = useRef<HTMLDivElement>(null);
  // const scope = useRef<ReturnType<typeof initHeaderAnimation> | null>(null);


  useEffect(() => {
    // scope.current = initHeaderAnimation(root);

    timeLineHeaderItem()

    // return () => {
    //   scope.current?.revert();
    // };
  }, []);

  // useEffect(() => {

  // }, []);

  // const handleScroll = () => {
  //   const header = document.querySelector('.header');
  //   // const mainContent = document.querySelector('.page__main-content');
  //   // const mainContentTop = mainContent.getBoundingClientRect().top;
  //   // if (mainContentTop < 0) {
  //   header.classList.add('with-border');
  //   // } else {
  //   //   header.classList.add('without-border');
  //   //   header.classList.remove('with-border');
  //   // }
  //   // if (mainContentTop < 0) {
  //   //   header.classList.remove('without-border');
  //   // }
  // };
  // const handleScroll = () => {
  //   const header = document.querySelector<HTMLElement>('.header');
  //   if (!header) return;

  //   // Если прокручено вниз
  //   if (window.scrollY > 0) {
  //     header.classList.add('with-border');
  //   } else {
  //     header.classList.remove('with-border');
  //   }
  // };
  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  return (
    <div className="header key-object" ref={root}>
      <div className="header__container">
        <div className="header__content">
          <div className="header__wrapper el-logo-wrapper">

            <div className="header__column el-logo">
              <CustomLink to="/">
                <div className="header__logo">
                  {/* <img src={reactLogo} className="logo react" alt="React logo" /> */}
                </div>
              </CustomLink>
              <div className="header__text">
                <span>Media-Group</span>
              </div>
            </div>
          </div>
          <div className="header__column ">
            <div className="header__menu">
              <div className="header__item header__item--home">
                <CustomLink to="/">
                  <i className="icon-home"></i>
                </CustomLink>
              </div>
              <div className="header__item header__item--services">
                <CustomLink
                  className="header__link-key link-key--services"
                  to="/services"
                >
                  <span>Услуги</span>
                </CustomLink>
              </div>
              <div className="header__item">
                <CustomLink className="header__link-key" to="/video">
                  <span>Видео</span>
                </CustomLink>
              </div>
              <div className="header__item">
                <CustomLink className="header__link-key" to="/about">
                  <span>Компания</span>
                </CustomLink>
              </div>
              <div className="header__item">
                <CustomLink className="header__link-key" to="/news">
                  <span>Новости</span>
                </CustomLink>
              </div>
              <div className="header__item header__item--contacts">
                <Link
                  className="header__link-key link-key--contacts"
                  to="footer"
                  duration={500}
                  offset={-100}
                  isDynamic={true}
                  smooth="easeInQuad"
                >
                  <span>Контакты</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="header__column el-community">
            <a href="tel:++79106044424" className="el-community__phone">
              <i className="icon-phone-ringing"></i>
              <div className="el-community__content">
                <h5 className="el-community__title">GIVE US A CALL</h5>
                <span>+7 910 604-44-24</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
