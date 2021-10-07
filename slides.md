# Motivation: why tidy

handling data in R is ...bad... sometimes

<br/>

```r
mtcars$newcol <- mtcars$mpg * mtcars$cyl
mtcars["newcol"] <- mtcars["mpg"] * mtcars["cyl"]
```

<br/>

- Why do we have to write "mtcars" so many times?
- How do you say this in English?
- Why are there two syhmbols for the same thing?
- Why do you have to quote it in one context and unquote it in another?

---

# Then: Hadley Wickham

<div class="img-container">
  <img src="hadley.jpg" />
</div>

---

# Then: Hadley Wickham and his 2014 paper

<div class="img-container">
  <img src="tidy-paper.png" />
</div>

[accessible here](https://vita.had.co.nz/papers/tidy-data.pdf)

---

# An extension: tidy _code_ too

- Tidy data is important, but for data scientists it's almost impossible to have
  tidy data without tidy code
- What kind of logic can we have with code to make it more human-readable?

Enter dplyr and ggplot2: a "grammar of data manipulation" and a "grammar of graphics"

--- 

# Basic ideas: dplyr

- Six verbs
  - `mutate, select, filter, summarize, arrange`
- one adverb: `group_by`
- Usually one "subject": your dataset

To code in regular R, you need to know code.

To code in dplyr R, you need to know english.

---

# Comparison: dplyr

*Task*: From the `iris` dataset of flowers, find which species of color has the longest average petal width.

Without dplyr:
```r
avg_widths <- NULL
names(avg_widths) <- unique(iris$Species)
for(species in unique(iris$Species)){
  species_data <- iris[iris$Species == species,]
  avg_widths <- mean(species_data$Petal.Width)
}

max(avg_widths)

max(tapply(iris$Petal.Width, iris$Species, mean))
```

<br />

With:

```r
iris %>%
  group_by(Species) %>%
  summarize(avg_petal_width = mean(Petal.Width)) %>% 
  arrange(avg_petal_width)

```

---

# Basic ideas: 


---


---

# Summary

- By providing a conceptual framework where all code has its own sensible place, you 


