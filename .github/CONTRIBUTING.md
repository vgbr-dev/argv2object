# Contributing

Thank you for taking the time to contribute.

## Repository Configuration

The following values identify the repository. Update this section when reusing this document in another project.

| Property | Value |
|--:-----------------|--:----------------------------------------|
| **Repository** | `argv2object` |
| **Owner** | `vgbr-dev` |
| **Default branch** | `main` |
| **Repository URL** | `https://github.com/vgbr-dev/argv2object` |

---

## Request for Changes / Pull Requests

Before making changes, create a fork of the repository on GitHub.

You can find instructions for forking a repository in the [GitHub Documentation](https://docs.github.com/en/get-started/quickstart/fork-a-repo).

### Clone your fork

Clone your fork to your local machine:

```sh
# Using HTTPS
git clone https://github.com/YOUR-USERNAME/REPOSITORY.git

# Using SSH
git clone git@github.com:YOUR-USERNAME/REPOSITORY.git
```

For more information about choosing between HTTPS and SSH, see the [GitHub Documentation](https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories).

Then enter the repository directory:

```sh
cd REPOSITORY
```

### Configure Git remotes

Add your fork as `fork` and the original repository as `upstream`:

```sh
# Using HTTPS
git remote add fork https://github.com/YOUR-USERNAME/REPOSITORY.git
git remote add upstream https://github.com/OWNER/REPOSITORY.git

# Using SSH
git remote add fork git@github.com:YOUR-USERNAME/REPOSITORY.git
git remote add upstream git@github.com:OWNER/REPOSITORY.git
```

Verify the configured remotes:

```sh
git remote -v
```

You should have two remotes:

```text
fork
upstream
```

---

## Receive Remote Updates

Before starting new work, make sure your local repository is synchronized with the upstream repository:

```sh
git switch main
git pull upstream main
```

---

## Choose a Base Branch

Unless otherwise specified, all changes should be based on the default branch.

| Type of change | Base branch |
| :------------- | :---------- |
| Documentation  | `main`      |
| Bug fixes      | `main`      |
| New features   | `main`      |
| Refactoring    | `main`      |
| Tests          | `main`      |

Create a dedicated branch for your changes:

```sh
git switch main
git pull upstream main

git switch --create patch/1234-name-issue
```

Use a descriptive branch name that identifies the purpose of the change.

Examples:

```text
feature/add-request-timeout
patch/fix-url-parser
docs/update-installation
test/add-client-tests
refactor/simplify-exchange
```

---

## Commit and Push Your Changes

Commit your changes using a clear and descriptive commit message:

```sh
git add .
git commit -m "Add request timeout support"
```

Push the branch to your fork:

```sh
git push -u fork patch/1234-name-issue
```

---

## Open a Pull Request

Once your changes have been pushed to your fork, open a pull request against the repository's default branch.

Before submitting the pull request:

- Ensure the changes are focused on the intended issue.
- Ensure tests pass.
- Ensure documentation is updated when necessary.
- Ensure the code follows the project's conventions.
- Provide a clear description of the changes.
- Reference the related issue when applicable.

Pull requests should follow the repository's pull request template when one is provided.
