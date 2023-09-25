gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother, TweenLite)

const header = document.querySelector('.header')

window.addEventListener('scroll', () => {
	const currentPos = window.pageYOffset || document.documentElement.scrollTop

	if (currentPos < 10) {
		header.classList.remove('scrolled')
	} else {
		header.classList.add('scrolled')
	}
})

const colors = [
	'#FFF3EE',
	'#F4EAB7',
	'#96E899',
	'#77E3EC',
	'#E0D0F5',
	'#68C3CA',
	'#F4D1B7',
	'#B0EEF2',
	'#56E7C4',
	'#C5A18F'
]

function setRandomColors() {
	const colorBtns = document.querySelectorAll('.btn-color')
	colorBtns.forEach(btn => {
		const randomColor = colors[Math.floor(Math.random() * 10) + 1]
		return (btn.style.backgroundColor = `${randomColor}`)
	})
}

setRandomColors()

// MENU
const menu = document.querySelector('.menu'),
	menuBtn = document.querySelector('.navbar__option-menu'),
	menuOuter = document.querySelector('.menu__outer'),
	menuLinks = document.querySelectorAll('.menu__link')

menuBtn.addEventListener('click', function onSetMenu() {
	if (menuBtn.classList.contains('usage')) {
		closeMenu()
	} else {
		openMenu()
	}
})

menuOuter.addEventListener('click', closeMenu)
menuLinks.forEach(btn => btn.addEventListener('click', closeMenu))

function openMenu() {
	menuBtn.classList.add('usage')
	menu.classList.add('usage')
	menuOuter.classList.add('usage')
	document.body.style.overflow = 'hidden'
}

function closeMenu() {
	menuBtn.classList.remove('usage')
	menu.classList.remove('usage')
	menuOuter.classList.remove('usage')
	document.body.style.overflow = 'auto'
}

// SWIPERS

new Swiper('.benefits-slider', {
	pagination: {
		el: '.swiper-pagination',
		clickable: true
	},
	loop: true,
	simulateTouch: true,
	speed: 600,
	spaceBetween: 40,
	slidesPerView: 1,
	effect: 'creative',
	creativeEffect: {
		prev: {
			shadow: true,
			translate: ['-140%', 0, -500]
		},
		next: {
			shadow: true,
			translate: ['140%', 0, -500]
		}
	}
})

new Swiper('.unique-slider', {
	navigation: {
		nextEl: '.unique-button-next',
		prevEl: '.unique-button-prev'
	},
	loop: true,
	simulateTouch: true,
	speed: 800,
	slidesPerView: 1.9,
	spaceBetween: 20,
	centeredSlides: true,
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 10
		},
		400: {
			slidesPerView: 1.2,
			spaceBetween: 10
		},
		568: {
			slidesPerView: 1.4,
			spaceBetween: 10
		},
		800: {
			slidesPerView: 1.6,
			spaceBetween: 20
		},
		1024: {
			slidesPerView: 1.9,
			spaceBetween: 20
		}
	}
})

let smoother
if (ScrollTrigger.isTouch !== 1) {
	smoother = ScrollSmoother.create({
		content: '#content',
		smooth: 1.5,
		effects: true
	})
}

// ANCHOR LINKS

gsap.utils.toArray('.anchor a').forEach(function (button, i) {
	button.addEventListener('click', e => {
		const id = e.target.getAttribute('href')
		smoother.scrollTo(id, true, 'top top')
		e.preventDefault()
	})
})

window.onload = event => {
	let urlHash = window.location.href.split('#')[1]
	let scrollElem = document.querySelector('#' + urlHash)

	if (urlHash && scrollElem) {
		gsap.to(smoother, {
			scrollTop: smoother.offset(scrollElem, 'top top'),
			duration: 1,
			delay: 0.5
		})
	}
}

// TITLE SCROLL

gsap
	.to('.marquee__part', {
		xPercent: -100,
		repeat: -1,
		duration: 20,
		ease: 'linear'
	})
	.totalProgress(0.5)

// SLOGAN

let sloganTL = gsap.timeline({
	scrollTrigger: {
		trigger: '.slogan',
		start: 'top bottom',
		end: 'bottom'
	}
})

sloganTL.fromTo(
	'.slogan__title',
	{ x: '150%' },
	{
		x: 0,
		ease: 'expo.out',
		duration: 1
	}
)

sloganTL.to('.slogan__product-bg', {
	opacity: 1,
	duration: 0.4
})

sloganTL.to('.slogan__product img', {
	scale: 1,
	duration: 0.3
})

sloganTL.to('.slogan__footer', {
	y: 0,
	opacity: 1
})

const compositionItems = gsap.utils.toArray('.composition__item')

// compositions
compositionItems.forEach(item => {
	gsap.to(item, {
		scrollTrigger: {
			trigger: item,
			start: 'top bottom+=300'
		},
		y: 0,
		opacity: 1
	})
})

/* COLOR CHANGER */
window.addEventListener('load', function () {
	const scrollColorElems = document.querySelectorAll('[data-bgcolor]')
	scrollColorElems.forEach((colorSection, i) => {
		const prevBg = i === 0 ? '' : scrollColorElems[i - 1].dataset.bgcolor

		ScrollTrigger.create({
			trigger: colorSection,
			start: 'top 50%+=150',
			duration: 2,
			onEnter: () =>
				gsap.to('body', {
					backgroundColor: colorSection.dataset.bgcolor,
					overwrite: 'auto'
				}),
			onLeaveBack: () =>
				gsap.to('body', {
					backgroundColor: prevBg,
					overwrite: 'auto'
				})
		})
	})
})

const splitTitles = document.querySelectorAll('.title-split')
const splitedTitles = gsap.utils.toArray('.title-split')

splitTitles.forEach(title => new SplitType(title))

splitedTitles.forEach(title => {
	const charOfTitle = title.querySelectorAll('.char')

	charOfTitle.forEach(char =>
		gsap.to(char, {
			scrollTrigger: {
				trigger: title,
				start: 'top center+=200'
			},
			y: 0,
			rotate: 0,
			stagger: 0.05,
			delay: 0.2,
			duration: 0.1
		})
	)
})

let tl = gsap.timeline({
	scrollTrigger: {
		trigger: '.products__inner',
		pin: true,
		pinSpacing: true,
		start: 'top-=40 top',
		end: '+=2000',
		scrub: 1
	}
})

tl.addLabel('products__item-1')
tl.to('.products__item-1', {
	yPercent: 0,
	opacity: 1
})

tl.from('.products__item-2', {
	yPercent: 145,
	opacity: 0
})

tl.addLabel('products__item-2')
tl.add(() => setActiveNav(tl.scrollTrigger.direction > 0 ? 1 : 0), '-=0.15')

tl.to(
	'.products__item-1',
	{
		scale: 0.92,
		yPercent: -0.5,
		opacity: 0.7
	},
	'-=0.3'
)

tl.to('.products__item-2', {
	yPercent: 0,
	opacity: 1
})

tl.from('.products__item-3', {
	yPercent: 145,
	opacity: 0
})

tl.addLabel('products__item-3')
tl.add(() => setActiveNav(tl.scrollTrigger.direction > 0 ? 2 : 1), '-=0.15')

tl.to(
	'.products__item-2',
	{
		scale: 0.96,
		yPercent: -0.4,
		opacity: 0.7
	},
	'-=0.3'
)

tl.from('.products__item-4', {
	yPercent: 145,
	opacity: 0
})

tl.addLabel('products__item-4')
tl.add(() => setActiveNav(tl.scrollTrigger.direction > 0 ? 3 : 2), '-=0.15')

tl.to(
	'.products__item-3',
	{
		scale: 0.98,
		yPercent: -0.3,
		opacity: 0.7
	},
	'-=0.3'
)

tl.to('.products__item-4', {
	yPercent: 0,
	opacity: 1
})

tl.to('.products__item-4', {})

const servicesBtns = gsap.utils.toArray('.products__btn')

servicesBtns.forEach((a, i) => {
	a.addEventListener('click', e => {
		e.preventDefault()
		let pad = i === 0 ? 0 : tl.scrollTrigger.direction > 0 ? 2 : -2
		gsap.to(window, {
			scrollTo: labelToScroll(tl, 'products__item-' + (i + 1)) + pad
		})
	})
})

function labelToScroll(timeline, label) {
	let st = timeline.scrollTrigger,
		progress = timeline.labels[label] / timeline.duration()
	return st.start + (st.end - st.start) * progress
}

function setActiveNav(index) {
	servicesBtns.forEach((circle, i) =>
		circle.classList[i === index ? 'add' : 'remove']('active')
	)
}

// reviews
const reviewsCards = gsap.utils.toArray('.reviews__card')

reviewsCards.forEach(review => {
	gsap.to(review, {
		scrollTrigger: {
			trigger: review,
			start: 'top bottom-=300',
			end: 'bottom+=300 bottom'
		},
		opacity: 1
	})
})

// cta
const cta = document.querySelector('.cta'),
	ctaBtn = document.querySelector('.cta__button')

ctaBtn.addEventListener('mouseover', function () {
	cta.classList.add('anim')
})

ctaBtn.addEventListener('mouseout', function () {
	cta.classList.remove('anim')
})

gsap.to('.cta', {
	scrollTrigger: {
		trigger: '.cta',
		start: 'center bottom',
		end: 'bottom+=300 bottom',
		toggleClass: 'active'
	}
})

// fall btns
let triggered = false

const splitWords = () => {
	const textNode = document.querySelector('.text')
	const text = textNode.textContent
	const newDomElements = text.split(',').map(text => {
		return `<span class="dropword btn-color">${text}</span>`
	})
	textNode.innerHTML = newDomElements.join('')

	setRandomColors()
}

const renderCanvas = () => {
	const Engine = Matter.Engine,
		Render = Matter.Render,
		World = Matter.World,
		Bodies = Matter.Bodies,
		Composite = Matter.Composite,
		Runner = Matter.Runner

	const params = {
		isStatic: true,
		render: {
			fillStyle: 'transparent'
		}
	}
	const canvasSize = {
		width: document.querySelector('.benefits__wrapper').offsetWidth,
		height: document.querySelector('.benefits__wrapper').offsetHeight
	}
	const engine = Engine.create({}),
		world = engine.world

	const render = Render.create({
		element: document.querySelector('.benefits__wrapper .text'),
		engine: engine,
		options: {
			...canvasSize,
			background: 'transparent',
			wireframes: false
		}
	})

	const floor = Bodies.rectangle(
		canvasSize.width / 2,
		canvasSize.height,
		canvasSize.width,
		50,
		params
	)
	const wall1 = Bodies.rectangle(
		0,
		canvasSize.height / 2,
		50,
		canvasSize.height,
		params
	)
	const wall2 = Bodies.rectangle(
		canvasSize.width,
		canvasSize.height / 2,
		50,
		canvasSize.height,
		params
	)

	const wordElements = document.querySelectorAll('.dropword')

	const wordBodies = [...wordElements].map((elemRef, index) => {
		const width = elemRef.offsetWidth
		const height = elemRef.offsetHeight

		return {
			body: Matter.Bodies.rectangle(
				canvasSize.width / (1 + index),
				0,
				width,
				height,
				{
					render: {
						fillStyle: 'transparent'
					}
				}
			),
			elem: elemRef,
			render() {
				const { x, y } = this.body.position
				this.elem.style.top = `${y - 12}px`
				this.elem.style.left = `${x - width / 2}px`
				this.elem.style.transform = `rotate(${this.body.angle}rad)`
			}
		}
	})

	const mouse = Matter.Mouse.create(
		document.querySelector('.benefits__wrapper')
	)
	const mouseConstraint = Matter.MouseConstraint.create(engine, {
		mouse,
		constraint: {
			stiffness: 0.2,
			render: {
				visible: false
			}
		}
	})
	mouse.element.removeEventListener('mousewheel', mouse.mousewheel)
	mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel)

	World.add(world, [
		floor,
		...wordBodies.map(box => box.body),
		wall1,
		wall2,
		mouseConstraint
	])
	render.mouse = mouse

	ScrollTrigger.create({
		trigger: '.text',
		start: 'top+=36% top+=40%',
		toggleActions: 'play restart play reverse',

		onEnter() {
			if (!triggered) {
				triggered = true

				Runner.run(engine)
				Render.run(render)
				;(function rerender() {
					wordBodies.forEach(element => {
						element.render()
					})
					Matter.Engine.update(engine)
					requestAnimationFrame(rerender)
				})()
			}
		}
	})
}

window.addEventListener('DOMContentLoaded', event => {
	splitWords()
	renderCanvas()
})
