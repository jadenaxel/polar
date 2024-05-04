import type { FC } from "react";

import { useContext, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Alert } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import PDF from "react-native-pdf";

import { Context } from "@/Wrapper";
import { Colors, Sizes } from "@/config";
import { Loader } from "@/components";

const Books: FC = (): JSX.Element => {
	const [error, setError] = useState<boolean>(false);

	const { state }: any = useContext(Context);

	const data: any = state.book;

	const TextColor: any = state.darkMode ? Colors.dark.textColor : Colors.light.textColor;
	const BackgroundColor: any = state.darkMode ? { backgroundColor: Colors.dark.backgroundColor } : { backgroundColor: Colors.light.backgroundColor };

	return (
		<SafeAreaView style={[styles.main, BackgroundColor]}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Text style={[styles.title, { color: TextColor }]}>{data.title}</Text>
				<View style={styles.imageContainer}>{data.img && <Image source={{ uri: data.img }} style={styles.image} />}</View>
				{data.pdf && !error && (
					<View style={{ alignItems: "center" }}>
						<PDF
							trustAllCerts={false}
							source={{ uri: data.pdf, cache: true }}
							enablePaging
							renderActivityIndicator={() => <Loader />}
							style={styles.pdf}
							onError={() => setError(true)}
						/>
					</View>
				)}
				{(error || data.pdf === undefined) && (
					<View style={{ alignItems: "center" }}>
						<Text style={{ color: TextColor, fontSize: Sizes.ajustFontSize(16) }}>Error: No se pudo cargar el documento</Text>
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	main: {
		flex: 1,
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
		width: Sizes.windowWidth / 3.5,
		height: Sizes.windowHeight / 4.9,
	},
	pdf: {
		width: Sizes.windowWidth - 16,
		height: Sizes.windowHeight / 1.6,
	},
});

export default Books;
