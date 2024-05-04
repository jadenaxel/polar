import type { FC } from "react";

import { memo } from "react";
import { View, StyleSheet, Animated } from "react-native";

import { Sizes } from "@/config";

const Dot: FC<any> = ({ data, scrollX }: any): JSX.Element => {
	return (
		<View style={styles.container}>
			{data.map((_: any, idx: any) => {
				const inputRange = [(idx - 1) * Sizes.windowWidth, idx * Sizes.windowWidth, (idx + 1) * Sizes.windowWidth];

				const dotWidth = scrollX.interpolate({
					inputRange,
					outputRange: [12, 30, 12],
					extrapolate: "clamp",
				});

				const backgroundColor = scrollX.interpolate({
					inputRange,
					outputRange: ["#FF4141", "blue", "#FF4141"],
					extrapolate: "clamp",
				});

				return <Animated.View key={idx.toString()} style={[styles.dot, { width: dotWidth, backgroundColor }]} />;
			})}
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 20,
	},
	dot: {
		width: 12,
		height: 12,
		borderRadius: 6,
		marginHorizontal: 3,
	},
});

export default memo(Dot);
