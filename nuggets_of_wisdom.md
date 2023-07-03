### Stores scripts executes before the main

On a build, and probably with npm run dev too, Stores files are the first to executes if they have any code within them (they generally have because otherwise, they would be empty files.)

The thing is, when building, there is no catch of dynamic errors like trying to loop through a null variable.

Make sure you test your app, without anything in cache before building to avoid debugging on a build version, thanks.