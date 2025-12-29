from decimal import Decimal, getcontext
import random

# 设置足够高的精度
getcontext().prec = 5000  # 支持最多 5000 位有效数字
test_case_count = 50 # 用例数

def rand_decimal_str():
    # 随机生成十进制或科学计数法字符串
    if random.random() < 0.3:
        # 科学计数法
        sign = '-' if random.random() < 0.2 else ''
        coeff_int = str(random.randint(1, 9))
        coeff_frac_len = random.randint(0, 50)
        coeff_frac = ''.join(str(random.randint(0, 9)) for _ in range(coeff_frac_len))
        coeff = coeff_int + ('.' + coeff_frac if coeff_frac else '')
        exp = random.randint(-300, 300)
        return f"{sign}{coeff}e{exp}"
    else:
        # 普通十进制
        sign = '-' if random.random() < 0.2 else ''
        int_part_len = random.randint(1, 100)
        int_part = str(random.randint(1, 9)) + ''.join(str(random.randint(0, 9)) for _ in range(int_part_len - 1))
        if random.random() < 0.5:
            frac_len = random.randint(1, 200)
            frac_part = ''.join(str(random.randint(0, 9)) for _ in range(frac_len))
            return f"{sign}{int_part}.{frac_part}"
        else:
            return f"{sign}{int_part}"

def normalize(d: Decimal) -> str:
    # 转为标准十进制字符串（无指数）
    s = format(d, 'f')
    # 移除尾随零和可能的小数点
    if '.' in s:
        s = s.rstrip('0').rstrip('.')
    if s == '' or s == '-':
        s = '0'
    return s if s != '' else '0'

def generate_cases():
    add_cases = []
    mul_cases = []

    # 1. 基础用例
    basic = [
        ("0", "0"),
        ("0.0", "0.0"),
        ("0e10", "0E-5"),
        ("1", "0"),
        ("-1", "0"),
        ("1.0", "0.0"),
        ("1e0", "0"),
        ("0.1", "0.2"),
        ("1e-1", "2e-1"),
        ("9.999e2", "0.001"),
        ("1e3", "-1"),
        ("100", "-0.01"),
        ("-100", "-0.01"),
        ("123.456", "-123.456"),
        ("1.23e2", "4.56e1"),
        ("-5e10", "5e10"),
        ("1e100", "1e100"),
        ("1e-100", "2e-100"),
        ("0.999999999999999999999999999999", "0.000000000000000000000000000001"),
        ("-0.999999999999999999999999999999", "-0.000000000000000000000000000001"),
    ]
    for a, b in basic:
        da, db = Decimal(a), Decimal(b)
        add_cases.append((a, b, normalize(da + db)))
        mul_cases.append((a, b, normalize(da * db)))

    # 2. 随机生成用例
    while len(add_cases) < test_case_count:
        a_str = rand_decimal_str()
        b_str = rand_decimal_str()
        try:
            da = Decimal(a_str)
            db = Decimal(b_str)
            add_cases.append((a_str, b_str, normalize(da + db)))
            mul_cases.append((a_str, b_str, normalize(da * db)))
        except:
            continue  # 跳过极少数无效格式

    # 写入文件
    with open("test/add.test.js", "w") as f:
        f.write('import arbitrary from "../index.js";\n\n[')
        for a, b, s in add_cases[:test_case_count]:
            f.write(f'\n\t["{a}", "{b}", "{s}"],')
        f.write("\n].forEach(([num1, num2, expected]) => {");
        f.write("\n\ttest(`add(${num1}, ${num2})`, () => {");
        f.write("\n\t\texpect(arbitrary.add(num1, num2)).toBe(expected);");
        f.write("\n\t});");
        f.write("\n});");
    print(f"✅ 已生成 {test_case_count} 个任意精度十进制加法测试用例（含科学计数法）到测试文件 add.test.js")

    with open("test/mul.test.js", "w") as f:
        f.write('import arbitrary from "../index.js";\n\n[')
        for a, b, s in mul_cases[:test_case_count]:
            f.write(f'\n\t["{a}", "{b}", "{s}"],')
        f.write("\n].forEach(([num1, num2, expected]) => {");
        f.write("\n\ttest(`mul(${num1}, ${num2})`, () => {");
        f.write("\n\t\texpect(arbitrary.mul(num1, num2)).toBe(expected);");
        f.write("\n\t});");
        f.write("\n});");
    print(f"✅ 已生成 {test_case_count} 个任意精度十进制乘法测试用例（含科学计数法）到测试文件 mul.test.js")

if __name__ == "__main__":
    generate_cases()