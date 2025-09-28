import { ChartNoAxesColumnIncreasing } from 'lucide-react';

const DashboardCompletionCard = () => {
    return (
        <div className="flex flex-1 items-center justify-between gap-10 rounded-lg border-2 border-gray-100 bg-white px-4 py-6 shadow-[0_2px_2px_rgba(0,0,0,0.15)]">
            <div className="flex flex-col">
                <p className="text-sm font-[500] text-gray-700">
                    Completion Rate
                </p>
                <p className="text-xl font-bold text-black">87%</p>
            </div>
            <div className="rounded-lg bg-[var(--yellow-4)] p-3">
                <ChartNoAxesColumnIncreasing className="text-[var(--yellow-3)]" />
            </div>
        </div>
    );
};

export default DashboardCompletionCard;
