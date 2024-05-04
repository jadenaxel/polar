import type { FC } from "react";

import { useContext, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, FlatList, Animated, Image, Linking } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { useInterstitialAd, TestIds } from "react-native-google-mobile-ads";

import { Actions, Context } from "@/Wrapper";
import { Ads, Colors, LocalStorage, Query, Sizes } from "@/config";
import { Loader, useFetch, Title, Error, Card, Dot } from "@/components";
import { Feather } from "@expo/vector-icons";

const AD_STRING: string = __DEV__ ? TestIds.INTERSTITIAL : Ads.BOOKS_ADS_V1;

let intervalId: any;
let currentScrollX = 0;
let isForward = true;

const Home: FC = (): JSX.Element => {
	const { state, dispatch }: any = useContext(Context);

	const Data = useFetch({ uri: Query.Class.Query });
	const Slider = useFetch({ uri: Query.Slider.Query });

	const { isLoaded, isClosed, load, show } = useInterstitialAd(AD_STRING);

	const maxScrollX: number = Slider.data.length - 1;
	const scrollX: any = useRef(new Animated.Value(0)).current;
	const scrollTo: any = useRef();

	const handleOnScroll = (event: any) => Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })(event);

	const startAutoScroll = () => {
		intervalId = setInterval(() => {
			if (isForward) {
				currentScrollX += 1;
				if (currentScrollX > maxScrollX) {
					currentScrollX = maxScrollX;
					isForward = false;
				}
			} else {
				currentScrollX -= maxScrollX;
				if (currentScrollX < 0) {
					currentScrollX = 0;
					isForward = true;
				}
			}
			scrollTo.current?.scrollToIndex({
				index: currentScrollX,
				animated: true,
			});
		}, 5000);
	};

	const handleMomentumScrollEnd = (): any => {
		isForward = currentScrollX === 0;
		clearInterval(intervalId);
		startAutoScroll();
	};

	const TextColor: any = state.darkMode ? Colors.dark.textColor : Colors.light.textColor;
	const BackgroundColor: any = state.darkMode ? { backgroundColor: Colors.dark.backgroundColor } : { backgroundColor: Colors.light.backgroundColor };

	const darkModeHandler = async () => {
		dispatch({ type: Actions.DarkMode, payload: !state.darkMode });

		await LocalStorage.removeData("darkMode");
		await LocalStorage.saveData("darkMode", !state.darkMode);
	};

	useEffect(() => {
		startAutoScroll();

		return () => {
			clearInterval(intervalId);
		};
	}, [Slider]);

	useEffect(() => {
		load();
	}, [load, isClosed]);

	if (Data.isLoading && Slider.isLoading) return <Loader />;
	if (Data.error[0] && Slider.error[0]) return <Error />;

	return (
		<SafeAreaView style={[styles.main, BackgroundColor]}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
					<Title name="Inicio" color={TextColor} />
					<Pressable onPress={darkModeHandler}>
						<Feather name={state.darkMode ? "sun" : "moon"} size={25} color="red" />
					</Pressable>
				</View>
				{Slider.data && (
					<FlatList
						horizontal
						pagingEnabled
						onScrollToIndexFailed={() => console.log("IDGAF")}
						showsHorizontalScrollIndicator={false}
						onScroll={handleOnScroll}
						ref={scrollTo}
						snapToAlignment="center"
						onMomentumScrollEnd={handleMomentumScrollEnd}
						data={Slider.data}
						keyExtractor={(item: any) => item._createdAt}
						renderItem={(item: any) => {
							return (
								<Pressable
									onPress={() => {
										Linking.openURL(item.item.url);
										if (isLoaded) show();
									}}
									style={styles.slider}
								>
									<Image src={item.item.image.asset.url} style={styles.image} resizeMode="cover" />
								</Pressable>
							);
						}}
					/>
				)}

				{Slider && <Dot data={Slider.data} scrollX={scrollX} />}
				{/* <View>
					<Text style={styles.clases}>Clases Progrsivas</Text>
					<View style={styles.clasesContainer}>
						{data
							.sort((a: any, b: any) => a._createdAt.localeCompare(b._createdAt))
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
				</View> */}
			</ScrollView>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	main: {
		flex: 1,
		paddingHorizontal: Sizes.paddingHorizontal,
		paddingTop: 20,
		paddingBottom: 20,
	},
	slider: {
		width: Sizes.windowWidth - 20,
		marginTop: 30,
	},
	image: {
		width: Sizes.windowWidth - 30,
		height: Sizes.windowHeight / 4,
	},
	clases: {
		fontSize: Sizes.ajustFontSize(20),
		marginTop: 20,
		marginBottom: 10,
	},
	clasesContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 10,
	},
});

export default Home;
