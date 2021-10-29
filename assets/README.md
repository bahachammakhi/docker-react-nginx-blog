# NOTE

- All glyphs are `75x75`
- Linux command to achieve this
    * `convert image -resize  75x75 output`
    * `convert image -fuzz 20% -transparent white -resize 75x75 output` to remove white from background
