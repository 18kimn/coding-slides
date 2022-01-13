<template>
  <div class="reveal">
    <div class="slides">
      <section class="center" id="titleslide">
        <h1>interactive code editing in slides</h1>
        <p>Nathan Kim</p>
      </section>
      <section data-markdown="./ui/slides.md" data-separator="---"></section>
    </div>
  </div>
</template>

<script>
import Reveal from 'reveal.js'
import Markdown from 'reveal.js/plugin/markdown/markdown.esm'
import Highlight from 'reveal.js/plugin/highlight/highlight.esm'
import CodeBlock from './CodeBlock/CodeBlock.vue'
import Creds from './Creds.vue'
import { createApp, } from 'vue'

export default {
  mounted() {
    Reveal.initialize({
      plugins: [Markdown, Highlight],
      center: false
    })
    Reveal.on('slidechanged', () => {
      const slide = Reveal.getCurrentSlide()
      const codeDiv = slide.querySelector('.run-code')
      console.log({slide, codeDiv})
      if (!codeDiv) return
      const existingTextarea = slide.querySelector('.code-editor')
      if (codeDiv && !existingTextarea) {
        createApp(CodeBlock, { defaultLanguage: codeDiv.dataset.language }).mount(codeDiv)
      }
    })
  },
  data() { // set isVerified: false if you'd like interactive verification
    return { isVerified: true }
  },
  components: { CodeBlock, Creds }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Fira+Code&family=Lato:ital,wght@0,400;0,700;1,400&display=swap");
@import url("../../node_modules/reveal.js/dist/reveal.css");
@import url("../../node_modules/reveal.js/dist/theme/moon.css");
@import url("../styles/hjs-solarized-light.css");

:root {
  --r-main-font: Lato, sans-serif;
  --r-main-font-size: 20pt;
  --r-heading-font: Lato, sans-serif;
  --r-heading1-size: 2em;
  --r-heading2-size: 1.75em;
  --r-heading3-size: 1.5em;
  --r-heading4-size: 1em;
  --r-heading-line-height: 1.2;
  --r-heading-letter-spacing: normal;
  --r-heading-text-transform: unset;
  --r-heading-text-shadow: none;
  --r-heading-font-weight: normal;
  --r-heading1-text-shadow: none;
  --r-block-margin: 1rem;
  --r-heading-margin: 1rem;
  --r-code-font: Fira Code;
  --r-background-color: #002b36;
  --r-main-color: #93a1a1;
  --r-heading-color: #eee8d5;
  --r-link-color: #268bd2;
  --r-link-color-dark: #1a6091;
  --r-link-color-hover: #78b9e6;
  --r-selection-background-color: #d33682;
  --r-selection-color: #fff;
}

#app {
  width: 100vw;
  height: 100vh;
}

.reveal p {
  margin: 1rem;
}

h1,
h2,
h3,
h4,
h5,
p {
  text-align: left;
  margin-left: 1rem;
}

.reveal ul,
.reveal ol {
  display: block;
}

.center h1,
.center p {
  text-align: center;
}

.img-container {
  display: flex;
  flex-direction: row;
  place-items: center;
  place-content: center;
}

.img-container img {
  max-width: 50%;
  max-height: 50%;
}

.reveal pre {
  font-size: 0.7em;
}

.reveal .slides section {
  height: 100%;
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  display: flex;
  place-content: center;
}

.reveal .slides section::-webkit-scrollbar {
  display: none;
}

#titleslide {
  width: 100%;
  display: flex !important;
  flex-direction: column;
  place-items: center;
}
</style>
