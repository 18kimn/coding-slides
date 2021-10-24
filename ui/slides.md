# premise

- slides are useful, but boring
- they're especially boring and especially useful for code
  - coding requires just learning a lot of things, but it's _so boring_
- on a less trivial note it's not good to just throw information at students

coding should be interactive, engaging, dynamic... that's how coding becomes the
magic we know it to be!

---

# the idea

an interactive editor inside of slides! check it out:

<div class = "run-code" data-language="Rscript"></div>

Teachers can run code and write without switching in and out of slides. Students
can play with it too.

Features syntax highlighting, multiple languages (sort of), prefill-ability,
autocomplete (sort of).

---

# how it works

Currently on the development version:

- when `yarn start` is run
  - UI process starts on port 3000
  - server process starts on port 3100
- when a command is entered
  - UI sends a GET request to port 3100
  - port 3100 takes the script as the "data" parameter, writes it to a file,
    runs it, sends it back
- when response is received, UI displays it

# goal/next steps

- aesthetic fixes
- this shouldn't need to be run on localhost; currently working on AWS lambda
  functions to process requests
