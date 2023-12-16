import React from 'react';
import "./styles.css";
import { useNavigate } from 'react-router-dom';

export const Team = () => {
    const navigate = useNavigate();

    return (
        <div className='TeamPage'>
            <header>
                <h1>TEAM's  &nbsp;PAGE</h1>
                <nav>
                    <button onClick={() => navigate(-1)}>Return</button>
                </nav>
            </header>

            <section>
                <div className="team-content">
                    <h3>Meet the Team</h3>

                    <div className='team-grid'>

                        <div className="team-member">
                            <h3>Ali - Lead Developer</h3>
                            <p>
                                Ali takes the helm as our Lead Developer, guiding our team with technical expertise and a commitment to excellence. With a proven track record in Tech, Ali leads the charge in building a robust and user-friendly vehicle expense tracker.
                            </p>
                        </div>

                        <div className="team-member">
                            <h3>Sania - Scrum Master</h3>
                            <p>
                                Sania brings valuable agile skills to our team, contributing to the development and enhancement of our vehicle expense tracker. With a passion for coding and problem-solving, Shuyun plays a crucial role in bringing our product to life.
                            </p>
                        </div>

                        <div className="team-member">
                            <h3>Resham - Finance</h3>
                            <p>
                                Resham is a key member and finance manager at our team. With a focus on innovation, Resham contributes to the continuous improvement of finance and expenses related our vehicle expense tracking solution.
                            </p>
                        </div>

                        <div className="team-member">
                            <h3>Simran - Marketing Head</h3>
                            <p>
                            Simran is a skilled marketing person. With a keen eye for detail and a commitment to quality, Simran ensures that our product meets the highest standards.
                            </p>
                        </div>
                    </div>
                    <div className="team-member center-bottom">
                            <h3>Srujan - Developer </h3>
                            <p>
                                Srujan is an integral part of our development team, bringing enthusiasm and expertise to the table. With a background in HTML and CSS, Srujan contributes to the success of our vehicle expense tracker through innovative coding and problem-solving.
                            </p>
                        </div>
                </div>
            </section>
        </div>
    );
}
