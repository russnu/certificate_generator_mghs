import styles from './Welcome.module.css'
import QuickActionButtons from './QuickActionButtons'
function Welcome() {

    return (
        <>
            <div className={styles.parentContainer}>
                <p><b>Welcome to the Certificate Management Platform!</b></p>
                <p>Here, you have full control over generating, managing, and verifying certificates for our interns.</p>
                <p><b><i>Use the quick actions below to get started:</i></b></p>
                <ul>
                    <li>
                        <p><b>Generate a New Certificate:</b> Create certificates effortlessly with our intuitive form and preview features.</p>
                    </li>
                    <li>
                        <p><b>View Certificates:</b> Access and manage your generated certificates, including editing and exporting as needed.</p>
                    </li>
                    <li>
                        <p><b>Verify Certificate:</b> Validate the authenticity of any certificate by entering its unique ID.</p>
                    </li>
                </ul>

                <QuickActionButtons />

                <p>Stay updated with recent activities and keep track of your certification process with ease. If you need any assistance, 
                    feel free to navigate to the Settings page or reach out to support.</p>

            </div>
        </>
    )

}

export default Welcome