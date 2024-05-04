import type { FC } from "react";

import { useContext } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Context } from "@/Wrapper";
import { Colors, Query, Sizes } from "@/config";
import { Loader, Title, useFetch, Error, Card } from "@/components";

const Movie: FC = (): JSX.Element => {
	const { state }: any = useContext(Context);

	const { data, error, isLoading }: any = useFetch({ uri: Query.Movie.Query });

	const TextColor: any = state.darkMode ? Colors.dark.textColor : Colors.light.textColor;
	const BackgroundColor: any = state.darkMode ? { backgroundColor: Colors.dark.backgroundColor } : { backgroundColor: Colors.light.backgroundColor };

	if (isLoading) return <Loader />;
	if (error[0]) return <Error />;

	return (
		<SafeAreaView style={[styles.main, BackgroundColor]}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Title name="Videos" color={TextColor} />
				<View style={styles.movie}>
					{data
						.sort((a: any, b: any) => a.title.localeCompare(b.title))
						.map((item: any, i: number) => {
							return (
								<Pressable key={i} onPress={() => Linking.openURL(item.url)}>
									<Card item={item} textColor={TextColor} />
								</Pressable>
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
	movie: {
		marginTop: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		flexWrap: "wrap",
		rowGap: 20,
	},
});

export default Movie;
