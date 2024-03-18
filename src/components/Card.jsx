import '../stylesheet/Card.css'


const Card = ({ bgColor, waitingCalls }) => {

    return (
        <div className="card-container">
            <div className="card" style={{ background: bgColor }}>
                <div className="card-title">
                    <h3 style={{color: "white"}}>Calls in Queue</h3>
                </div>
                <div className="card-body">
                    <h2 style={{color: "white"}}>{waitingCalls}</h2>
                </div>
            </div>
        </div>
    )
}

export default Card