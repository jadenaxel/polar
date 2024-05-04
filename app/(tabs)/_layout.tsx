import type { FC } from "react";

import { useContext, useEffect, useState } from "react";

import { Tabs } from "expo-router";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";

import { Sizes, Colors, LocalStorage } from "@/config";
import { Actions, Context } from "@/Wrapper";
import { Loader } from "@/components";

const Tab: FC = (): JSX.Element => {
	const { state, dispatch }: any = useContext(Context);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const TextColor: any = state.darkMode ? Colors.dark.textColor : Colors.light.textColor;
	const TintColor: any = state.darkMode ? Colors.dark.tint : Colors.light.tint;
	const BackgroundColor: any = state.darkMode ? { backgroundColor: Colors.dark.backgroundColor } : { backgroundColor: Colors.light.backgroundColor };

	const LoadDarkMode = async (): Promise<void> => {
		const darkMode: boolean[] = await LocalStorage.getData("darkMode");
		if (darkMode && darkMode.length > 0) dispatch({ type: Actions.DarkMode, payload: darkMode[0] });
		setIsLoading(false);
	};

	useEffect(() => {
		LoadDarkMode();
	}, []);

	if (isLoading) return <Loader />;

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarInactiveTintColor: TextColor,
				tabBarActiveTintColor: TintColor,
				tabBarStyle: {
					...BackgroundColor,
					borderTopWidth: 0,
				},
				tabBarLabelStyle: {
					fontSize: Sizes.ajustFontSize(14),
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Inicio",
					tabBarIcon: () => <FontAwesome6 name="house-chimney" size={20} color={"#FF4141"} />,
				}}
			/>
			<Tabs.Screen
				name="speci"
				options={{
					title: "Especialidades",
					tabBarIcon: () => <FontAwesome6 name="circle" size={20} color={"#FF4141"} />,
				}}
			/>
			<Tabs.Screen
				name="books"
				options={{
					title: "Libros",
					tabBarIcon: () => <FontAwesome5 name="book-open" size={20} color={"#FF4141"} />,
				}}
			/>
			<Tabs.Screen
				name="movie"
				options={{
					title: "Videos",
					tabBarIcon: () => <FontAwesome5 name="film" size={20} color={"#FF4141"} />,
				}}
			/>
		</Tabs>
	);
};

export default Tab;
