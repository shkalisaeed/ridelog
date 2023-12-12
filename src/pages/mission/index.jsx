import React from 'react';
import "./styles.css";
import { Link, useNavigate } from 'react-router-dom';

export const Mission = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className='Mission'>
                <header>
                    <h1>VISION   &nbsp;&   &nbsp;MISSION   &nbsp;STATEMENT</h1>
                    <nav>
                        <button onClick={() => navigate(-1)}>Return</button>
                    </nav>
                </header>

                <section>
                    <div className="vision-mission-content">
                        <h3>Vision Statement:</h3>
                        <p>
                            To be the leading force in transforming the way people perceive and manage vehicle expenses globally. We envision a future where every individual and organization effortlessly navigates the intricate landscape of transportation costs through our intuitive and comprehensive solutions. By fostering a culture of continuous innovation, reliability, and customer-centricity, we strive to become the go-to platform that empowers users to make informed decisions, maximize savings, and achieve financial success in their vehicular journeys.
                        </p>

                        <h3>Mission Statement:</h3>
                        <p>
                            At RideLog, our mission is to empower individuals and businesses by revolutionizing how they manage their vehicle expenses. We are committed to providing innovative and user-friendly solutions that streamline the tracking and optimization of transportation-related costs. By harnessing cutting-edge technology, we aim to simplify the complexities of expense management, saving time and resources while fostering financial transparency and efficiency.
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
}
