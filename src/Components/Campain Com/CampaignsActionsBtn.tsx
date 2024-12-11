import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Trash2,
    ToggleRight,
    ToggleLeft,
    EllipsisVertical,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
    actDeleteCampaign,
    actUpdateCampaignStatus,
} from "../../store/Campaigns/act/CampaignActions";

const CampaignsActionsBtn: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Select the current campaign from Redux state
    const selectedCampaign = useAppSelector(
        (state) => state.campaigns.selectedCampaign
    );

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the dropdown menu

    // Handle campaign deletion
    const handleDelete = async () => {
        if (!selectedCampaign) return;
        try {
            await dispatch(actDeleteCampaign(selectedCampaign.id)).unwrap();
            navigate("/campaign");
        } catch (error) {
            console.error("Failed to delete campaign", error);
        }
    };

    const handleopendelete = () => {
        setIsDeleteDialogOpen(true);
        setIsMenuOpen(!isMenuOpen);
    };

    // Handle status toggle
    const handleToggleStatus = async () => {
        if (!selectedCampaign) return;
        try {
            const newStatus =
                selectedCampaign.status === "active" ? "draft" : "active";
            await dispatch(
                actUpdateCampaignStatus({
                    id: selectedCampaign.id,
                    status: newStatus,
                })
            ).unwrap();
        } catch (error) {
            console.error("Failed to update campaign status", error);
        }
    };

    if (!selectedCampaign) return null;

    return (
        <div className="flex items-center gap-4 relative">
            {/* More Options Button */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900"
                title="المزيد">
                <EllipsisVertical className="w-6 h-6" />
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
                <div className="absolute top-4 left-0 bg-white shadow-lg rounded-lg mt-2 p-4 w-48 z-10 flex flex-col gap-2">
                    {/* Status Toggle Button */}
                    <button
                        onClick={handleToggleStatus}
                        className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 w-full"
                        title={`${selectedCampaign.status === "active" ? "تعطيل" : "تفعيل"} الحملة`}>
                        {selectedCampaign.status === "active" ? (
                            <ToggleRight className="w-6 h-6 text-green-500" />
                        ) : (
                            <ToggleLeft className="w-6 h-6 text-gray-500" />
                        )}
                        <span>
                            {selectedCampaign.status === "active"
                                ? "إيقاف الحملة"
                                : "تفعيل الحملة"}
                        </span>
                    </button>

                    {/* Delete Button */}
                    <button
                        onClick={() => handleopendelete()}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 w-full"
                        title="حذف الحملة">
                        <Trash2 className="w-5 h-5" />
                        <span className="font-medium">حذف</span>
                    </button>
                </div>
            )}

            {/* Delete Confirmation Dialog */}
            {isDeleteDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <h2 className="text-xl font-bold mb-4">تأكيد الحذف</h2>
                        <p className="mb-6 text-gray-600">
                            هل أنت متأكد من رغبتك في حذف هذه الحملة؟
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setIsDeleteDialogOpen(false)}
                                className="px-4 py-2 border hover:bg-gray-300 rounded-md duration-150">
                                إلغاء
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 border border-gray-300 hover:text-white rounded hover:bg-red-700 hover:border-red-700 duration-150">
                                حذف
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CampaignsActionsBtn;
