import "./OutSign.scss"

export function OutSign({ width = "16px" }) {
    return (
        <img className="outSign" src="../../assets/out.svg" width={width} loading="lazy" fetchPriority="high"/>
    )
}