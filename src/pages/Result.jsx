import "./Result.scss"
import { useLocation } from "react-router";
import { Paragraph } from "../components/Paragraph";
import { Button } from "../components/Button";
import { useRef, useEffect } from "react";
import { createScope, utils, animate } from "animejs";

export function Result() {

	// Handle params
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const scoreHandle = queryParams.get('score');

	const root = useRef(null);
	const scope = useRef(null);
	let birdStatus;

	if (Number(scoreHandle) >= 500) {
		birdStatus = "good"
	} else {
		birdStatus = "bad"
	}

	useEffect(() => {

		scope.current = createScope({ root }).add(self => {

			animate(root.current, {
				innerHTML: scoreHandle,
				modifier: utils.round(0),
				duration: 800,
			});

		});

		return () => {
			scope.current.revert();
		};

	}, []);

	return (
		<div className="result">
			<div className="result__resultWrapper">
				<Paragraph>
					Tvoje skóre:
				</Paragraph>
				<span className="result__score" ref={root}>
					0
				</span>
			</div>
			<div className="result__buttonWrapper">
				<Button color="white" to="/">
					Zpátky
				</Button>
				<Button color="green" to="/game">
					<img src={`../../assets/illu-${birdStatus}.svg`} alt="Mrak Alex" className="result__illustration" loading="lazy" fetchPriority="high" />
					Hrát znovu
				</Button>
			</div>
		</div>
	);
}