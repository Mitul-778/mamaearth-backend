const User = require("../models/user.model");
const jwtoken = require("jsonwebtoken");
const transporter = require("../configs/mail");
require("dotenv").config();

const generateToken = (user) => {
  return jwtoken.sign({ user } , `mamaearth`);
};

const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      return res.status(500).send("User already exists");
    }

    user = await User.create(req.body);

    const token = generateToken(user);
    
    transporter.sendMail({
      from: "MamaEarth",
      to: user.email,
      subject: `Welcome to MamaEarth ${user.first_name} ${user.last_name}`,
      html: `
      <center>
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
                > MamaEarth : Goodness Inside</span
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
                    alt="Mamaearth"
                    class="CToWUd"
                  />
                </a>
              </h1>
              <h1 class="m_-7373064222375084159greeting">
                Hello,&nbsp; ${user.first_name}
              </h1>
              <p>Thank you for Registering with Us !</p>
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
              <p>Sincerely,<br />Team MamaEarth</p>
            </td>
          </tr>
        </tbody>
      </table>
    </center>`,
    });

    return res.status(200).send({ user, token });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};



const login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    console.log(req.body.email);
    if (!user) {
      return res.status(400).send("Wrong Email or Password");
    }
    const match = user.checkPassword(req.body.password);

    if (!match) {
      return res.status(400).send({ message: "Wrong Email or Password" });
    }

    const token = generateToken(user);
    return res.status(200).send({ user, token });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

module.exports = { register, login, generateToken };