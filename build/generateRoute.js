const path = require('path')
const fs = require('fs')
const glob = require('glob')

function getEntries (globPath) {
  let entries = []
  glob.sync(globPath).forEach(function (entry) {
    let tmp = entry.split('/').splice(-3)
    let moduleName = tmp.splice(1, 1)
    entries.push({
      name: moduleName[0],
      path: entry
    })
  })
  return entries
}
let routesPath = path.join(__dirname, '..', 'src/pages/**/routes.js')
let paths = getEntries(routesPath)

let routerConfigPath = path.join(__dirname, '..', 'src/router/index.js')
let config = 'let routes = [];\n'
paths.forEach((pathObj, index) => {
  config += `import ${pathObj.name} from '${pathObj.path}';\nroutes.push(...${pathObj.name});\n`
  if (paths.length - 1 === index) {
    config += '\n'
    config += 'export default routes;\n'
  }
})

fs.writeFileSync(routerConfigPath, config, 'utf-8')
