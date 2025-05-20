# Contributing to Eatalyzer

First off, thank you for considering contributing to Eatalyzer! We appreciate your time and effort. Following these guidelines helps ensure a smooth contribution process for everyone involved.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Fork and Clone the Repository](#fork-and-clone-the-repository)
  - [Set Up the Development Environment](#set-up-the-development-environment)
- [Making Changes](#making-changes)
  - [Code Style](#code-style)
  - [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)
- [Code Review Process](#code-review-process)
- [Community](#community)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report any unacceptable behavior to [avarnita1704@gmail.com](mailto:avarnita1704@gmail.com).

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (v16 or later)
- [Python](https://www.python.org/) (3.8 or later)
- [pip](https://pip.pypa.io/en/stable/) (Python package manager)
- [SQLite](https://www.sqlite.org/index.html) (for local development)

### Fork and Clone the Repository

1. Fork the repository on GitHub
2. Clone your forked repository:
   ```bash
   git clone https://github.com/your-username/Eatalyzer.git
   cd Eatalyzer
   ```
3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/AvarnitaSrivastava/Eatalyzer.git
   ```

### Set Up the Development Environment

#### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd eatalyser-backend
   ```
2. Create and activate a virtual environment:
   ```bash
   # On Windows
   python -m venv venv
   .\venv\Scripts\activate
   
   # On macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up the database:
   ```bash
   python -m app.database
   ```
5. Start the development server:
   ```bash
   uvicorn app.main:app --reload
   ```

#### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../eatalyzer-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Making Changes

1. Create a new branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b bugfix/description-of-fix
   ```
2. Make your changes following the code style guidelines
3. Test your changes thoroughly
4. Commit your changes with a descriptive message (see below)
5. Push your changes to your fork:
   ```bash
   git push origin your-branch-name
   ```
6. Open a pull request against the `main` branch

### Code Style

- **Python**: Follow [PEP 8](https://www.python.org/dev/peps/pep-0008/)
- **JavaScript/TypeScript**: Follow [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- **React**: Follow [React/JSX Style Guide](https://reactjs.org/docs/faq-styling.html)
- **CSS**: Use Tailwind CSS utility classes when possible

### Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. Example commit messages:

```
feat: add user authentication
fix: resolve login form validation issue
docs: update README with setup instructions
refactor: improve error handling in API routes
chore: update dependencies
test: add unit tests for auth service
```

## Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a build.
2. Update the README.md with details of changes to the interface, including new environment variables, exposed ports, useful file locations, and container parameters.
3. Increase the version numbers in any examples files and the README.md to the new version that this Pull Request would represent. The versioning scheme we use is [SemVer](http://semver.org/).
4. Your pull request will be reviewed by the maintainers.
5. Once your pull request is approved, it will be merged into the main branch.

## Reporting Bugs

Before creating bug reports, please check [existing issues](https://github.com/AvarnitaSrivastava/Eatalyzer/issues) to see if the problem has already been reported. If it has, add a comment to the existing issue instead of opening a new one.

When creating a bug report, please include as much detail as possible:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Your environment (OS, browser, etc.)

## Suggesting Enhancements

We welcome suggestions for enhancements. Please use the feature request template when opening an issue to suggest new features or improvements.

## Code Review Process

1. A maintainer will review your pull request and provide feedback.
2. You may be asked to make changes to your code.
3. Once all feedback has been addressed, your pull request will be merged.

## Community

Join our community to ask questions and discuss ideas:

- **Avarnita Srivastava** (Project Lead) - [avarnita1704@gmail.com](mailto:avarnita1704@gmail.com)
- **Dhanya Dwivedi** - [dhanyadwivedi170304@gmail.com](mailto:dhanyadwivedi170304@gmail.com)
- **Keshab Kumar Jha** - [keshabkumarjha876@gmail.com](mailto:keshabkumarjha876@gmail.com)

Thank you for contributing to Eatalyzer! Your contributions help make this project better for everyone.
