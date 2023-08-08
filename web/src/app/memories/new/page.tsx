import Link from "next/link";

import { ChevronLeft } from "lucide-react";
import { NewMemoryForm } from "@/components/NewMemoryForm";

export default function NewMemory() {
	return (
		<div className="flex  flex-1 flex-col">
			<Link
				className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
				href="/"
			>
				<ChevronLeft className="h-4 w-4" />
				voltar à timeline
			</Link>

			<NewMemoryForm />
		</div>
	);
}
