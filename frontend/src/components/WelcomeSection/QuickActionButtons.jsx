import { Link } from "react-router-dom";
import styles from './Welcome.module.css'

function QuickActionButtons() {

    return (
        <>
            <div className = {styles.buttonsContainer}>

                <Link to={'/generate'}>
                    <button>Generate Certificates</button>
                </Link>

                <Link to={'/certificates'}>
                    <button>View Certificates</button>
                </Link>

                <Link to={'/verify'}>
                    <button>Verify Certificate</button>
                </Link>

            </div>
        </>
    )

}

export default QuickActionButtons