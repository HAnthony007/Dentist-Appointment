
const FooterPage = () => {
    return (
        <div className="footer d-grid gap-3 justify-content-between mb-3 w-100">
            <div className="d-flex h-100 align-items-center footerFlex">
                <h3>Be Nify</h3>
                <p className="d-flex">
                    Copyright © {(new Date().getFullYear())}. Tous droits reserves.
                </p>
            </div>
            <div className="d-grid text-center gap-1">
                <a>Mention legale</a>
                <a>Politique relative a la protection des donnees personnelles</a>
            </div>
        </div>
    )
}

export default FooterPage