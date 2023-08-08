"use client";
import { FormEvent } from "react";

import { Image } from "lucide-react";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";

import { api } from "@/lib/api";

import { MediaPicker } from "./MediaPicker";

export function NewMemoryForm() {
  const router = useRouter();

	async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		let coverUrl = "";

		const formData = new FormData(event.currentTarget);

		const fileToUpload = formData.get("coverUrl");

		if (fileToUpload) {
			const uploadFormData = new FormData();

			uploadFormData.set("file", fileToUpload);

			const uploadToResponse = await api.post("/upload", uploadFormData);

			coverUrl = uploadToResponse.data.fileUrl;
		}

		const token = Cookie.get("token");

		await api.post(
			"/memories",
			{
				coverUrl,
				content: formData.get("content"),
				isPublic: formData.get("isPublic")
			},
			{
				headers: { Authorization: `Bearer ${token}` }
			}
		);

    router.push('/');

	}

	return (
		<form
			className="mt-4 flex h-full flex-1 flex-col gap-3"
			onSubmit={handleCreateMemory}
		>
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

			<button
				type="submit"
				className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase	leading-none text-black transition hover:bg-green-600"
			>
				Criar
			</button>
		</form>
	);
}
