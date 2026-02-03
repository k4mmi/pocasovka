import "./NotFound.scss"
import { Heading } from "../components/Heading"

export function NotFound() {
  return (
    <div className="notFound">
      <img className="notFound__image" src="../../assets/illu-errbird.svg" alt="Hmmmm, chyba?" loading="lazy" fetchPriority="high"/>
      <Heading>
        NotFound
      </Heading>
    </div>
  );
}