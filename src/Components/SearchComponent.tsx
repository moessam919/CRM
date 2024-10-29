import { Search } from "lucide-react";
import { useState } from "react";
const SearchComponent = () => {
    const [Open, setOpen] = useState(false);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setOpen(false);
        }
    };

    return (
        <div className="">
            <div
                className="flex justify-between items-center gap-2 bg-gray-100 border border-gray-300 pl-1 md:pl-12 pr-2 text-gray-600 py-2 rounded-md cursor-pointer hover:bg-gray-200 duration-200"
                onClick={() => setOpen(!Open)}
            >
                <Search size={15} />
                <span>بحث عن عميل...</span>
            </div>

            {Open ? (
                <div className="fixed inset-0 w-full z-50">
                    <div
                        className="fixed inset-0 w-full opacity-60 bg-[#84899d]"
                        onClick={handleBackdropClick}
                    />
                    <div className="fixed left-1/2 -translate-x-1/2 mt-20 ">
                        <div className="px-10 py-2 bg-white rounded-md w-[350px] md:w-[500px]">
                            <form
                                action=""
                                className="flex items-center border px-2 rounded mt-5"
                            >
                                <Search size={18} />
                                <input
                                    type="text"
                                    placeholder="بحث عن عميل..."
                                    className="w-full border-none px-4 py-2 rounded-md focus:outline-none focus:ring-0"
                                />
                            </form>

                            <div className="flex justify-center items-center my-8 ">
                                <span>لا يوجد نتائج</span>
                            </div>

                            <div className="border-t-2 my-5"></div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default SearchComponent;
