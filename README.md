# arbitrary-sum

## Description

Provide a simple method for calculating the sum of two numbers without requiring numerical accuracy.

## Usage

### ES-MODULE

```javascript

import arbitrary from "arbitrary-sum";

arbitrary.add(1, 2); // "3"
arbitrary.add("4.93343872339602720994674446782120942891662941541e111", "-7.74105135757106069303130253921620556602520797e18");
// "4933438723396027209946744467821209428916629415409999999999999999999999999999999999999999999992258948642428939306.96869746078379443397479203"

```

### CommonJS

```javascript

const arbitrary = require("arbitrary-sum");
arbitrary.add(1, 2); // "3"

```

### UMD

```html

<script src="../dist/arbitrary-sum.js"></script>
<script>
  arbitrary.add(1, 2); // "3"
</script>

```

## Other

Other features are under development, please provide feedback.

## Source

> test\gen_test_case.py

This is a Python file used to generate a large amount of unit test data in bulk.

