This modules is created to save and remove files.

# Install
``` npm install easy-file-manager ```

# How to Use
```javascript
var fileManager = require('easy-file-manager')
var path = "/public/photos";
var fileName = "readme.txt";
var data; // base64 data
fileManager.upload(path,filename,data,fuction(err){
	if (err) return console.log(err);
});


fileManager.remove(path,filename,fuction(err){
	if (err) return console.log(err);
});
```