import LoadingSpinner from "@/components/common/LoadingSpinner";
import { FamilyView } from "@/components/family/FamilyView";
import { Suspense } from "react";

interface PageProps {
    params: { familyId: string }
}

export default function Page({ params }: Readonly<PageProps>) {
    const { familyId } = params;

    return (
        <div className="w-full flex flex-col justify-start items-center p-4">
            <Suspense fallback={<LoadingSpinner />}>
                {/* @ts-expect-error Server Component */}
                <FamilyView familyId={familyId} />
            </Suspense>
        </div>)
}