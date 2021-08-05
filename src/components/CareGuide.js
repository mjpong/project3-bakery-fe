import React from "react"

export default function CareGuide() {

    return (
        <React.Fragment>
            <div className="care-guide-wrapper row p-3 mt-3">
                <h1 className="care-title text-center"> Roll With Me Care Guide </h1>
                <div className="row">
                    <div className="col-sm-6 col-12 p-3 care-guide-text">
                        <p>
                            There’s nothing like the smell of freshly baked cinnamon rolls.
                            But, what happens when you can’t eat them all yourself?
                            There’s a bit of an art to cinnamon roll storage.
                            If done improperly, they’ll dry out.
                            Follow the below tips on how to store cinnamon rolls, and you’ll be sure to have a moist treat for weeks to come!
                            Upon delivery, you can keep them at room temperature for a few days. Place the unfinished cinnamon rolls on a plate and cover with tin foil.
                            Set aside until you’re ready to chow down.
                            For the quickest reheat, spread butter over each cinnamon roll and microwave for 1 minute on high.
                            Finished cinnamon rolls should keep covered at room temperature for 2-3 days.
                        </p>
                    </div>
                    <div className="col-sm-6 col-12 care-guide-image p-3">
                        <img src={require("../images/hero.jpeg").default} width="100%" height="100%" alt="care-guide" />
                    </div>

                </div>
            </div>
        </React.Fragment>

    )


}