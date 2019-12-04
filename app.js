const fs = require("fs")
const open = require("open")
const chalk = require("chalk")
const prompt = require("prompts")
const ora = require("ora");

(async () => {
    let file = await prompt({
        type: "text",
        name: "name",
        message: "What is the file name?",
        initial: "dances.txt"
    }) // get filename

    console.log(chalk.bold(`Outputting to ${file.name.split(".")[0]}.json.`))

    fs.readFile(file.name, async (e, data) => {
        const dancesText = data.toString()
        let dancesObjects = []
        let dances = dancesText.split("\n") // separated by linebreaks
        prompt({
            type: "toggle",
            name: "value",
            message: `${dances.length} dances?`,
            initial: false,
            active: "Yes",
            inactive: "No"
        }).then((e) => {
            if (!e.value) {
                return false
            }

            const loadingSpinner = ora(`Outputting to ${file.name.split(".")[0]}.json.\n`).start()

            dances.forEach((dance) => {
                let choreographerName = undefined
                if (dance.includes("choreographed and performed")) {
                    choreographerName = dance.substring(
                        dance.lastIndexOf(" choreographed and performed by ") + " choreographed and performed by ".length,
                        dance.lastIndexOf(". Music")
                    )
                }

                let performerName = undefined
                if (dance.includes("\"Finale\"")) {
                    choreographerName = dance.substring(
                        dance.lastIndexOf(" choreographed by ") + " choreographed by ".length,
                        dance.lastIndexOf(". Music")
                    )
                    performerName = "all"
                }
                dancesObjects.push({
                    danceName: dance.split("\"")[1],
                    choreographerName: choreographerName || dance.substring(
                        dance.lastIndexOf(" choreographed by ") + " choreographed by ".length,
                        dance.lastIndexOf(" and performed by")
                    ),
                    performerName: performerName || dance.substring(
                        dance.lastIndexOf("performed by ") + "performed by ".length,
                        dance.lastIndexOf(". Music")
                    )
                })
            })

            const str = JSON.stringify(dancesObjects)

            fs.writeFile("./dances.json", str, async (e) => {
                loadingSpinner.stop()
                if (e) {
                    console.log(chalk.red.bold("Error"))
                } else {
                    console.log(chalk.green.bold("Success, generating images in Photoshop"))
                    const openingInPhotoshopSpinner = ora("Opening...").start()
                    await open("./generate.jsx", {
                        app: "adobe photoshop cc 2015"
                    })
                    openingInPhotoshopSpinner.stop()
                    console.log(chalk.greenBright("Done."))  
                    open("./output")
                }
            })
        })
    })
})()