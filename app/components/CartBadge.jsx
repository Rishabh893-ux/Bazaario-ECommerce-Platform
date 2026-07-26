"use client";

import { useSelector } from "react-redux";
import { selectCartCount } from "@/lib/features/cart/cartSlice";

export default function CartBadge() {
  const count = useSelector(selectCartCount);
  if (!count) return null;
  return (
    <span className="bg-accent text-white text-[9px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center shadow-sm border border-white">
      {count}
    </span>
  );
}
