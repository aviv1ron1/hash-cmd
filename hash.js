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
            console.error("unsupported hash type", hashType);
            process.exit(1);
        }
        if (program.input) {
            if (checkFile(program.input)) {
                if (data) {
                    console.error("cannot have both file input and data together");
                    process.exit(1);
                }
                verb("calculating hash ", hashType, " from file: '", program.input, "'");
                hash.setEncoding("hex");
                const input = fs.createReadStream(program.input);
                input.pipe(hash).pipe(process.stdout);
                input.on("end", () => {
                    process.exit(0);
                });
            }
        } else {
            if (data.length == 0) {
                console.log("data is required");
                process.exit(1);
            }
            verb("calculating hash ", hashType, " of: '", data, "'");
            hash.update(data);
            console.log(hash.digest('hex'));
            process.exit(0);
        }
    }
}

program
    .description('hash creation')
    .option("-i, --input <file>", "read data from file")
    .option("-v, --verbose", "verbose mode");

program
    .command('md5 [data]')
    .description("md5")
    .action(makeAction('md5'));

program
    .command('sha1 [data]')
    .description("sha1")
    .action(makeAction('sha1'));

program
    .command('sha2 [data]')
    .description("sha256")
    .action(makeAction('sha256'));

program
    .command('*')
    .description("you specify the hash function name")
    .action((h, ...data) => {
        makeAction(h)(data.slice(0, data.length - 1).join(" "));
    });

program.parse(process.argv);