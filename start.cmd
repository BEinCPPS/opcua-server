if "%~1" == "" (
    echo No parameters have been provided.
    node server.js
) else (
    echo Parameters: %1
    node server.js -a %1
)