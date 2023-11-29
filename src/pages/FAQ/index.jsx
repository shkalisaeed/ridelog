import React from 'react';
import "./styles.css";
import { Link, useNavigate } from 'react-router-dom';

export const YourComponent = () => {
    const navigate = useNavigate();

    const toggleAnswer = (element) => {
        const answer = element.nextElementSibling;
        answer.classList.toggle("active");
    };

    return (
        <>
            <header>
                <h1>FAQ Page</h1>
                <nav>
                    <button onClick={() => navigate(-1)}>Return</button>
                </nav>
            </header>

            <section>
                <div className="faq-item">
                    <div className="question" onClick={(e) => toggleAnswer(e.target)}>Q1: What features does RIDELOG offer?</div>
                    <div className="answer">A1:Ridelog is designed to help users monitor and manage their expenses related to owning and operating a vehicle. Ridelog offers vehicle information management, expense logging, mileage tracking, and expense reporting and analytics.</div>
                </div>
            </section>

            <section>
                <div className="faq-item">
                    <div className="question" onClick={(e) => toggleAnswer(e.target)}>Q2: Is my data secure in RIDELOG?</div>
                    <div className="answer">A2:

Yes, your data is secure in the vehicle expense tracker built on Firebase. Firebase implements robust security measures to ensure the confidentiality, integrity, and availability of your data. Here are some key security features:

· Data Encryption

Firebase encrypts data both in transit and at rest. This means that your data is protected while being transmitted over the internet and when stored in Firebase's servers.

· Access Control

With Firebase's security rules, you can define granular access control policies. These rules allow you to specify who can read and write data, based on user authentication, user roles, or other custom attributes. This ensures that each user can only access the data they are authorized to see or modify.

· Firebase Security Audit

Firebase undergoes regular security audits and assessments to ensure compliance with industry best practices. This helps identify and address any potential vulnerabilities, further enhancing the security of your data.

· Firebase's Infrastructure Security

Firebase's infrastructure is designed to be highly secure, with measures in place to protect against unauthorized access, data breaches, and denial-of-service attacks.
            </div>
            </div>
            </section>

            <section>
                <div className="faq-item">
                    <div className="question" onClick={(e) => toggleAnswer(e.target)}>Q3: What is the maximum you can claim for car expenses?</div>
                    <div className="answer">A3:

You will be able to use the 2023/2024 per km rate to claim up to 5000 business kilometres you`ve driven throughout the 2023/2024 tax year as a tax deduction.

Note that you won`t be able to claim other vehicle expenses, as the rate is meant to cover all running costs of your vehicle, including depreciation. A higher per km rate for the new tax year will mean you can get a higher deduction at tax time for the kilometres you travel for work.</div>
                </div>
            </section>

            <section>
                <div className="faq-item">
                    <div className="question" onClick={(e) => toggleAnswer(e.target)}>Q4: What is 2023/2024 ATO cents per km rate?</div>
                    <div className="answer">A4:

The cents per km rate is set each year by the ATO. The newly confirmed rate for the 2023/2024 tax year is $0.85 per business-related kilometre. The rate is meant to cover all expenses of owning and running your vehicle for the business portion of its use.</div>
                </div>
            </section>

            <section>
                <div className="faq-item">
                    <div className="question" onClick={(e) => toggleAnswer(e.target)}>Q5: What does the cents per km cover?</div>
                    <div className="answer">A5:

The cents per kilometre rate is meant to cover all costs you've incurred driving your vehicle for business purposes. These include fixed costs such as road tax, insurance and depreciation, and variable costs such as fuel, maintenance and repairs and tyres.</div>
                </div>
            </section>

            <section>
                <div className="faq-item">
                    <div className="question" onClick={(e) => toggleAnswer(e.target)}>Q6: How to calculate deduction for vehicle expenses?</div>
                    <div className="answer">A6:

You use either of 2 methods to calculate deductions for car expenses:

· Cents per kilometre method

· Logbook method.

If you are claiming car expenses for more than one car, you can use a different method for each car. You can also change the method you use in different income years for the same car.</div>
                </div>
            </section>

            <section>
                <div className="faq-item">
                    <div className="question" onClick={(e) => toggleAnswer(e.target)}>Q7: What are work-related travels?</div>
                    <div className="answer">A7:

You can claim a tax deduction for the cost of transport on trips to:

· perform your work duties – for example, if you travel from your regular place of work to meet with a client

· attend work-related conferences or meetings away from your regular place of work

· deliver items or collect supplies

· go between 2 or more separate places of employment, such as if you have more than one job (but not if one of the places is your home)

· go from your regular place of work to an alternative place of work that isn't a regular place of work (for example, a client's premises) while still on duty, and back to your regular place of work or directly home</div>
                </div>
            </section>
        </>
    );
}
