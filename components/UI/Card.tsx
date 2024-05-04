import type { FC } from "react";

import { View, Text, StyleSheet, Image } from "react-native";

import { Sizes } from "@/config";

const Card: FC<any> = ({ item, textColor }: any): JSX.Element => {
	return (
		<View style={styles.main}>
			<Image source={{ uri: item.image?.asset?.url }} style={styles.image} resizeMode="cover" />
			<Text style={[styles.title, { color: textColor }]} numberOfLines={2}>
				{item.title}
			</Text>
		</View>
	);
};
const styles = StyleSheet.create({
	main: {
		width: Sizes.windowWidth / 3.5,
	},
	image: {
		height: Sizes.windowHeight / 4.9,
		borderRadius: 4,
		marginBottom: 10,
	},
	title: {
		fontSize: Sizes.ajustFontSize(15),
		textAlign: "center",
	},
});

export default Card;
