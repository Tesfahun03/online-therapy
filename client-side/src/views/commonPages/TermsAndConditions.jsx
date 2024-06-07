import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const TermsAndConditions = () => {
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={10}>
          <h1 className="text-center mt-5 mb-4">Terms and Conditions</h1>

          <h2>1. Introduction</h2>
          <p>Welcome to <strong>BunnaMind</strong>. These Terms and Conditions govern your use of our website, 
            mobile application, and other products and services provided by us. By accessing or 
            using our Services, you agree to be bound by these Terms and our Privacy Policy. If 
            you do not agree to these Terms, please do not use our Services.
          </p>

          <h2>2. User Accounts</h2>
          
          <h3>2.1. User Registration</h3>
          <p>To access certain features of our Services, you must register for an account. During 
            registration, you agree to provide accurate and complete information and keep this information 
            up-to-date. Each registration is for a single user only, unless expressly agreed otherwise by us.
          </p>
          
          <h3>2.2. Account Security</h3>
          <p>You are responsible for maintaining the confidentiality of your account login information and 
            for all activities that occur under your account. You agree to immediately notify us of any 
            unauthorized use of your account or any other breach of security.
          </p>
          
          <h3>2.3. Verification</h3>
          <p>Upon registration, you may be required to verify your email address. We will send a verification 
            link to the email address you provided during registration. You must click on the verification 
            link to complete the registration process. We reserve the right to disable any account that has 
            not been verified.
          </p>
          
          <h2>3. User Conduct</h2>

          <h3>3.1. Prohibited Activities</h3>
          <p>You agree not to engage in any of the following prohibited activities:</p>
          
          <div className='ms-4 mb-2'>
            <li>Using the Services for any illegal purpose or in violation of 
                any local, state, national, or international law.</li>
           
            <li>Posting or transmitting content that is infringing, libelous, defamatory,
                 abusive, offensive, obscene, or otherwise objectionable.</li>
            
            <li>Impersonating any person or entity, or falsely stating or otherwise 
                misrepresenting your affiliation with a person or entity.</li>     
          
            <li>Interfering with or disrupting the operation of the Services or 
                the servers or networks used to make the Services available.</li>      
           
            <li>Engaging in any activity that could damage, disable, overburden, or impair the Services.</li>
          </div>
                
                
          <h2>4. Intellectual Property</h2>
          
          <h3>4.1. Ownership</h3>
          <p>All content, features, and functionality available through our Services, including but not 
            limited to text, graphics, logos, icons, images, audio clips, video clips, data compilations, 
            software, and other materials are the property of <strong>BunnaMind</strong> or its licensors 
            and are protected by applicable intellectual property laws.</p>
          
          <h3>4.2. License</h3>
          <p>We grant you a limited, non-exclusive, non-transferable, and revocable license to 
            access and use the Services and the Content for your personal, non-commercial use, 
            subject to these Terms. You may not reproduce, distribute, modify, create derivative 
            works of, publicly display, publicly perform, republish, download, store, or transmit 
            any of the Content without our prior written consent.</p>

          <h2>5. Data Privacy</h2>
          <p>We respect your privacy and are committed to protecting your personal data. Our Privacy 
            Policy explains how we collect, use, and share information about you when you use our 
            Services. By using our Services, you consent to our collection and use of your data as 
            described in the Privacy Policy.</p>

          <h3>5.1. Use of Personal Information for Future Production</h3>
          <p>We may use your personal information, including but not limited to your usage data, 
            preferences, and interactions with the Services, for the purpose of improving and 
            enhancing our Services. This may include using machine learning and other data-driven 
            technologies to analyze and predict user behavior, personalize your experience, and 
            develop new features. By using our Services, you consent to such use of your personal 
            information.</p>

          <h2>6. Booking and Payment</h2>

          <h3>6.1. Appointments</h3>
          <p>Therapists may set their availability through our Services. Patients can book appointments 
            based on the available time slots. Once a time slot is booked, it will no longer be available 
            to other patients.</p>

          <h3>6.2. Payment</h3>
          <p>Patients are required to pay for appointments at the time of booking. Payment processing 
            services are provided by third-party payment processors. We are not responsible for any 
            errors or issues related to payment processing.</p>

          <h3>6.3. Cancellations and Refunds</h3>
          <p>Cancellation and refund policies for appointments may vary and will be clearly stated at 
            the time of booking. Please review these policies carefully before making a booking.</p>

          <h2>7. Disclaimers and Limitation of Liability</h2>

          <h3>7.1. Disclaimers</h3>
          <p>The Services are provided on an "as is" and "as available" basis. We make no representations 
            or warranties of any kind, express or implied, regarding the Services or the Content, including 
            but not limited to warranties of merchantability, fitness for a particular purpose, 
            non-infringement, or accuracy.</p>

          <h3>7.2. Limitation of Liability</h3>
          <p>To the maximum extent permitted by applicable law, we shall not be liable for any 
            indirect, incidental, special, consequential, or punitive damages, or any loss of 
            profits or revenues, whether incurred directly or indirectly, or any loss of data, 
            use, goodwill, or other intangible losses, resulting from (a) your use or inability 
            to use the Services; (b) any unauthorized access to or use of our servers and/or any 
            personal information stored therein; (c) any interruption or cessation of transmission 
            to or from the Services; (d) any bugs, viruses, trojan horses, or the like that may be 
            transmitted to or through the Services by any third party; (e) any errors or omissions 
            in any Content or for any loss or damage incurred as a result of your use of any Content 
            posted, emailed, transmitted, or otherwise made available through the Services; and/or 
            (f) the defamatory, offensive, or illegal conduct of any third party.</p>

          <h2>8. Indemnification</h2>
          <p>You agree to indemnify, defend, and hold harmless <strong>BunnaMind</strong>, its officers, directors, 
            employees, agents, licensors, and suppliers from and against all claims, liabilities, damages, 
            losses, costs, and expenses (including reasonable attorneys' fees) arising out of or related 
            to your use of the Services, your violation of these Terms, or your violation of any rights 
            of another.</p>

          <h2>9. Changes to the Terms</h2>
          <p>We may modify these Terms at any time. Any changes will be effective immediately upon posting 
            of the revised Terms on our website. Your continued use of the Services following the posting 
            of changes will constitute your acceptance of such changes.</p>

          <h2>10. Governing Law</h2>
          <p>These Terms and any dispute arising out of or related to these Terms or the use of the 
            Services will be governed by and construed in accordance with the laws of Ethiopia,
             without regard to its conflict of law principles.
          </p>

          <h2>11. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at:

            <ul className='list-unstyled ms-3'>
                <li><strong>BunnaMind</strong></li>
                <li>Email: <a href="mailto:bunnamind@gmail.com">bunnamind@gmail.com</a></li>
                <li>Adama, Ethiopia</li>
            </ul>

          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default TermsAndConditions;
