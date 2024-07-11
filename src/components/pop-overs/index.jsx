import React from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

const CommonPopover = ({ target, children }) => {
  return (
    <Popover className="relative">
      <PopoverButton>{target}</PopoverButton>
      <PopoverPanel anchor="right" className="flex flex-col">
        {children}
      </PopoverPanel>
    </Popover>
  );
};

export default CommonPopover;
