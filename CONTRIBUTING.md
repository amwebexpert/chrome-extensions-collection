
# Contributing to chrome-extensions-collection

We are excited that you are interested in contributing to this project! Before you begin, please take a moment to review the guidelines below to ensure a smooth contribution process.

## Getting Started

1. **Fork the repository**:
   - Create your own fork of the repository by clicking the "Fork" button in the top-right corner of this page.

2. **Clone the repository**:
   - Clone your forked repository to your local machine:
     ```bash
     git clone https://github.com/your-username/chrome-extensions-collection.git
     ```

3. **Install dependencies**:
   - Navigate to the project root and install dependencies using `yarn`:
     ```bash
     cd chrome-extensions-collection
     yarn install
     ```

4. **Setup workspace**:
   - Ensure you can build and test the project locally:
     ```bash
     yarn build
     yarn test
     ```

## Making Changes

1. **Create a branch**:
   - Always create a new branch for your work:
     ```bash
     git checkout -b feature/your-feature-name
     ```

2. **Write code**:
   - Follow the coding guidelines and ensure your code is clean and maintainable.

3. **Test your changes**:
   - Run the tests locally to ensure that your changes do not break existing functionality:
     ```bash
     yarn test
     ```

4. **Lint and format your code**:
   - Use `Biome.js` to lint and format your code:
     ```bash
     yarn lint
     yarn lint:fix
     ```

## Submitting Changes

1. **Commit your changes**:
   - Write clear and descriptive commit messages:
     ```bash
     git commit -m "Add detailed description of the changes"
     ```

2. **Push your branch**:
   - Push your branch to your forked repository:
     ```bash
     git push origin feature/your-feature-name
     ```

3. **Open a Pull Request**:
   - Open a pull request from your branch to the `main` branch of the main repository.

## Code Reviews

- All pull requests will be reviewed by maintainers. Ensure that you address all comments before your PR is merged.
- Follow best practices, and refer to the [Coding Guidelines](packages/coding-guide-helper/public/markdowns/table-of-content.md)
 file for tips on maintaining consistency.

## Additional Notes

- Make sure your changes align with the project's scope and objectives.
- If you are making changes that affect the public API or documentation, update the corresponding files.

Thank you for contributing!
