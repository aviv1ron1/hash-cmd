# hash-cmd
node command line tool for calculating hash values of strings or files

### Installation
`$ npm install -g hash-cmd`

### Examples
calculate the md5 hash of "abc"

`$ hash md5 abc`

calculate the sha1 hash of "a b c"

`$ hash md5 "a b c"`

calculate the sha256 hash of the file c:\somefile.txt

`$ hash -i c:\somefile.txt sha256`

### Usage
`hash [options] <hash> [data]`

```<hash>``` is the hash function name like "md5", "sha1", "sha256"

```[data]``` is the string to be hashed

`[options]` include:

```shell
-i, --input <file>  read data from file
-v, --verbose       verbose mode
-h, --help          output usage information
```

### License
[The MIT License](https://opensource.org/licenses/MIT "Copyright 2018 Aviv Ron - The MIT License")

Copyright 2018 Aviv Ron

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
