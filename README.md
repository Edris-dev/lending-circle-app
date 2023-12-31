# Sandooq App

## Overview

The Sandooq App is a web application designed to facilitate rotating savings and credit associations (ROSCAs) or circles. It allows users to create circles, invite members, manage contributions, and perform rotations to distribute pooled funds among participants.

High Level Frontend Design: https://www.figma.com/file/tbnUwapM14jPOjKZVay4Xf/Sign-Up-Page-Design?type=design&node-id=130%3A206&mode=dev

## Features

- **Circle Creation:** Users can create circles and define various parameters such as title, description, contribution amount, and rotation schedule.

- **Member Management:** Admins can invite users to join the circle, and participants can confirm or decline invitations.

- **Contribution Collection:** The app automates the collection of contributions from participants based on the defined contribution amount.

- **Rotation Schedule:** The app follows a rotation schedule to determine when each participant receives the pooled funds.

- **User Roles:** Different roles (e.g., admin, regular participant) with varying permissions and responsibilities.

## Getting Started

### Prerequisites

- Node.js installed
- Database (e.g., PostgreSQL) set up and configured

### Installation

1. Clone the repository: `git clone https://github.com/Edris-dev/lending-circle-frontend.git`
2. Navigate to the project directory: `cd lending-circle-frontend`
3. Install dependencies: `npm install`

### Configuration

2. Run migrations: `npx sequelize-cli db:migrate`
3. Seed the database with initial data : `npx sequelize-cli db:seed:all`

### Usage

1. Start the application: `npm start`
2. Access the app in your browser: `http://localhost:3000`

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
