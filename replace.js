const fs = require("fs")
const path = require("path")

const readdir = fs.promises.readdir;

/** Search all subdirectories, yielding matching file entries */
 async function* findFiles (dir, regexpFilter) {
  for (const entry of await readdir(dir, {withFileTypes: true})) {
    const fPath = path.resolve(dir, entry.name);
    if (entry.isDirectory()) {
      yield* findFiles(fPath, regexpFilter);
      continue;
    }
    if (regexpFilter && !regexpFilter.test(entry.name)) continue;
    yield Object.assign(entry, {path: fPath});
  }
}

async function main () {
  const dir = process.cwd() + '/mol/';
  
  // Regular expression which means: ends with '.element.ts'
  const filter = /.ts$/;

  for await (const entry of findFiles(dir, filter)) {
    //                                     ^^^^^^
    // If you don't include a filter argument, then all files will be iterated

     const source = fs.readFileSync(entry.path,{encoding:'utf-8'})
	 const namespace_regex = /[\W\w]?namespace[\W]+\$[\W]+\{([\w\W]+)\}/gm
	 ss = source.replace( namespace_regex, '$1' )
	 const ereg =/(export)[ ]+(function|class|type|const|let|var)[ ]+([\$a-zA-Z0-9_]{1,})/gm
	 const d = Array.from( ss.matchAll( ereg ) ).map( el => el[ 3 ] )
	 ss = ss.replace(ereg,'$2 $3')
	 let im = '\n export {' + d.join(',') + '}'

	 ss = ss + im
		
	 fs.writeFileSync(entry.path, ss);
	 
  }
}

main();