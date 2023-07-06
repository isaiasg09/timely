import React, { useEffect } from "react";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { StatusBar } from "expo-status-bar";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";

import {
	useFonts,
	Roboto_400Regular,
	Roboto_700Bold
} from "@expo-google-fonts/roboto";
import { BaiJamjuree_700Bold } from "@expo-google-fonts/bai-jamjuree";

import blurBg from "./src/assets/bg-blur.png";
import Stripes from "./src/assets/stripes.svg";
import NlwSpacetimeLogo from "./src/assets/nlw-spacetime-logo.svg";
import { api } from "./src/lib/api";

const StyledStripes = styled(Stripes);

const discovery = {
	authorizationEndpoint: "https://github.com/login/oauth/authorize",
	tokenEndpoint: "https://github.com/login/oauth/access_token",
	revocationEndpoint:
		"https://github.com/settings/connections/applications/d99c5a26341cfd571fba"
};

export default function App() {
	const [hasLoadedFonts] = useFonts({
		Roboto_400Regular,
		Roboto_700Bold,
		BaiJamjuree_700Bold
	});

	const [request, response, signInWithGithub] = useAuthRequest(
		{
			clientId: "d99c5a26341cfd571fba",
			scopes: ["identity"],
			redirectUri: makeRedirectUri({
				scheme: "nlw-spacetime-timely"
			})
		},
		discovery
	);

	useEffect(() => {
		// console.log(
		// 	makeRedirectUri({
		// 		scheme: "nlw-spacetime-timely"
		// 	})
		// );

		// console.log(response);

		if (response?.type === "success") {
			const { code } = response.params;

			api
				.post("/register", { code })
				.then((response) => {
					const { token } = response.data;

					console.log(token);
				})
				.catch((err) => {
					console.log(err.response.data);
				});
		}
	}, [response]);

	if (!hasLoadedFonts) {
		return null;
	}

	return (
		<ImageBackground
			source={blurBg}
			className="relative flex-1 items-center  bg-gray-900 px-8 py-2"
			imageStyle={{ position: "absolute", left: "-150%" }}
		>
			<StyledStripes className="absolute left-2 " />

			<View className="flex-1 items-center justify-center gap-6">
				<NlwSpacetimeLogo />

				<View className="space-y-2">
					<Text className="text-center font-title text-2xl leading-tight text-gray-50">
						Sua cápsula do tempo
					</Text>

					<Text className="text-center font-body text-base leading-relaxed text-gray-100">
						Colecione momentos marcantes da sua jornada e compartilhe (se
						quiser) com o mundo!
					</Text>
				</View>

				<TouchableOpacity
					className="rounded-full bg-green-500 px-5 py-2"
					activeOpacity={0.7}
					onPress={() => signInWithGithub()}
				>
					<Text className="font-alt text-sm uppercase text-black">
						Começar a cadastrar
					</Text>
				</TouchableOpacity>
			</View>

			<Text className="text-center font-body text-sm leading-relaxed text-gray-200">
				Feito com 💜 no NLW da Rocketseat
			</Text>
			<StatusBar style="auto" translucent />
		</ImageBackground>
	);
}
