# Priyadharshan Portfolio

**I build things that work.**  
Turning ideas into real-world software.

A personal portfolio for job opportunities and freelance collaborations, showcasing my development skills, platform integration work, and approach to building complete applications.

![Current portfolio homepage](portfolio-preview.png)

## About

I'm M. Priyadharshan, a developer based in India. My interests span Python application development, API integrations, data migration, cloud infrastructure, and deployment automation.

The About section highlights my work on DataGrine, including helpdesk migrations for Freshdesk, Intercom, Zendesk, and Salesforce, with Outlook and Gmail migrations in progress.

## Features

- Responsive layout with a transparent floating navigation bar and mobile menu.
- Animated name and rotating professional roles.
- Interactive particle swarm that follows the cursor and responds to controls.
- Grouped skill cards with technology icons, hover colors, and revealing labels.
- Project cards reserved for upcoming project details.
- Contact details and an email draft form.
- Interactive falling text in the Skills and Technology footer.
- Keyboard navigation and reduced-motion support for custom animations.

## Built with

HTML, CSS, and vanilla JavaScript, with WebGL for the swarm animation, the Web Animations API for text transitions, Matter.js for footer physics, and AOS for scroll animations. Technology icons include Devicon assets.

This is a static website. No build step, package installation, or application server is required.

## Run locally

1. Download or clone this repository.
2. Open the project folder in Visual Studio Code.
3. Start Live Server from `priyadharshan-portfolio/index.html`.
4. Open the local address shown by Live Server.

Alternatively, if Python is installed, run this command from the repository root:

```sh
python -m http.server 5500
```

Then visit [the local portfolio](http://localhost:5500/priyadharshan-portfolio/).

An internet connection is needed to load the AOS stylesheet and script from their CDN.

## Project structure

```text
Portfolio/
├── README.md
├── LICENSE
├── portfolio-preview.png                 # Current homepage screenshot
└── priyadharshan-portfolio/
    ├── index.html             # Page content and sections
    ├── style.css              # Layout, styling, and hover effects
    ├── script.js              # Navigation and contact interactions
    ├── swarm-cursor.js        # Interactive particle animation
    ├── rotating-role.js       # Rotating role text
    ├── falling-footer.js      # Footer physics and interactions
    └── assets/
        ├── icon/              # Technology and platform icons
        ├── images/            # Profile and project visuals
        └── vendor/            # Local third-party scripts
```

## Current status

Project cards currently display **Updating Project Soon**. Project descriptions, repository links, and demos will be added when ready.

The contact form opens a prefilled draft in the visitor's configured email application. It does not send messages directly; the visitor reviews and sends the draft from their email app.

## Contact

- **Email:** [priyadharshan.exe@gmail.com](mailto:priyadharshan.exe@gmail.com)
- **LinkedIn:** [priyadharshanexe](https://www.linkedin.com/in/priyadharshanexe/)
- **GitHub:** [priyadharshanexe](https://github.com/priyadharshanexe)
- **Location:** India

## License

Copyright (c) 2026 M. Priyadharshan. See [LICENSE](LICENSE) for the portfolio's usage terms and third-party component notices.




