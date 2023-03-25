# Getting Started with Git: Secure Remote Repository Access Guide

This guide will walk you through the process of setting up Git and accessing the Choice DTC Automation repository securely on GitHub Enterprise.

## Prerequisites

1. [Git](https://optum.service-now.com/euts_intake?id=euts_appstore_app_details&appKeyId=38229) installed on your local machine.

## Step 1: Configure Git

First, configure your Git user name and email address. These settings will be used for commit messages.

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@domain.com"
```

## Step 2: Generate a Personal Access Token (PAT) on GitHub Enterprise

1. Log in to your GitHub Enterprise account on [github.optum.com](https://github.optum.com).
2. Click on your profile picture in the upper-right corner, and select **Settings**.
3. In the left sidebar, click on **Developer settings**.
4. Click on **Personal access tokens** and then on **Generate new token**.
5. Give your token a descriptive name, and select the necessary scopes for your work (at least `repo` scope).
6. Click on **Generate token**. Copy the generated token to your clipboard. Save it somewhere safe, as you won't be able to see it again after leaving the page.

## Step 3: Clone the Choice DTC Automation Repository

Open a terminal or command prompt and navigate to the directory where you want to clone the repository. Then, run the following command:

```bash
git clone https://<your-token>@github.optum.com/HMA/healthmarkets-dtc-automation.git
```

Replace `<your-token>` with the Personal Access Token you generated in Step 2.

### Update the stored credentials in the Windows Credential Manager 
(*Ignore this section if this hasn't been setup*)

1. Open the Control Panel.
2. Click on "User Accounts."
3. Click on "Credential Manager."
4. Under "Windows Credentials," look for any credentials related to your GitHub Enterprise instance (e.g., `git:https://github.optum.com` or `git:https://username@github.optum.com`).
5. For each credential found, perform the following steps:
    a. Click on the credential, and then click "Edit."
    b. In the "Edit" window, replace the existing password with your personal access token.
    c. Click "Save."

## Step 4: Verify Repository Access

Navigate to the cloned repository directory:

```bash
cd healthmarkets-dtc-automation
```

Verify that you have access to the repository by checking the remote URL:

```bash
git remote -v
```

You should see the repository URL listed as the remote origin.

## Step 5: Start Working with the Repository

Now you're all set to start working with the Choice DTC Automation repository! You can create branches, commit changes, and push updates to the remote repository using standard Git commands. Remember to use your Personal Access Token for authentication when required.

For more information on Git commands and workflows, consult the [official Git documentation](https://git-scm.com/doc).
