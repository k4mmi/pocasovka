import "./Card.scss"

export function Card({ children }) {
    return (
        <section className="card">
            {children}
        </section>
    )
}