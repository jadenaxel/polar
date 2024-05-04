export default {
	Categories: {
		Query: "https://qm0tq6kl.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22category%22%5D%7B+_id%2C+title+%7D",
		QROQ: `*[_type == "category"]{ _id, title }`,
	},
	Especialidad: {
		Query: "https://qm0tq6kl.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type%3D%3D%22especialidad%22%5D%7Bimage%7Basset-%3E%7Burl%7D%7D%2Cpdf1%7Basset-%3E%7Burl%7D%7D%2Cpdf2%7Basset-%3E%7Burl%7D%7D%2C_id%2Ctitle%2C_createdAt%2Ccategory%7D",
		QROQ: '*[_type=="especialidad"]{image{asset->{url}},pdf1{asset->{url}},pdf2{asset->{url}},_id,title,_createdAt,category}',
	},
	Libros: {
		Query: "https://qm0tq6kl.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type%3D%3D%22libro%22%5D%7Bimage%7Basset-%3E%7Burl%7D%7D%2Cpdf%7Basset-%3E%7Burl%7D%7D%2C_id%2Ctitle%2C_createdAt%7D",
		QROQ: '*[_type=="libro"]{image{asset->{url}},pdf{asset->{url}},_id,title,_createdAt}',
	},
	Movie: {
		Query: "https://qm0tq6kl.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type%3D%3D%22movie%22%5D%7Bimage%7Basset-%3E%7Burl%7D%7D%2Ctitle%2C_createdAt%2C_id%2Curl%7D",
		QROQ: '*[_type=="movie"]{image{asset->{url}},title,_createdAt,_id,url}',
	},
	Class: {
		Query: "https://qm0tq6kl.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22class%22%5D%7B_createdAt%2C+image%7Basset-%3E%7Burl%7D%7D%2C+pdf%7Basset-%3E%7Burl%7D%7D%7D",
		QROQ: `*[_type == "class"]{_createdAt, image{asset->{url}}, pdf{asset->{url}}}`,
	},
	Slider: {
		Query: "https://qm0tq6kl.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22slider%22%5D%7B_createdAt%2C+image%7Basset-%3E%7Burl%7D%7D%2C+url%7D",
		QROQ: `*[_type == "slider"]{_createdAt, image{asset->{url}}, url}`,
	},
};
