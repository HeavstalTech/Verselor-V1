// System/antispam.js
const usedCommandRecently = new Set()

const isFiltered = (from) => usedCommandRecently.has(from)

const addFilter = (from) => {
    usedCommandRecently.add(from)
    setTimeout(() => usedCommandRecently.delete(from), 5000)
}

const antiSpam = {
    isFiltered,
    addFilter,
}

export default antiSpam
