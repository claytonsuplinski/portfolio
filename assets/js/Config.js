FOLIO = {};

// For all menu and item images, try to get 800 x 800 pngs
// For all backgrounds, try to get 1024 x 1024 pngs
FOLIO.CONTENT = [
	{
		name: 'Clayton',
		width: 2,
		type: "noclick",
		children: [
			{name: "Clayton Suplinski", subname: "Web Developer / Software Engineer"},  // Mention how I enjoy working on programming / computer graphics projects. Always try to push myself as much as possible. Always try to be on time.
			{name: "Madison, WI", subname: "Space Science and Engineering Center"}
		]
	},
	{
		name: 'Projects',
		width: 3,
		type: "project",
		children: [
			{name: "WxSatS"},
			{name: "VR Ski"},
			{name: "Neutrino VR"},
			{name: "Akatsuki"},
			{name: "Climate Digest"},
			{name: "Cow Catchers"},
			{name: "War Tracker"},
			{name: "Planet Terrains"},
			{name: "Atomic GL"},
			{name: "APFT"},
			{name: "SNPP Monitor"},
			{name: "SNPP Inventory"},
			{name: "McFETCH"},
			{name: "XCD Monitor"},
			{name: "Dynamic City"},
			{name: "FP Shooter"},
			{name: "CNS Stacker"},
			{name: "Music Archive"},
			{name: "Game Selector"},
			{name: "3D Datacenter"},
			{name: "Moshball"},
			{name: "Inventory Dash"},
			{name: "DC Search"},
			{name: "DC Checks"},
			{name: "Edit DC Checks"}
		]
	},
	{
		name: 'Work',
		width: 3,
		type: "work",
		children: [
			{name: "SSEC"},
			{name: "LEL"},
			{name: "Bellin Health"}
		]
	},
	{
		name: 'Education',
		width: 1,
		type: "education",
		children: [
			{name: "UW Madison"},
			{name: "Preble"},
			{name: "St Bernard"}
		]
	},
	{
		name: "Background",
		width: 3,
		type: "background",
		children: [
			{name: "Training"},
			{name: "Research"},
			{name: "Leadership"},
			{name: "Awards"} 
		]
	},
	{
		name: "Skills", 
		width: 3,
		type: "skill"
	}
];

FOLIO.curr_category = FOLIO.CONTENT[0];
FOLIO.curr_node     = FOLIO.CONTENT[0];