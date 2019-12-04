# Parse Dances
This project takes a list of dances formatted in *HANDSUP* style and outputs title images.
## How to use
1. Ensure Photoshop is installed
2. `npm i`
3. `node app.js`
## How it works
This CLI takes a list of dances, formatted in *HANDSUP* style, then extracts the dance name, choreographer, and performer. This information is stored in a JSON file, which is read by generate.jsx, a Photoshop specific script. This script generates title cards for each dance based on the template title.psd.
## License
[]()