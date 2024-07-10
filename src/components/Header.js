import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { HiOutlineXMark } from "react-icons/hi2";
import { Dialog, DialogPanel } from "@headlessui/react";
import { BsArrow90DegLeft, BsArrow90DegRight } from "react-icons/bs";
import { BiMobileVibration, BiSolidMobileVibration } from "react-icons/bi";
import { IoEyeOutline } from "react-icons/io5";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-[#dfdfdf] h-[80px] flex items-center fixed w-full top-0 z-[999]">
        <div className="relative w-full">
          <nav
            className="flex items-center justify-between p-4 w-full"
            aria-label="Global"
          >
            <div className="flex">
              <a href="#" className="mr-5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <FaBars />
              </button>
            </div>
            <div className="hidden lg:flex">
              <button className="p-3">My Projects</button>
              <div className="divide-x divide-solid divide-black flex items-center">
                <button className="p-3">-Employee Welcome Kit</button>
                <button className="bg-transparent px-7 py-[10px] relative saved_dot">
                  Saved
                </button>
                <div className="pl-5 py-[10px]">
                  <button className="pr-2">
                    <BsArrow90DegLeft />
                  </button>
                  <button className="pl-2">
                    <BsArrow90DegRight />
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <button className="px-5 flex gap-2 hover:bg-[#f8f8f8] h-[60px] items-center justify-center rounded-full">
                <BiMobileVibration className="text-2xl" />
                Change size
              </button>
              <button className="px-5 flex gap-2 hover:bg-[#f8f8f8] h-[60px] items-center justify-center rounded-full">
                <IoEyeOutline className="text-xl" />
                Preview
              </button>
              <button className="w-[113px] text-white font-medium flex gap-2 bg-black hover:bg-[#262626] h-[60px] items-center justify-center rounded-full">
                Next
              </button>
            </div>
          </nav>
          <Dialog
            className="lg:hidden"
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
          >
            <div className="fixed inset-0 z-10" />
            <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <HiOutlineXMark className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {/* {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))} */}
                  </div>
                  <div className="py-6">
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Log in
                    </a>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </Dialog>
        </div>
      </header>
    </>
  );
};

export default Header;
