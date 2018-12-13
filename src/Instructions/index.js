import React from "react";

const Instructions = props => {
    return (
        <div>
            <button
                type="button"
                className="btn btn-success"
                data-toggle="modal"
                data-target="#exampleModal"
            >
                ABOUT
            </button>

            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                About:
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>
                                Inspired by Quintron's{" "}
                                <b>
                                    <i>Weather Warlock</i>
                                </b>
                                . I first heard his invention when he placed one
                                in upstate New York at WGXC's Wave Farm, where I
                                had a monthly radio show for some time. More
                                information on his invention can be found
                                <a href="https://wavefarm.org/ta/works/g7yqrm">
                                    {" "}
                                    here.
                                </a>
                            </p>
                            <p>
                                This is an app that sonifies real time weather
                                data taken from the Open Weather Map, and
                                sonifies it using the Web Audio API. You input
                                your city and country, and the weather
                                information will appear to the right. City
                                names, especially in the United States, are
                                often repeated (ie. the town of Springfield
                                exists in 34 states); so also included is an
                                option to find weather data by ZIP CODE. Simply
                                enter the information, press the{" "}
                                <b>'Get Weather'</b> button, and then if you
                                wish to hear its sound,press the <b>SONIFY</b>{" "}
                                button.
                            </p>
                            <p>
                                Specific data points are assigned to a
                                functioning bank of oscillators and filters. For
                                example, temperature reads the frequency of one
                                tone, while % of cloud cover is connected to
                                another; wind speed is related to filter
                                resonance, and so on. There are also assignments
                                for latitude and longitude, which can change
                                quite drastically when crossing hemispheres.
                            </p>
                            <p>
                                <b>
                                    Watch the volume on your
                                    speakers/headphones!
                                </b>{" "}
                                Some data can cause the sound bank to feedback
                                when certain combinations of weather are met. It
                                is a beautiful phenomenon, but can certainly
                                hurt your ears! Depending on your computer
                                hardware, the sound may also be very quiet if
                                played from internal speakers on laptops.
                            </p>
                            <a
                                href="https://github.com/daniel-mckemie/weather-sonification"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Source Code on Github
                            </a>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Instructions;
