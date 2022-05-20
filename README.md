
<div id="top"></div>

<!-- PROJECT LOGO -->
<br/>
<div align="center">
  <a href="https://github.com/BigYusuf/Ademotor-cars">
    <h1 align="center"style="color:black;">Ade<span style="color:yellow;">Motor</span></h1>
  </a>

  <p align="center">
    Ademotor Ecommerce website
    <br />
    <a href="https://github.com/BigYusuf/Ademotor-cars"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://car-shop-ademoto.herokuapp.com/">View Demo</a>
    ·
    <a href="https://github.com/BigYusuf/Ademotor-cars/issues">Report Bug</a>
    ·
    <a href="https://github.com/BigYusuf/Ademotor-cars/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#features">Unique Features</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Desktop Mode][product-screenshot]](https://car-shop-ademoto.herokuapp.com/)

This project is an ecommerce website. which describes the services Ademotor car selling company and their locations.

[![Mobile screen][product-screenshot2]](https://car-shop-ademoto.herokuapp.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

Here are the list of major frameworks/ libraries used to bootstrap this project

- [React.js](https://reactjs.org/)
- [Node JS](https://www.nodejs.org/)
- [MongoDB Mongoose](https://www.mongoDB.com/)
- [NodeMailer](https://nodemailer.com/)
- [JsonWebToken](https://jwt.io/)
- [Firebase](https://firebase.google.com/)
- [Paypal](https://www.paypal.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

### Features

This is a a list of unique features this project comprise of;

- Simple design ecommerce website
- Very easy to use web application
- The web application sends order mails on successful order of a product
- The web application is responsive
- The web application is equipped with fast and reliable database

#### Order Email

[![Sample Email][product-screenshot3]](https://car-shop-ademoto.herokuapp.com/)

#### Database storage

[![Sample Database][product-screenshot4]](https://car-shop-ademoto.herokuapp.com/)

#### Elegant design

[![Mobile][product-screenshot5]](https://car-shop-ademoto.herokuapp.com/)

#### Sign and Registration

[![Mobile][product-screenshot6]](https://car-shop-ademoto.herokuapp.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm

  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo

   ```sh
   git clone https://github.com/BigYusuf/Ademotor-cars.git
   ```

2. Install NPM packages backend

   ```sh
   npm install
   ```

3. Install NPM packages frontend

   ```sh
   cd API
   cd frontend
   npm install
   ```

4. Enter your KEYS in `.env`

   ```javascript
   MONGO_URL = "ENTER YOUR MONGODB URI";
   PORT = "ENTER YOUR PORT NUMBER";
   JWT_SECRET = "ENTER YOUR JWT SECRET";
   JWT_EXPIRES_TIME = "ENTER YOUR JWT EXPIRY TIME";
   PAYPAL_CLIENT_ID="ENTER YOUR PAYPAL CLIENT ID";
   PAYPAL_SECRET="ENTER YOUR PAYPAL SECRET"
   USER_EMAIL="ENTER ORDER ADMIN EMAIL FOR SECURE GMAIL NODEMAILER SETUP"
   CLIENT_ID="ENTER CLIENT ID FOR SECURE GMAIL NODEMAILER SETUP"
   CLIENT_SECRET="ENTER CLIENT SECRET FOR SECURE GMAIL NODEMAILER SETUP"
   REDIRECT_URI= "ENTER YOUR REDIRECT URI FOR SECURE GMAIL NODEMAILER SETUP"
   REFRESH_TOKEN= "ENTER REFRESH TOKEN FOR SECURE GMAIL NODEMAILER SETUP"
   ```

5. Search for `axiosinstance.`, then remove the // from `//import Axios from 'axios';` then add // to `import {axiosInstance} from '../config.js';`. Most of files containing the searched key word can be found in the actions folder

   ```javascript
   //import Axios from 'axios';
   import {axiosInstance} from '../config.js';
   ```

  [![Mobile][product-screenshot7]](https://car-shop-ademoto.herokuapp.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Here are some useful Account to consider while testing the web application
For Admin priviledges:

```javascript
  email: `admin@example.com`
  password: `123456`
```

For other users:
you can just sign in with a fake email and choose any password of your chosen. just for testing, you just use the following accounts
```javascript
  email: `yusuf@example.com`
  password: `123456`

```

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Design Web application
  - [x] Create React App
  - [x] Create all components and pages
  - [x] Create css for the enrichment of the application
  - [x] Create dummydata for testing of web application
- [x] Create Backend
- [x] Link to MongoDB
- [x] Create constants, actions, reducers
- [x] Add Send Email functionality
- [x] Add Codes to github
- [x] Add / update Project Readme file
- [x] Host website on heroku
- [ ] Filter and sort products design
- [ ] Create well detail report on Project (Documentation)
- [ ] Test functionality of website and its limits
- [ ] Host website on custom domain
- [ ] Continuous update and linking to blog post

See the [open issues](https://github.com/BigYusuf/Ademotor-cars/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Yusuf Lateef - [Connect via Messenger](http://m.me/Bigyusufff/) - yusuflateef0000@gmail.com mystik5551@gmail.com

Project Link: [https://github.com/BigYusuf/Ademotor-cars](https://github.com/BigYusuf/Ademotor-cars)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Here are the list of resources I find helpful and would like to give credit to.

- [The Net Ninja (Youtube Channel) - All about firebase 9](https://www.youtube.com/watch?v=9zdvmgGsww0)
- [Best ReadMe Template](https://github.com/othneildrew/Best-README-Template)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/BigYusuf/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/BigYusuf/Ademotor-cars/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/BigYusuf/Ademotor-cars.svg?style=for-the-badge
[forks-url]: https://github.com/BigYusuf/Ademotor-cars/network/members
[stars-shield]: https://img.shields.io/github/stars/BigYusuf/Ademotor-cars.svg?style=for-the-badge
[stars-url]: https://github.com/BigYusuf/Ademotor-cars/stargazers
[issues-shield]: https://img.shields.io/github/issues/BigYusuf/Ademotor-cars
[issues-url]: https://github.com/BigYusuf/Ademotor-cars/issues
[license-shield]: https://img.shields.io/github/license/BigYusuf/Ademotor-cars.svg?style=for-the-badge
[license-url]: https://github.com/BigYusuf/Ademotor-cars/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/bigyusufff
[product-screenshot]: images/ademotor1.png
[product-screenshot2]: images/allProducts.png
[product-screenshot3]: images/emailsample.png
[product-screenshot4]: images/mongodb.png
[product-screenshot5]: images/dropdown.png
[product-screenshot6]: images/login.png
[product-screenshot7]: images/axiosinstance.png
