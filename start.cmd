if %1.==. (
    echo No parameters have been provided.
    node server.js
) else (
    echo Parameters:
    echo %*
    node server.js -a $1
)


