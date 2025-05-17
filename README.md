# path-info

> Return details of a path

NOTE: This is an extended use of `fs.stat()`. If you only need simple data of a path, this module is not needed.

## Install

```
$ npm install path-info
```

## Usage

```js
// foo.js
import { getPathInfo } from "path-info";

console.log(await getPathInfo("E:\\foo.js"));
```

## API

### getFileInfo(path)

Returns `JSON` value of file info including file name, type, size and so on.

### getFolderInfo(path)

Returns `JSON` value of all files and folders inside the path recursively.

### getPathInfo(path)

Call `getFileInfo()` or `getFolderInfo()` according to the path type.

---
