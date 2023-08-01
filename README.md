# [Backstage](https://backstage.io)

## Introduction
For development purposes we recommend using VS Code's devcontainers. This allows us to all use the same dev environment. For more info : https://code.visualstudio.com/docs/devcontainers/containers. The devcontainer in this project is already set up, you only need : a container runtime (docker), docker-compose and VS Code with the "Dev Containers" extension installed on your system. This setup has been tested on Windows 11 with WSL2 and on MacOS. If you encounter problems running the Dev Container, please ask any developper on the project for help. 

Should you choose not to use containers, you will need : npm, yarn and nodeJS with specific versions on your system. You will also need a postgreSQL database.
## Runing Backstage locally with the Dev Container
If the prerequisites detailed before are met by your system, you only need to open the cloned project with VS Code. VS Code will prompt you to "Reopen this project in a Dev Container". After clicking on this button, VS Code will start builing the dev Container by pulling container images from the Docker Hub and then installing Backstage dependencies. This step can take around 10 minutes, however once it is done, reopening the project should be almost instantaneous.

Once the setup is done, run yarn dev in the Dev Container terminal and Backstage will start and be served at http://localhost:3000
## Runing Backstage locally on your system
To start the app once all tools mentionend before are setup, run:
```sh
yarn install
yarn dev
```
Backstage will start and be served at http://localhost:3000