import "./Home.scss"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { SubHeading } from "../components/SubHeading "
import { Paragraph } from "../components/Paragraph"
import { OutSign } from "../components/OutSign"
import { animateScroll } from 'react-scroll';
import { useRef, useEffect } from "react"
import { createScope ,text, animate, stagger } from "animejs"

export function Home() {
	return (
		<div className="home">
			<HomeMain></HomeMain>
			<HomeCards></HomeCards>
		</div>
	)
}

// SECTIONS

function HomeMain() {

	const root = useRef(null);
	const scope = useRef(null);

	useEffect(() => {

		scope.current = createScope({ root }).add(self => {

			// Don't use this char option next time, it little bit cook the code
			const { chars } = text.split('.homeMain__heading', {
				chars: { wrap: 'clip' },
			});

			animate(chars, {
				y: [
					{ to: ['100%', '0%'] },
				],
				duration: 750,
				ease: 'outElastic(1, .6)',
				delay: stagger(40),
				loop: false,
			});

		});

		return () => scope.current.revert()

	}, []);

	return (
		<div className="homeMain" ref={root}>
			<h1 className="homeMain__heading">
				Počasovka
			</h1>
			<Button type="large" to="/game">Hrát</Button>
			<HomeMainScroll />
		</div>
	)
}

function HomeCards() {
	return (
		<div className="homeCards" id="informace">
			<Card>
				<div>
					<SubHeading>
						Jak hra funguje?
					</SubHeading>
					<Paragraph>
						Je to prosté &#45;&nbsp;cílem hry je si tipnout správnou aktuální teplotu v&nbsp;nejrůznějších částech světa. Hra ti zabere jen pár minut, protože na tebe čeká jen deset otázek. Po každé odpovědi na tebe čeká odměna ve formě bodů!
					</Paragraph>
				</div>
				<Button type="small" color="green" location="in" to="game">Hrát</Button>
			</Card>
			<Card>
				<div>
					<SubHeading>
						Data o počasí
					</SubHeading>
					<Paragraph>
						Aktuální data o&nbsp;počasí hra získává z&nbsp;Weather Forecast od API Open-Meteo. Pro přístup k&nbsp;API není potřeba API klíč.
					</Paragraph>
				</div>
				<Button type="small" color="blue" location="in" target="_blank" to="https://open-meteo.com/">Open-Meteo<OutSign /></Button>
			</Card>
			<Card>
				<div>
					<SubHeading>
						Open source
					</SubHeading>
					<Paragraph>
						Projekt má otevřený zdrojový kód a&nbsp;je licencovaný od Unlicense licencí. Zdrojový kód můžeš nalézt v&nbsp;repozitáři na GitHub.
					</Paragraph>
				</div>
				<Button type="small" color="blue" location="in" target="_blank" to="https://github.com/k4mmi/pocasovka">GitHub<OutSign /></Button>
			</Card>
			<Card>
				<div>
					<SubHeading>
						O projektu
					</SubHeading>
					<Paragraph>
						Webová aplikace je udělána přes Javascript framework zvaný React. Dále projekt používá na stylování SASS a&nbsp;pro animaci AnimeJS. Postava mráčku se jmenuje Alex.
					</Paragraph>
					<br />
					<img className="homeCards__aboutImage" src="../../assets/illu-surp.svg" loading="lazy" fetchPriority="high" />
				</div>
			</Card>
		</div>
	);
}

// LOCAL COMPONENTS

function HomeMainScroll() {

	function _scroll() {
		return animateScroll.scrollMore(innerHeight / 5 * 4);
	}

	return (
		<a className="homeMainScroll" to="info" onClick={_scroll}>
			<img src="../../assets/scroll.svg" alt="Dolů" width="30px" loading="lazy" fetchPriority="high" />
		</a>
	);
}