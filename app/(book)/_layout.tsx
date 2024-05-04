import type { FC } from "react";

import { Stack } from "expo-router";

const Books: FC = (): JSX.Element => {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="libros" />
		</Stack>
	);
};

export default Books;
