# premise

- Slides are super useful and a preservable resource, but they can be a little
  dry
  - "Freirian" vs "banking" teaching styles
- Slides should be dynamic
  - in the sense that they should be able to change
  - in the sense that students should be able to interact with them
- For teachers of code it's annoying / doesn't make sense to separate the code
  window from the teaching window

---

# The idea

An interactive text editor that is able to run code (here, R code), from within
a slide

<div class = "run-r"></div>

---

# how it works

1. When `yarn start` is run:

   - `nodemon` starts up a server on port 3100 that refreshes on file changes
   - `vite` starts up a UI platform on port 3000 that refreshes on file changes

2. When the home page is visited, credentials checking begins

   - input element + submit button + onSubmit() handler
   - compares to a environment variable
   - seems kind of dangerous to run code like this, especially if this makes its
     way online, so this credentials mechanism was my prototype solution

---

# how it works (cont.)

3. When credentials are checked, code editing is enabled/disabled

   - if it's skipped or diabled then nothing happens
   - if it's enabled, then a `<textarea />` div is put in, plus a submit button

4. When the textarea things are submitted, the api runs the code

   - the UI process on port 3000 submits it to the api process on port 3100
   - the api process saves it as an R code file and runs it
   - the api process sends the output back to the client (the ui process on
     port 3000)

5. when the UI receives a response, it creates an output div and shoves the code
   in there

In sum, conceptually: 

- both a UI process and a server process are started 
- this is normally dangerous, but yea..
- They interact with fetch(), or a GET request

---

# next steps

<div class = "run-r"></div>

- syntax highlighting for the textarea
  - some projects sort of do live/realtime highlighting, like Prism Live, but i
    couldn't get them to work
- better security / stable version for online release
  - right now, must be run on localhost
- Vueify/Reactify this
- other languages

---

# Thank you!

Other links

- Revealjs (slides): https://revealjs.com/api/
- Express (server): https://expressjs.com/
- Vite (UI tooling): https://vitejs.com
- This repository: https://github.com/18kimn/tidy-review