# Pangyou

## Installation instructions:

If you don't have Node installed, install Homebrew.  Paste all of the following line into a terminal window:
> /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

### Install Node and Watchman:

- brew install node
- brew install watchman


### Install React-Native:

- npm install -g react-native-cli


### Clone Pangyou Repository

- On GitHub, navigate to the main page of the repository.

> https://github.com/pangyouinternational/pangyou.git

- Under the repository name, click Clone or download
- In the Clone with HTTPs section, click  to copy the clone URL for the repository.
- Open your Terminal.
- Change the current working directory to the location where you want the cloned directory to be made.
- Type git clone, and then paste the URL you copied in Step 2.

> $ git clone https://github.com/pangyouinternational/pangyou.git

- Press Enter. Your local clone will be created.


### Branch Naming Guidelines

The following guidelines are to be followed when creating a new branch:

* feat      Feature I'm adding or expanding
* fix       Bug fix or experiment
* junk      Throwaway branch created to experiment
* refact       Refactor a branch
* wip       Works in progress; stuff I know won't be finished soon

A practical example:
- feat/name-of-new-branch
- fix/name-of-new-branch
- junk/name-of-new-branch
- refact/name-of-new-branch
- wip/name-of-new-branch


### Create a New Branch From Master

- Create the branch on your local machine and switch in this branch:

> $ git checkout -b [name_of_your_new_branch]

- Change working branch:

> $ git checkout [name_of_your_new_branch]

- Push the branch on github:

> $ git push origin [name_of_your_new_branch]

- When you want to commit something in your branch, be sure to be in your branch. Add -u parameter to set upstream.
