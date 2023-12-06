import React from 'react';
import "./styles.css";
import { useNavigate } from 'react-router-dom';

export const Team = () => {
    const navigate = useNavigate();

    return (
        <div className='TeamPage'>
            <header>
                <h1>RideLog Team Page</h1>
                <nav>
                    <button onClick={() => navigate(-1)}>Return</button>
                </nav>
            </header>

            <section>
                <div className="team-content">
                    <h2>Meet the Team</h2>

                    <div className='team-grid'>

                        <div className="team-member">
                            <h3>Ali - Lead Developer</h3>
                            <p>
                                Ali takes the helm as our Lead Developer, guiding our team with technical expertise and a commitment to excellence. With a proven track record in Tech, Ali leads the charge in building a robust and user-friendly vehicle expense tracker.
                            </p>
                        </div>

                        <div className="team-member">
                            <h3>Shuyun - Developer</h3>
                            <p>
                                Shuyun brings valuable technical skills to our team, contributing to the development and enhancement of our vehicle expense tracker. With a passion for coding and problem-solving, Shuyun plays a crucial role in bringing our product to life.
                            </p>
                        </div>

                        <div className="team-member">
                            <h3>Yaness - Developer</h3>
                            <p>
                                Yaness is a key member of our development team, bringing expertise in Cloud Deployment. With a focus on innovation, Yaness contributes to the continuous improvement of our vehicle expense tracking solution.
                            </p>
                        </div>

                        <div className="team-member">
                            <h3>Oscar - Developer</h3>
                            <p>
                            Oscar is a skilled developer who plays a vital role in shaping the functionality and features of our vehicle expense tracker. With a keen eye for detail and a commitment to quality, Oscar ensures that our product meets the highest standards.
                            </p>
                        </div>
                    </div>
                    <div className="team-member center-bottom">
                            <h3>Renard - Developer</h3>
                            <p>
                                Renard is an integral part of our development team, bringing enthusiasm and expertise to the table. With a background in HTML and CSS, Renard contributes to the success of our vehicle expense tracker through innovative coding and problem-solving.
                            </p>
                        </div>
                </div>
            </section>
        </div>
    );
}
