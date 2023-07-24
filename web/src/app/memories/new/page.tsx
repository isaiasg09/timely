import Link from "next/link";

import { ChevronLeft, Image } from "lucide-react";
import { MediaPicker } from "@/components/MediaPicker";

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

			<form className="mt-4 flex h-full flex-1 flex-col gap-3">
				<div className="flex items-center gap-4">
					<label
						htmlFor="media"
						className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
					>
						<Image className="h-4 w-4" />
						Anexar mídia
					</label>

					<label
						htmlFor="isPublic"
						className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100 "
					>
						<input
							type="checkbox"
							name="isPublic"
							id="isPublic"
							value="false"
							className="h-4 w-4 cursor-pointer rounded border-gray-400 bg-gray-700  text-purple-500 transition"
						/>
						Tornar memória pública
					</label>
				</div>

				
				<MediaPicker />

				<textarea
					name="content"
					spellCheck={false}
					className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0 "
					placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
				/>
			</form>
		</div>
	);
}
