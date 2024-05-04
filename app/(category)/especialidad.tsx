import type { FC } from "react";

import { useContext, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Pressable, Linking } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import PDF from "react-native-pdf";

import { Colors, Sizes } from "@/config";
import { Context } from "@/Wrapper";
import { Loader } from "@/components";

const Especialidad: FC = (): JSX.Element => {
	const [activeOption, setActiveOption] = useState<boolean>(false);
	const { state }: any = useContext(Context);

	const data: any = state.especialidad;

	const TextColor: any = state.darkMode ? Colors.dark.textColor : Colors.light.textColor;
	const BackgroundColor: any = state.darkMode ? { backgroundColor: Colors.dark.backgroundColor } : { backgroundColor: Colors.light.backgroundColor };

	return (
		<SafeAreaView style={[styles.main, BackgroundColor]}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Text style={[styles.title, { color: TextColor }]}>{data.title}</Text>
				<View style={styles.imageContainer}>{data.image && <Image source={{ uri: data.image }} style={styles.image} />}</View>
				<View style={styles.option}>
					{data.pdf1 && (
						<Pressable
							style={[styles.optionButton, activeOption && { borderBottomColor: "#096892" }]}
							onPress={() => setActiveOption((e: any) => !e)}
						>
							<Text style={[styles.optionText, { color: TextColor }]}>Requisitos</Text>
						</Pressable>
					)}
					{data.pdf2 && (
						<Pressable
							style={[styles.optionButton, !activeOption && { borderBottomColor: "#096892" }]}
							onPress={() => setActiveOption((e: any) => !e)}
						>
							<Text style={[styles.optionText, { color: TextColor }]}>Desarrolladas</Text>
						</Pressable>
					)}
				</View>
				{activeOption && data.pdf1 && (
					<PDF
						trustAllCerts={false}
						source={{ uri: data.pdf1, cache: true }}
						enablePaging
						renderActivityIndicator={() => <Loader />}
						style={styles.pdf}
					/>
				)}
				{!activeOption && data.pdf2 && (
					<PDF
						trustAllCerts={false}
						source={{ uri: data.pdf2, cache: true }}
						enablePaging
						renderActivityIndicator={() => <Loader />}
						style={styles.pdf}
					/>
				)}
				{data.video && (
					<Pressable style={[styles.video, { borderColor: TextColor }]} onPress={() => Linking.openURL(data.video)}>
						<Text style={[styles.videoText, { color: TextColor }]}>Ver Video</Text>
					</Pressable>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	main: {
		flex: 1,
		paddingHorizontal: Sizes.paddingHorizontal,
	},
	title: {
		marginVertical: 20,
		textAlign: "center",
		fontSize: Sizes.ajustFontSize(18),
	},
	imageContainer: {
		alignItems: "center",
		marginBottom: 20,
	},
	image: {
		width: 150,
		height: 150,
	},
	option: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 10,
		marginBottom: 20,
	},
	optionButton: {
		flex: 1,
		borderBottomColor: "#FF4141",
		borderBottomWidth: 2,
		paddingBottom: 5,
	},
	optionText: {
		fontSize: Sizes.ajustFontSize(20),
		textAlign: "center",
	},
	pdf: {
		width: Sizes.windowWidth - 16,
		height: Sizes.windowHeight / 1.6,
	},
	video: {
		marginVertical: 20,
		borderWidth: 1,
		padding: 10,
		borderRadius: 4,
		alignItems: "center",
	},
	videoText: {
		fontSize: Sizes.ajustFontSize(16),
	},
});

export default Especialidad;
