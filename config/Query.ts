export default {
	Categories: {
		Query: "https://qm0tq6kl.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22category%22%5D%7B+_id%2C+title+%7D",
		QROQ: `*[_type == "category"]{ _id, title }`,
	},
	Especialidad: {
		Query: "https://qm0tq6kl.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22especialidad%22%5D",
		QROQ: '*[_type == "especialidad"]',
	},
	Libros: {
		Query: "https://qm0tq6kl.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22libro%22%5D",
		QROQ: '*[_type == "libro"]',
	},
	Movie: {
		Query: "https://qm0tq6kl.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22movie%22%5D",
		QROQ: '*[_type == "movie"]',
	},
	Class: {
		Query: "https://qm0tq6kl.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22class%22%5D%7B_createdAt%2C+title%2C+img%2C+pdf%7D",
		QROQ: `*[_type == "class"]{_createdAt, title, img, pdf}`,
	},
	Slider: {
		Query: "https://qm0tq6kl.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22slider%22%5D%7B_createdAt%2C+image%7Basset-%3E%7Burl%7D%7D%2C+url%7D",
		QROQ: `*[_type == "slider"]{_createdAt, image{asset->{url}}, url}`,
	},
};
