import type { FC } from "react";

import { View, Text, StyleSheet } from "react-native";

import { Sizes } from "@/config";

const Title: FC<any> = ({ name, color }: { name: string; color: string }): JSX.Element => {
	return <Text style={[styles.main, { color }]}>{name}</Text>;
};
const styles = StyleSheet.create({
	main: {
		fontSize: Sizes.ajustFontSize(20),
		fontWeight: "bold",
		textTransform: "uppercase",
	},
});

export default Title;
