import React from "react";

export const DropDown = ({ itemList, setStatus, status }) => {
  return (
    <div className="dropdown relative">
      <button
        className="border dropdown-toggle px-6 py-2.5 font-medium text-sm leading-tight rounded-full shadow-md transition duration-150 ease-in-out flex items-center whitespace-nowrap"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {status.name}
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="caret-down"
          className="w-2 ml-2"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            fill="currentColor"
            d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
          />
        </svg>
      </button>
      <ul
        className=" dropdown-menu min-w-max absolute bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border "
        aria-labelledby="dropdownMenuButton1"
      >
        {itemList.length != 0 && itemList
          ? itemList.map((item) => (
              <li key={item.id}>
                <div
                  className="cursor-pointer dropdown-item text-base py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100 "
                  onClick={() => setStatus(item)}
                >
                  {item.name}
                </div>
              </li>
            ))
          : ""}
        <li key={0}>
          <div
            className="cursor-pointer dropdown-item text-base py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100 "
            onClick={() => setStatus({ id: 0, name: "Tất cả" })}
          >
            Tất cả
          </div>
        </li>
      </ul>
    </div>
  );
};
