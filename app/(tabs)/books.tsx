import type { FC } from "react";

import { useContext, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, Pressable } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { useInterstitialAd, TestIds } from "react-native-google-mobile-ads";

import { Actions, Context } from "@/Wrapper";
import { Ads, Colors, Query, Sizes } from "@/config";
import { Loader, useFetch, Card, Error, Title } from "@/components";

const AD_STRING: string = __DEV__ ? TestIds.INTERSTITIAL : Ads.BOOKS_ADS_V1;

const Books: FC = (): JSX.Element => {
	const { state, dispatch }: any = useContext(Context);

	const { isLoaded, isClosed, load, show } = useInterstitialAd(AD_STRING);

	const { data, error, isLoading }: any = useFetch({ uri: Query.Libros.Query });

	const TextColor: any = state.darkMode ? Colors.dark.textColor : Colors.light.textColor;
	const BackgroundColor: any = state.darkMode ? { backgroundColor: Colors.dark.backgroundColor } : { backgroundColor: Colors.light.backgroundColor };

	useEffect(() => {
		load();
	}, [load, isClosed]);

	if (isLoading) return <Loader />;
	if (error[0]) return <Error />;

	return (
		<SafeAreaView style={[styles.main, BackgroundColor]}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Title name="Libros" color={TextColor} />
				<View style={styles.book}>
					{data
						.sort((a: any, b: any) => a.title.localeCompare(b.title))
						.map((item: any, i: number) => {
							return (
								<Link asChild href={"/(book)/libros"} key={i}>
									<Pressable
										onPress={() => {
											dispatch({ type: Actions.Book, payload: item });
											if (isLoaded) show();
										}}
									>
										<Card item={item} textColor={TextColor} />
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
	book: {
		marginTop: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		flexWrap: "wrap",
		rowGap: 20,
	},
});

export default Books;
