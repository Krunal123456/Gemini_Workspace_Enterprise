import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent

DQ = chr(34)
BS = chr(92)


def wrap(key: str) -> str:
    return '{t("' + key + '")}'


def unwrap_nested(src: str) -> str:
    """{t({t("X")})} -> {t("X")}"""
    return src.replace('{t({t(', '{t(')


def strip_braces(src: str) -> str:
    """{t("X")} -> t("X") when used inside plain JS (arrays/ternaries)."""
    return re.sub(r'\{t\((\"[^\n\"]*\")\)\}', r'\1', src)


def main() -> None:
    apps = ROOT / "app/[locale]/apps/page.tsx"
    s = apps.read_text()
    s = s.replace('{tp({t("', '{tp("')
    apps.write_text(s)
    print("apps: fixed tp({t(...")

    plans = ROOT / "app/[locale]/plans/[slug]/page.tsx"
    s = unwrap_nested(plans.read_text())
    plans.write_text(s)
    print("plans: unwrapped nested t()")

    pricing = ROOT / "components/pricing/PricingOverview.tsx"
    s = pricing.read_text()
    for old, new in [
        ('index === 0 ? {t(', 'index === 0 ? t('),
        ('predictable budgeting.")} : index === 1 ? {t(', 'predictable budgeting.") : index === 1 ? t('),
        ('a focused team.")} : {t(', 'a focused team.") : t('),
    ]:
        s = s.replace(old, new)
    s = s.replace('organization already funds.")}', 'organization already funds.")')
    pricing.write_text(s)
    print("pricing: ternary uses bare t()")


if __name__ == "__main__":
    main()
