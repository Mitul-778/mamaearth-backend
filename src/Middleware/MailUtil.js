const transporter = require("../configs/mail");

const sendOTP = async(user, OTP)=>{
    await transporter.sendMail({
        from:`care@mamaearth.in`,
        to :user.email,
        subject :`mamaEarth : Payment OTP`,
        html : `<center>
        <table
          style="
            background: #ffffff;
            width: 600px;
            color: black;
            text-align: center;
          "
        >
          <tbody>
            <tr>
              <td>
                <span
                  style="
                    display: block;
                    background: skyblue;
                    color: white;
                    padding: 6px 0;
                    font-size: 20px;
                  "
                  >MamaEarth : Goodness Inside</span
                >
                <h1 style="text-align: center">
                  <a
                    style="border-style: none"
                    border="0"
                    href="https://mamaearth.in/"
                    target="_blank"
                    data-saferedirecturl="https://mamaearth.in/"
                  >
                    <img
                      src="https://mamaearthp.imgix.net/wysiwyg/mamaearth-logo.png?auto=format&fit=scale"
                      alt="mamaEarth"
                      class="CToWUd"
                    />
                  </a>
                </h1>
                <h1 class="m_-7373064222375084159greeting">
                  Hello,&nbsp; ${user.firstName}
                </h1>
                <p>Thank you for Purchasing the Course !</p>
                <p>OTP for Payment is : <b> ${OTP}</b></p>
                <p>Happy Shopping !</p>
                <p>
                  For questions, please visit our
                  <a
                    href="https://mamaearth.in/questions-2"
                    target="_blank"
                    data-saferedirecturl="https://mamaearth.in/questions-2"
                    >FAQ page</a
                  >
                  or contact us at
                  <a href="https://mamaearth.in/contact-us" target="_blank"
                    >care@mamaearth.in</a
                  >.
                </p>
                <p>Sincerely,<br />mamaEarth Team</p>
              </td>
            </tr>
          </tbody>
        </table>
      </center>`
    })
}

module.exports = sendOTP