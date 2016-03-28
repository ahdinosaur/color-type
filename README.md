# t-color

a tcomb type for [a color in any space](https://github.com/scijs/color-space)

```shell
npm install --save t-color
```

see [demo](https://ahdinosaur.github.io/t-color)

## usage

### `Color = require('t-color')`

### `color = Color(attrs)`

`attrs.type` corresponds to the name of the color space.

> for example: [`rgb`](https://github.com/scijs/color-space/blob/master/rgb.js#L8)

subsequent arguments correspond to the channels of the color space.

> for example: [`red`, `green`, `blue`](https://github.com/scijs/color-space/blob/master/rgb.js#L11)

### `Color.view(h, props)`

see [`tcomb-view`](https://github.com/ahdinosaur/tcomb-view)

## License

The Apache License

Copyright &copy; 2016 Michael Williams (@ahdinosaur)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
