# coding-slides

### Intro

Slides are great as textual resources that students can return to before/after
presentations, and they help engage visual learners. But they can also be
just...bad, in that students can zone out easily when slides are uniform and
unengaging. We all hate it when lecturers just read off of slides.

This is especially a problem for educators of code. Code is great because it's
_alive_ in some senses; users can modify it and it responds to your fingers and
brain simultaneously, it can be uniform and random almost at the same time, it
can lead to so many creative avenues in the visual, auditory, touch, and so on.
Teaching code through slide presentations takes a lot of that creativity away,
becuase slides are often just static, shove-it-in-your-students'-brains types of
resources. It shouldn't be that way.

This repository provides a simple tooling kit to make code run interactively in
slides. It is meant to be a resource that instructors can clone and then modify
to fit their own teaching needs, extending and modifying the features I thought
of to fit their own needs. But within all of those diverse needs, I hope the
need for dynamic, interactive teaching resources shines through.

### Quickstart

1. Download or clone this repository, install [Node](https://nodejs.org), and
   install yarn (run `npm i -g yarn` on a terminal).
2. Navigate to this repository in a terminal and run `yarn` in a terminal to
   install all packages needed.
3. Run `yarn start` to begin the presentation.

### Editing, extending, emodifying

You probably don't want to use my slides for your own demos. This section covers
some info on the implementation that would be useful for creating your own
slides.

The slides are created through the Reveal.js framework. Upon running
`yarn start`, a server process on port 3100 starts up (handled by nodemon
tooling over an express api) and a UI process starts up on port 3000 (handled by
Vite).

Upon submitting, the UI process sends a GET request through the `fetch` API to
the API process. The API process saves the submitted text as a plaintext file
(specifically `server/script`) and then runs that file with the `exec` module.
Output is then sent back to the UI process, and the UI process throws it into an
output div.

An important note is that all of this means the live code can only be used on a
local machine. I'm currently trying ot figure out how to run this through an AWS
lambda function, so that it can just be deployed as a website forever.

Some tips on editing:

- The slide content itself can be edited inside `ui/slides.md`. Format follows
  general markdown rules plus Reveal.js implementation.
- To add non-Markdown elements, like JS animations or actions, create `*.js`
  files and make them interact with HTML divs via `id` tags and the
  `Reveal.on('slidechanged, ...)` API. See an example in `ui/src/creds.js` and
  `ui/src/r-block.js`.
- If you just want to change the language, you can edit `server/index.js` and
  modify the extension and engine used to execute code files.

The point of this approach is that slide editing should deal somewhat with the
underlying implementation, becuase only by dealing with that implementation can
we make slides fit our situation/function, change them to our needs, and make us
better teachers.

### Contact

Contact nathan.kim@yale.edu for any questions. :)
