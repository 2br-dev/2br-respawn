let hero_video;

$(() => {

	if(document.querySelector('main#index')){
		particlesJS.load('particles-js', '/js/particles.json');

		let year = new Date().getFullYear().toString();
		let oldYear = document.querySelector('.old-year').innerHTML;
	
		if(oldYear != year){
			document.querySelector('.now-year').innerHTML = " – " + year;
		}
	}

	animate();

	let options = {
		afterLoad: el => {
			el.addClass('complete');
		}
	}

	if( $('.scroll-wrapper').length ){
		options.appendScroll = $('.scroll-wrapper')
	}

	$('.lazy, video').lazy( options );

	$(window).enllax();

	$('body').on('mouseenter', '.poster-wrapper', playVideo);
	$('body').on('mouseleave', '.poster-wrapper', stopVideo);
	$('body').on('click', '.poster', playMobile);
	$('body').on('click', '.theme-switcher', toggleTheme);


	$(window).on('resize', () => {
		$(window).off('scroll');
		$(window).enllax();
		$(window).scroll();
		$('.lazy').lazy();
	});

	if ( $('#hero').length ){
		hero_video = new Clappr.Player({
			source: '/assets/video/header.mp4',
			parentId: '#player',
			width: '100%',
			height: '100%',
			mute: true,
			autoPlay: true,
			loop: true,
			chromeless: true
		})
	}
});

function toggleTheme(e){

	e.preventDefault();
	let theme = document.body.className == "dark" ? "light" : "dark";
	document.body.className = theme;
	this.className = 'theme-switcher ' + theme;
	setCookie('theme', theme, 7)
}

function setCookie(cName, cValue, expDays) {
	let date = new Date();
	date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
	const expires = "expires=" + date.toUTCString();
	document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

function getCookie(cName) {
	const name = cName + "=";
	const cDecoded = decodeURIComponent(document.cookie); //to be careful
	const cArr = cDecoded .split('; ');
	let res;
	cArr.forEach(val => {
		if (val.indexOf(name) === 0) res = val.substring(name.length);
	})
	return res;
}

function playVideo(){
	let video = this.querySelector('video');
	video.play();
}

function playMobile(){
	$('.poster').css({
		opacity: 1
	});
	$(this).css({
		opacity: 0
	});
	$(this).next()[0].play();
}

function stopVideo(){
	let video = this.querySelector('video');
	video.pause();
	video.currentTime = 0;
}

function animate(){

	let scrollPos = $('html,body').scrollTop();

	$('.scrolling-bg').each((index, el) => {

		let offset = $(el).data('offset') ? parseInt($(el).data('offset')) : 0;

		$(el).css({
			backgroundPosition: (scrollPos + offset) + 'px center'
		});
	});

	$('.scrolling-bg-reverse').each((index, el) => {

		let offset = $(el).data('offset') ? parseInt($(el).data('offset')) : 0;

		$(el).css({
			backgroundPosition: (0 - scrollPos - offset) + 'px center'
		});
	});

	$('.scrollingv').each((index, el) => {

		let offset = $(el).data('offset') ? parseInt($(el).data('offset')) : 0;
		let speed = $(el).data('speed') ? parseFloat($(el).data('speed')) : 0;
		let scrollTop = $('html,body').scrollTop();

		let pos = (scrollTop) / speed;

		$(el).css({
			backgroundPosition: 'center ' + pos + 'px'
		})

	});

	requestAnimationFrame(animate);
}