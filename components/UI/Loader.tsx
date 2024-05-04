import type { FC } from "react";

import { useContext } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

import { Colors } from "@/config";
import { Context } from "@/Wrapper";

const Loader: FC = (): JSX.Element => {
	const { state }: any = useContext(Context);

	const spinColor: string = state.darkMode ? Colors.dark.textColor : Colors.light.textColor;
	const BackgroundColor: any = state.darkMode ? { backgroundColor: Colors.dark.backgroundColor } : { backgroundColor: Colors.light.backgroundColor };

	return (
		<View style={[styles.main, BackgroundColor]}>
			<ActivityIndicator color={spinColor} size={30} />
		</View>
	);
};
const styles = StyleSheet.create({
	main: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default Loader;
