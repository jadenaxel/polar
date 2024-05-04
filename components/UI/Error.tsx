import type { FC } from "react";

import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Colors, Sizes } from "@/config";
import { Context } from "@/Wrapper";

const Error: FC = (): JSX.Element => {
	const { state }: any = useContext(Context);

	const TextColor: any = state.darkMode ? Colors.dark.textColor : Colors.light.textColor;
	const BackgroundColor: any = state.darkMode ? { backgroundColor: Colors.dark.backgroundColor } : { backgroundColor: Colors.light.backgroundColor };

	return (
		<View style={[styles.main, BackgroundColor]}>
			<Text style={[styles.text, { color: TextColor }]}>Error al cargar los datos. Reinicia la aplicacion.</Text>
		</View>
	);
};
const styles = StyleSheet.create({
	main: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: Sizes.paddingHorizontal,
	},
	text: {
		fontSize: Sizes.ajustFontSize(16),
	},
});

export default Error;
