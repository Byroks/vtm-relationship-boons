# Boons by Night

Welcome to the project [boonsbynight.com](https://boonsbynight.com/)! This Project allows users to create a list of boons, based on your relationship map!

This project was originally created for the TTRP: Vampire the Masquerade but it works for anyother game aswell, if you are in the need of favours owed between your NPCs!

## Usage

To use this Website you have to have an existing relationship map made with [this Kumu.io template](https://kumu.io/RiggaTony/v5-relationship-map-template). When you are done, you need to export/download the project as a JSON file.
This file can now be uploaded to the Website. At this point, you can already let your boons be created or you start to fine tune everything that can have an impact on the boon creation.
First and foremost you can adjust the amount of boons that should be created and the percantage of the different kind of boons. Don't want anything bigger than a moderate boon? Set everything above to 0%!
Each connection also has different weight for the likelyhood that a boon will be distributed. This also can be adjusted. Aswell if you creat new connection types, just add them to the sidebar, give them a weight and the algorithm will take it into account!
After the boons got distributed, you can download a JSON file that you can reimport into Kumu so that the boons are displayed in your relationship map. If you don't want or need that, ther is also a CSV file that includes every boon that got created, their type and who owns whom.

Important to note is, that the boons will only be distributed between kindred and coteries, as mere mortals are not important enough to hold a boon.

## Contribution

If you want to support this project, feel free to open an Issue for feature request or even add it yourself! If you want to add a feature, create a Pull Request to the Develop branch and I will regularly merge it so Master so the new features go live.

### Installation

#### 1. Clone the repository
```bash
git clone git@github.com:Byroks/vtm-boons-backend.git
git clone git@github.com:Byroks/vtm-relationship-boons.git
```
#### 2. Install dependencies
```bash
npm i
```
#### 3. Run Frontend
```bash
ng s
```
#### 4. Run Backend
```bash
node .
```
  Navigate to `http://localhost:4200` to see the app running!
