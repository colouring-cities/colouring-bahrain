#!/usr/bin/env python3
"""Repair common paste issues in public/geometries/parcels.geojson."""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PATH = ROOT / "public" / "geometries" / "parcels.geojson"


def strip_z(obj):
    if isinstance(obj, list):
        if len(obj) >= 2 and all(isinstance(x, (int, float)) for x in obj[:2]):
            return obj[:2]
        return [strip_z(x) for x in obj]
    return obj


def main() -> int:
    text = PATH.read_text(encoding="utf-8")

    while True:
        fixed = re.sub(r"(\d)\s*\n\s*(\d)", r"\1\2", text)
        if fixed == text:
            break
        text = fixed

    # Pasted FeatureCollection nested inside features[]
    try:
        data = json.loads(text)
    except json.JSONDecodeError:
        last_complete = None
        for m in re.finditer(
            r'\{\s*"type"\s*:\s*"Feature"[^}]*"properties"\s*:\s*\{[^}]*\}\s*\}',
            text,
            re.DOTALL,
        ):
            last_complete = m
        if not last_complete:
            print("Could not parse JSON and no complete features found.", file=sys.stderr)
            return 1
        text = (
            '{\n  "type": "FeatureCollection",\n  "features": [\n'
            + text[last_complete.start() : last_complete.end()]
            + "\n  ]\n}\n"
        )
        data = json.loads(text)

    features = data.get("features", [])
    if (
        len(features) == 1
        and isinstance(features[0], dict)
        and features[0].get("type") == "FeatureCollection"
    ):
        features = features[0]["features"]
        data = {"type": "FeatureCollection", "features": features}

    for feat in features:
        geom = feat.get("geometry")
        if geom and "coordinates" in geom:
            geom["coordinates"] = strip_z(geom["coordinates"])

    PATH.write_text(json.dumps(data, separators=(",", ":")), encoding="utf-8")
    print(f"Repaired {PATH.name}: {len(features)} features")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
