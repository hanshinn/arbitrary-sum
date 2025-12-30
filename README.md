# arbitrary-sum

[![npm version](https://img.shields.io/npm/v/arbitrary-sum)](https://www.npmjs.com/package/arbitrary-sum)
[![npm downloads](https://img.shields.io/npm/dw/arbitrary-sum)](https://www.npmjs.com/package/arbitrary-sum)

## Description

Provide a simple method for calculating the sum of two numbers without requiring numerical accuracy.

## Function List

1. add: (num: number | string, num2: number | string) => string
2. mul: (num: number | string, num2: number | string) => string

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

<script src="../dist/arbitrary-sum.min.js"></script>
<script>
  arbitrary.add(1, 2); // "3"
</script>

```

## Other

Other features are under development, please provide feedback.

## Source

> test\gen_test_case.py

This is a Python file used to generate a large amount of unit test data in bulk.


### Test Case

#### Base Test Case
- "0", "0"
- "0.0", "0.0"
- "0e10", "0E-5"
- "1", "0"
- "-1", "0"
- "1.0", "0.0"
- "1e0", "0"
- "0.1", "0.2"
- "1e-1", "2e-1"
- "9.999e2", "0.001"
- "1e3", "-1"
- "100", "-0.01"
- "-100", "-0.01"
- "123.456", "-123.456"
- "1.23e2", "4.56e1"
- "-5e10", "5e10"
- "1e100", "1e100"
- "1e-100", "2e-100"
- "0.999999999999999999999999999999", "0.000000000000000000000000000001"
- "-0.999999999999999999999999999999", "-0.000000000000000000000000000001"

#### Other Test Case

Generate test cases through test\gen_test_case.py.

By modifying the 'test_case_count' variable in this file, you can generate a corresponding number of test cases for the test file of the corresponding method.
