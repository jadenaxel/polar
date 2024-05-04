import type { FC } from "react";

import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { Actions, Context } from "@/Wrapper";
import { Colors, Query, Sizes } from "@/config";
import { Loader, useFetch, Error } from "@/components";

const Index: FC = (): JSX.Element => {
	const { state, dispatch }: any = useContext(Context);
	const [categoryData, setCategoryData] = useState<any>([]);

	const TextColor: any = state.darkMode ? Colors.dark.textColor : Colors.light.textColor;
	const TextColor2: any = !state.darkMode ? Colors.dark.textColor : Colors.light.textColor;
	const BackgroundColor: any = state.darkMode ? { backgroundColor: Colors.dark.backgroundColor } : { backgroundColor: Colors.light.backgroundColor };
	const BackgroundColor2: any = !state.darkMode ? { backgroundColor: Colors.dark.backgroundColor } : { backgroundColor: Colors.light.backgroundColor };

	const infoCategory: any = state.category;

	const { data, error, isLoading } = useFetch({ uri: Query.Especialidad.Query });

	const FilterData = () => setCategoryData(data.filter((item: any) => item.category?.some((ca: any) => infoCategory._id === ca._ref)));

	useEffect(() => {
		FilterData();
	}, [isLoading]);

	if (isLoading) return <Loader />;
	if (error[0]) return <Error />;

	return (
		<SafeAreaView style={[styles.main, BackgroundColor]}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Text style={[styles.title, { color: TextColor }]}>{infoCategory.title}</Text>
				{categoryData.length > 0 ? (
					<View style={styles.especialidad}>
						{categoryData
							.sort((a: any, b: any) => a.title.localeCompare(b.title))
							.map((item: any, i: number) => {
								return (
									<Link href={"/(category)/especialidad"} key={i} asChild style={[styles.especialidades, BackgroundColor2]}>
										<Pressable onPress={() => dispatch({ type: Actions.Especialidad, payload: item })}>
											<Text style={[styles.especialidadesText, { color: TextColor2 }]}>{item.title}</Text>
										</Pressable>
									</Link>
								);
							})}
					</View>
				) : (
					<View style={styles.content}>
						<Text style={[styles.contentText, { color: TextColor }]}>No hay Contenido</Text>
					</View>
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
		marginTop: 20,
		textAlign: "center",
		fontSize: Sizes.ajustFontSize(18),
	},
	especialidad: {
		flexDirection: "row",
		justifyContent: "space-between",
		flexWrap: "wrap",
	},
	especialidades: {
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		width: Sizes.windowWidth / 2.4,
		height: Sizes.windowHeight / 10,
		marginTop: 20,
	},
	especialidadesText: {
		width: "80%",
		textAlign: "center",
		fontSize: Sizes.ajustFontSize(16),
	},
	content: {
		justifyContent: "center",
		alignItems: "center",
		height: Sizes.windowHeight / 1.4,
	},
	contentText: {
		fontSize: Sizes.ajustFontSize(20),
	},
});

export default Index;
