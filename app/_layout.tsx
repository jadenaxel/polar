import type { FC } from "react";

import { Stack } from "expo-router";

import Wrapper from "@/Wrapper";

import "expo-dev-client";

const Index: FC = (): JSX.Element => {
	return (
		<Wrapper>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="(tabs)" />
				<Stack.Screen name="(category)" />
				<Stack.Screen name="(book)" />
			</Stack>
		</Wrapper>
	);
};

export default Index;
