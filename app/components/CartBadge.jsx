"use client";

import { useSelector } from "react-redux";
import { selectCartCount } from "@/lib/features/cart/cartSlice";

export default function CartBadge() {
  const count = useSelector(selectCartCount);
  if (!count) return null;
  return (
    <span className="bg-accent text-white text-[10px] font-bold rounded-full h-[18px] min-w-[18px] px-1 flex items-center justify-center shadow-md border-[2px] border-brand">
      {count}
    </span>
  );
}
