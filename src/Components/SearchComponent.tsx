import { Search, User2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { actGetSearchCustomers } from "../store/Customers/act/actGetCustomers";
import { useNavigate } from "react-router-dom";

const SearchComponent = () => {
    const { customers, loading } = useAppSelector((state) => state.Customers);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const x = setTimeout(() => {
            if (searchTerm.includes("@")) {
                dispatch(actGetSearchCustomers(`email=${searchTerm}`));
            } else if (Number(searchTerm)) {
                dispatch(actGetSearchCustomers(`phone=${searchTerm}`));
            } else {
                dispatch(actGetSearchCustomers(`name=${searchTerm}`));
            }
        }, 1000);
        return () => clearTimeout(x);
    }, [searchTerm, dispatch]);

    useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current.focus();
        }
    }, [open]);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setOpen(false);
        }
    };

    const handleClickToCustomerLinks = (id: number) => {
        setOpen(false);
        setSearchTerm("");
        navigate(`/customer/${id}`);
    };

    return (
        <div className="">
            <div
                className="flex justify-between items-center gap-2 bg-gray-100 border border-gray-300 pl-1 md:pl-12 pr-2 text-gray-600 py-2 rounded-md cursor-pointer hover:bg-gray-200 duration-200"
                onClick={() => setOpen(!open)}
            >
                <Search size={15} />
                <span>بحث عن عميل...</span>
            </div>

            {open && (
                <div className="fixed inset-0 w-full z-50">
                    <div
                        className="fixed inset-0 w-full opacity-60 bg-[#84899d]"
                        onClick={handleBackdropClick}
                    />
                    <div className="fixed left-1/2 -translate-x-1/2 mt-20">
                        <div className="px-10 py-2 bg-white rounded-md w-[350px] md:w-[500px]">
                            <form
                                onSubmit={(e) => e.preventDefault()}
                                className="flex items-center border px-2 rounded mt-5"
                            >
                                <Search size={18} />
                                <input
                                    type="text"
                                    ref={inputRef}
                                    placeholder="بحث عن عميل..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="w-full border-none px-4 py-2 rounded-md focus:outline-none focus:ring-0"
                                />
                            </form>

                            <div className="my-8 max-h-[450px] overflow-y-auto">
                                {loading === "pending" ? (
                                    <div className="flex justify-center items-center py-8">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                    </div>
                                ) : customers.length > 0 &&
                                  searchTerm.length > 0 ? (
                                    <ul className="space-y-1 ">
                                        {customers.map((customer) => (
                                            <li
                                                key={customer.id}
                                                onClick={() =>
                                                    handleClickToCustomerLinks(
                                                        customer.id
                                                    )
                                                }
                                                className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors group"
                                            >
                                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors">
                                                    <User2
                                                        size={20}
                                                        className="text-blue-500"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-700">
                                                        {customer.name}
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : searchTerm ? (
                                    <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                                        <Search
                                            size={48}
                                            className="text-gray-300 mb-2"
                                        />
                                        <p>لا توجد نتائج للبحث</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-4 text-gray-500">
                                        <Search
                                            size={48}
                                            className="text-gray-300 mb-2"
                                        />
                                        <p>ابدأ البحث عن العملاء</p>
                                    </div>
                                )}
                            </div>

                            <div className="border-t-2 my-5"></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchComponent;
