import { animate, createTimeline, createScope, createSpring, createDraggable } from 'animejs';
import type { RefObject } from 'react';
//* ----------------------------------------------------------------------------
// src/animations/headerAnimation.ts 

export function initHeaderAnimation(root: RefObject<HTMLDivElement | null>) {
	if (!root.current) return null;

	const scope = createScope({ root }).add((self) => {
		if (!self) return;

		// Bounce-анимация wrapper
		animate('.el-logo-wrapper', {
			x: [
				{ to: '16rem', ease: 'inOut(3)', duration: 200 },
				{ to: 0, ease: createSpring({ stiffness: 300 }) },
			],
		});

		// Draggable на сам логотип
		createDraggable('.el-logo', {
			container: [0, 0, 0, 0],
			releaseEase: createSpring({ stiffness: 200 }),
		});

		// Метод наружу
		self.add('rotateLogo', (i: number) => {
			animate('.el-logo', {
				rotate: i * 360,
				ease: 'out(4)',
				duration: 1500,
			});
		});
	});

	return scope;
}


export function timeLineHeaderItem() {
	animate('.el-logo', {
		translateX: ['-17rem', 0],
		opacity: [0, 1],
	});

	animate('.header__menu', {
		// translateX: ['-17rem', 0],
		// scale: [0, 1],
		opacity: [0, 1]
	});

	const tlA = createTimeline();
	tlA
	// .sync(hm1Animation)
	// .sync(tl1Animation, '-=400');

	const tlB = createTimeline({ defaults: { duration: 600 } })
		.add(
			['.header__menu', '.el-logo'],
			{
				scale: [1, 1.2, 1],
			},
			0
		);

	const tlMain = createTimeline();
	tlMain.sync(tlA).sync(tlB);

	return tlMain
}


//* ----------------------------------------------------------------------------
// export function fadeInSlide() {
//   let fadeInSlide = animate.timeline({
//     duration: 750,
//   });
//   fadeInSlide
//     .add(
//       {
//         targets: '.swiper-slide-active .main-slide__title',
//         opacity: [0, 1],
//         translateY: [80, 0],
//         delay: animate.stagger(100, { start: 500 }),
//         easing: 'easeInOutSine',
//         duration: 1000,
//         begin: function (anim) {
//           anim.animatables.forEach(function (animatable) {
//             animatable.target.style.transition = 'opacity 0.3s ease-out';
//           });
//         },
//       },
//       50
//     )
//     .add(
//       {
//         targets: '.swiper-slide-active .main-slide__text',
//         opacity: [0, 1],
//         translateY: [100, 0],
//         delay: anime.stagger(100, { start: 500 }),
//         duration: 1000,
//         easing: 'easeInOutSine',
//         begin: function (anim) {
//           anim.animatables.forEach(function (animatable) {
//             animatable.target.style.transition = 'opacity 0.3s ease-out';
//           });
//         },
//       },
//       130
//     );
// }

// //* --------------------------- Анимация линий ---------------------------------
// export function animationSvgLine(target, reverse) {
//   const path = target.querySelector('.services-slide__svg .lines path');
//   // Создаем переменную path
//   anime({
//     targets: path,
//     strokeDashoffset: [anime.setDashoffset, 0],
//     easing: 'easeInOutSine',
//     duration: 500,
//     opacity: [0, 1],
//     delay: function (el, i) {
//       return i * 250;
//     },
//     // Устанавливаем направление анимации в зависимости от параметра reverse
//     direction: reverse ? 'reverse' : 'normal',
//     begin: () => {
//       // Добавляем класс при начале анимации
//       target.classList.add('animating');
//     },
//     complete: () => {
//       if (reverse) {
//         // Удаляем класс после завершения анимации в обратном направлении
//         target.classList.remove('animating');
//         path.setAttribute('stroke-dashoffset', anime.setDashoffset);
//       }
//     },
//   });
// }

// //* --------------------------- Анимация текста --------------------------------
// export function animationSvgText(target, reverse) {
//   // Создаем переменную path
//   const textPath = target.querySelectorAll(
//     '.services-slide__image .lines-text path'
//   );

//   anime({
//     targets: textPath,
//     strokeDashoffset: [0, anime.setDashoffset],
//     easing: 'easeInOutSine',
//     duration: 300,
//     opacity: 1,
//     delay: function (el, i) {
//       return i * 200;
//     },

//     // Устанавливаем направление анимации в зависимости от параметра reverse
//     direction: reverse ? 'reverse' : 'normal',
//     begin: () => {
//       // Добавляем класс при начале анимации
//       target.classList.add('animating');
//     },
//     complete: () => {
//       if (reverse) {
//         // Удаляем класс после завершения анимации в обратном направлении
//         target.classList.remove('animating');
//         textPath.forEach((path) => {
//           path.setAttribute('stroke-dashoffset', anime.setDashoffset);
//         });
//       }
//     },
//   });
// }

// //* ----------------------------------------------------------------------------
// /*
//  export function removeElement() {
//  const animatedElements = document.querySelectorAll(
//  '.equalizer-content__square');
//  animatedElements.forEach(element => {
//  // Удаляем анимацию для каждого элемента
//  anime.remove(element);
//  });
//  }*/
