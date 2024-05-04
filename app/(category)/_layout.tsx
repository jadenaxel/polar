import type { FC } from "react";

import { Stack } from "expo-router";

const Category: FC = (): JSX.Element => {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="category" />
			<Stack.Screen name="especialidad" />
		</Stack>
	);
};

export default Category;
