import type { FC } from "react";

import { useContext } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import { Actions, Context } from "@/Wrapper";
import { Colors, Sizes } from "@/config";
import { Feather } from "@expo/vector-icons";

const Header: FC = (): JSX.Element => {
	const { state, dispatch }: any = useContext(Context);

	const BackgroundColor: any = state.darkMode ? { backgroundColor: Colors.dark.backgroundColor } : { backgroundColor: Colors.light.backgroundColor };
	const TextColor: any = state.darkMode ? Colors.dark.textColor : Colors.light.textColor;

	return (
		<View style={[styles.main, BackgroundColor]}>
			<Pressable>
				<Feather name={"menu"} size={20} color={TextColor} />
			</Pressable>
			<Text style={[styles.title, { color: TextColor }]}>Inicio</Text>
			<View></View>
		</View>
	);
};
const styles = StyleSheet.create({
	main: {
		height: Sizes.windowHeight / 7.5,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: Sizes.paddingHorizontal,
	},
	title: {
		fontSize: Sizes.ajustFontSize(20),
	},
});

export default Header;
