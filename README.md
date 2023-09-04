<div id="readme-top"></div>

<br>
<br>

<h2 align="center"> Employee Madness </h2>
  <br>
<p align="center">
    An Enterprise resource planning application
    <br>
    <br>
    <a href="https://github.com/CodecoolGlobal/the-employee-madness-react-CsongorD"><strong>Explore the docs :arrow_right:	</strong></a>
    <br />
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
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
<div id="about-the-project"></div>

## About The Project :page_with_curl:

<br />
Employee Madness is a software solution designed to facilitate and manage various business processes and functions within an organization.
<br />
<br />

<br />
<p align="right">(<a href="#readme-top">back to top</a>)</p>


<div id="built-with"></div>

### Built With :wrench:

* [![React][React.img]][React-url]
* [![Express][Express.img]][Express-url]
* [![Node][Node.img]][Node-url]
* [![Mongo][Mongo.img]][Mongo-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
<div id="getting-started"></div>

## Getting Started :arrow_forward:

<div id="prerequisites"></div>

### Prerequisites :ballot_box_with_check:

To run this project, you need to have the following:

:one: React.js <br>
:two: Express.js  <br>
:three: Node.js <br>
:four: MongoDB <br>

<div id="installation"></div>

## Installation :floppy_disk:

### Server side

#### Install dependencies

```bash
cd ./server
npm install
```

#### .env file

Copy the .env.sample as .env and fill up the environment variable for your personal mongodb connection url.

#### Prepare the database

```bash
cd ./server
npm run populate
```

**populate command** will run the populate.js file as a script and it will generate a buch of starter data for your
database.

#### Running the code

```bash
cd ./server
npm run dev
```

It will start the server with nodemon. So it will watch the changes and restart the server if some ot the files changed.

#### Testing with test.http

If you like to try the endpoints of the rest api, you can check the test.http file for urls are should work on your
environment as well. And if you install
the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extenstion for vscode you can
actually run those in your editor.

### Client side

#### Install dependencies

```bash
cd ./client
npm install
```

#### Proxy

Watch for the port of your rest api. By default it will bind on port 8080 and the frontend proxy settings also depend on
this configuration. If you for some reasons change the port of the backend, don't forget to change the
./client/package.json proxy settings as well.

#### Running the code

```bash
cd ./client
npm start
```

And the create-react-app react-scripts package will start your frontend on the 3000 port and you can visit
the http://localhost:3000 on your preferred browser.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
<div id="usage"></div>

## Usage :joystick:

This is an ERP application.
You can add, remove, manage employees,equipments,divisions.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
<div id="contact"></div>

## Contact

:envelope:    **Deák Csongor** - deak.csongor1@gmail.com &nbsp;&nbsp;&nbsp;&nbsp; :point_right:
&nbsp;&nbsp;&nbsp;&nbsp; [![Csongor's LinkedIn][linkedin-shield]][LinkedIn - Csongor]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-url]: https://linkedin.com/in/linkedin_username

[LinkedIn - Csongor]: https://www.linkedin.com/in/csongor-deak/

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555

[React.img]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB

[React-url]: https://react.dev/

[Express.img]:https://img.shields.io/badge/express-white?style=for-the-badge&logo=express&logoColor=61DAFB

[Express-url]:https://expressjs.com/

[Node.img]:https://img.shields.io/badge/node-js?style=for-the-badge&logo=node.js&logoColor=61DAFB

[Node-url]:https://nodejs.org/en

[Mongo.img]:https://img.shields.io/badge/mongo-db?style=for-the-badge&logo=mongodb&logoColor=61DAFB

[Mongo-url]:https://www.mongodb.com/
