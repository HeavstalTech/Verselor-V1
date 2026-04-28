// System/antispam.js
var usedCommandRecently = new Set()

var isFiltered = (from) => usedCommandRecently.has(from)

var addFilter = (from) => {
    usedCommandRecently.add(from)
    setTimeout(() => usedCommandRecently.delete(from), 5000)
}

var antiSpam = {
    isFiltered,
    addFilter,
}

export default antiSpam
