"use client";

import { ApothecaryBottle } from "./bottles/ApothecaryBottle";
import { DropperBottle } from "./bottles/DropperBottle";
import { BalmJar } from "./bottles/BalmJar";
import { SyrupBottle } from "./bottles/SyrupBottle";

export type BottleType = "apothecary" | "dropper" | "balm" | "syrup";

type Props = {
  type: BottleType;
  color?: string;
  capColor?: string;
  label?: string;
  pointer?: { x: number; y: number };
  hovered?: boolean;
  phase?: number;
  clickNonce?: number;
};

export function Bottle(props: Props) {
  const { type, ...rest } = props;
  if (type === "dropper") return <DropperBottle {...rest} />;
  if (type === "balm") return <BalmJar {...rest} />;
  if (type === "syrup") return <SyrupBottle {...rest} />;
  return <ApothecaryBottle {...rest} />;
}
