#include json2.js

const fileRef = new File(new File($.fileName).path + "/title.psd")
app.open(fileRef)

const nameGroup = app.activeDocument.layerSets.getByName("names")
const danceName = nameGroup.layers.getByName("dance-name")
const choreoName = nameGroup.layers.getByName("choreo-name")
const performerName = nameGroup.layers.getByName("performer-name")

const dances = loadJSON("./dances.json")

for(var i = 0; i < dances.length; i++) {
    var dance = dances[i]
    danceName.textItem.contents = dance.danceName
    choreoName.textItem.contents = "By " + dance.choreographerName
    performerName.textItem.contents = "Performed by " + dance.performerName
    saveTiff("./output/" + dance.danceName.replace(/ /g, "-").toLowerCase())
}


function loadJSON(relPath) {
    const script = new File($.fileName)
    const JSONFile = new File(script.path + "/" + relPath)

    JSONFile.open("r")
    const str = JSONFile.read()
    JSONFile.close()

    return JSON.parse(str)
}

function saveTiff(name) {
    const doc = app.activeDocument
    const file = new File(doc.path + "/" + name + ".tiff")

    const opts = new PNGSaveOptions()

    doc.saveAs(file, opts, true)
}