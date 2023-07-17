import { ChevronLeft, Image } from "lucide-react";

export default function NewMemory() {
	return (
		<div>
			<a className="flex items-center gap-2" href="/">
				<ChevronLeft />
				voltar à timeline
			</a>

			<form className="mt-4 flex h-full flex-col gap-3">
				<div className="flex gap-3">
					<button className="flex items-center gap-1">
						<Image />
						Anexar mídia
					</button>

					<div className="flex items-center gap-1">
						<input
							type="checkbox"
							name="public"
							id="public"
							className="h-4 w-4 rounded-sm border border-gray-300 outline-none "
						/>

						<label htmlFor="public">Tornar memória pública</label>
					</div>
				</div>

				<input
					className="bg-transparent outline-none text-xl max-w-fit"
					type="text"
					placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
				/>
			</form>
		</div>
	);
}
