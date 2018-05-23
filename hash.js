#!/usr/bin/env node

var fs = require('fs');
var program = require('commander');
const crypto = require('crypto');


var checkFile = function(fname) {
    if (fs.existsSync(fname)) {
        return true;
    } else {
        console.error("could not find", fname);
        process.exit(1);
    }
}

var verb = (...s) => {
    if (program.verbose) {
        console.log(s.join(""));
    }
}

var makeAction = (hashType) => {
    return (data) => {
        var hash;
        try {
            hash = crypto.createHash(hashType);
        } catch (err) {
            console.error("unsupported hash type %s,\nsupported hash types include %j", hashType, crypto.getHashes());
            process.exit(1);
        }
        if (program.input) {
            if (checkFile(program.input)) {
                verb("calculating hash ", hashType, " from file: '", program.input, "'");
                hash.setEncoding("hex");
                const input = fs.createReadStream(program.input);
                input.pipe(hash).pipe(process.stdout);
                input.on("end", () => {
                    process.exit(0);
                });
            }
        } else {
            if (data.length && Array.isArray(data)) {
                verb("data is array ", data);
                data.splice(1, 1);
                data = data.join(" ");
            }
            verb("calculating hash ", hashType, " of: '", data, "'");
            hash.update(data);
            console.log(hash.digest('hex'));
            process.exit(0);
        }
    }
}

program
    .description('calculate a hash value of a string or file. <hash> is the hash function name like "md5", "sha1", "sha256"')
    .option("-i, --input <file>", "read data from file")
    .option("-v, --verbose", "verbose mode")
    .arguments('<hash> [data]')
    .action((h, data) => {
        makeAction(h)(data || ""); //.slice(0, data.length - 1).join(" "));
    }).on('--help', () => {
        console.log('');
        console.log('  Examples:');
        console.log('');
        console.log('    calculate md5 of "abc"                      $ hash md5 abc');
        console.log('    calculate sha1 of "a b c"                   $ hash sha1 "a b c"');
        console.log('    calculate sha256 of the file c:\\somefile    $ hash -i c:\\somefile sha256');
        console.log('');
    });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}