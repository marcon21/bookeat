import MenuItem from "./MenuItem"

export default function MenuSections() {
    return (
        <>
        <div className="row">
            <h2>Terra</h2>
            <div className="row">
                <div className="col mt-3">
                    <MenuItem name={"Spaghetti MeatBall"} description={"Lorem Ipsum"} price={10} />
                </div>
                <div className="col mt-3">
                    <MenuItem name={"Spaghetti Scoglio"} description={"Lorem Ipsum"} price={15} />
                </div>
                <div className="col mt-3">
                    <MenuItem name={"Spaghetti Scoglio"} description={"Lorem Ipsum"} price={15} />
                </div>
            </div>
        </div>
        <br />
        <div className="row">
            <h2>Mare</h2>
            <div className="row">
                <div className="col mt-3">
                    <MenuItem name={"Spaghetti Scoglio"} description={"Lorem Ipsum"} price={15} />
                </div>
            </div>
        </div>
        </>
    )
}