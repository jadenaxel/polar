import type { FC } from "react";

import { useContext } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Link } from "expo-router";

import { Actions, Context } from "@/Wrapper";
import { Colors, Query, Sizes } from "@/config";
import { Loader, useFetch, Title, Error } from "@/components";

const Home: FC = (): JSX.Element => {
	const { state, dispatch }: any = useContext(Context);

	const { data, error, isLoading }: any = useFetch({ uri: Query.Categories.Query });

	const TextColor: any = state.darkMode ? Colors.dark.textColor : Colors.light.textColor;
	const TextColor2: any = !state.darkMode ? Colors.dark.textColor : Colors.light.textColor;
	const BackgroundColor: any = state.darkMode ? { backgroundColor: Colors.dark.backgroundColor } : { backgroundColor: Colors.light.backgroundColor };
	const BackgroundColor2: any = !state.darkMode ? { backgroundColor: Colors.dark.backgroundColor } : { backgroundColor: Colors.light.backgroundColor };

	if (isLoading) return <Loader />;
	if (error[0]) return <Error />;

	return (
		<SafeAreaView style={[styles.main, BackgroundColor]}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Title name="Categorias" color={TextColor} />
				<View style={styles.categoryContainer}>
					{data
						.sort((a: any, b: any) => a.title.localeCompare(b.title))
						.map((item: any, i: number) => {
							return (
								<Link href={"/(category)/category"} key={i} asChild style={[styles.category, BackgroundColor2]}>
									<Pressable onPress={() => dispatch({ type: Actions.Category, payload: item })}>
										<Text style={[styles.categoryText, { color: TextColor2 }]}>{item.title}</Text>
									</Pressable>
								</Link>
							);
						})}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	main: {
		flex: 1,
		paddingHorizontal: Sizes.paddingHorizontal,
		paddingTop: 20,
	},
	categoryContainer: {
		marginTop: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		flexWrap: "wrap",
		rowGap: 20,
	},
	category: {
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		width: Sizes.windowWidth / 2.4,
		height: Sizes.windowHeight / 10,
	},
	categoryText: {
		width: "80%",
		textAlign: "center",
		fontSize: Sizes.ajustFontSize(16),
	},
});

export default Home;
