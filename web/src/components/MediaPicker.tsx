"use client";

import { ChangeEvent, useState } from "react";

export function MediaPicker() {
	const [isPreviewVideo, setIsPreviewVideo] = useState<boolean>(false);
	const [preview, setPreview] = useState<string | undefined>(undefined);

	function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
		const { files } = event.target;

		if (!files) return;

		if (files[0].type.match("video.*")) {
			setIsPreviewVideo(true);
		} else {
      setIsPreviewVideo(false);
    }

		const previewUrl = URL.createObjectURL(files[0]);

		setPreview(previewUrl);
	}

	return (
		<>
			<input
				onChange={onFileSelected}
				name="coverUrl"
				type="file"
				id="media"
				accept="image/* video/*"
				className="hidden"
			/>

			{preview && !isPreviewVideo && (
				<img
					src={preview}
					className="aspect-video w-full rounded-lg object-cover"
					alt="Imagem selecionada"
				/>
			)}

			{preview && isPreviewVideo && (
				<video
					src={preview}
					className="aspect-video w-full rounded-lg object-cover"
					controls
				/> 	
			)}
		</>
	);
}
