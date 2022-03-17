let users = [
	{
		name: 'test1',
		url: 'https://i.redd.it/snoovatar/avatars/31544b4e-e368-4b4c-bff7-e26219bd27a1.png',
		location: {
			x: 0,
			y: 0
		},
	},
	{
		name: 'test2',
		url: 'https://i.redd.it/snoovatar/avatars/4a264df9-ad75-4d18-aa5f-78176fb75ca1.png',
		location: {
			x: 0,
			y: 0
		},
	},
	{
		name: 'test3',
		url: 'https://i.redd.it/snoovatar/avatars/b21f11c7-f319-40d8-93dc-1fdf65b568eb.png',
		location: {
			x: 0,
			y: 0
		},
	},
	{
		name: 'test4',
		url: 'https://i.redd.it/snoovatar/avatars/31544b4e-e368-4b4c-bff7-e26219bd27a1.png',
		location: {
			x: 0,
			y: 0
		},
	},
	{
		name: 'test5',
		url: 'https://i.redd.it/snoovatar/avatars/4a264df9-ad75-4d18-aa5f-78176fb75ca1.png',
		location: {
			x: 0,
			y: 0
		},
	},
	{
		name: 'test6',
		url: 'https://i.redd.it/snoovatar/avatars/b21f11c7-f319-40d8-93dc-1fdf65b568eb.png',
		location: {
			x: 0,
			y: 0
		},
	},
	{
		name: 'test7',
		url: 'https://i.redd.it/snoovatar/avatars/31544b4e-e368-4b4c-bff7-e26219bd27a1.png',
		location: {
			x: 0,
			y: 0
		},
	},
	{
		name: 'test8',
		url: 'https://i.redd.it/snoovatar/avatars/4a264df9-ad75-4d18-aa5f-78176fb75ca1.png',
		location: {
			x: 0,
			y: 0
		},
	},
	{
		name: 'test9',
		url: 'https://i.redd.it/snoovatar/avatars/b21f11c7-f319-40d8-93dc-1fdf65b568eb.png',
		location: {
			x: 0,
			y: 0
		},
	},
	{
		name: 'test10',
		url: 'https://i.redd.it/snoovatar/avatars/31544b4e-e368-4b4c-bff7-e26219bd27a1.png',
		location: {
			x: 0,
			y: 0
		},
	},
	{
		name: 'test11',
		url: 'https://i.redd.it/snoovatar/avatars/4a264df9-ad75-4d18-aa5f-78176fb75ca1.png',
		location: {
			x: 0,
			y: 0
		},
	},
	{
		name: 'test12',
		url: 'https://i.redd.it/snoovatar/avatars/b21f11c7-f319-40d8-93dc-1fdf65b568eb.png',
		location: {
			x: 0,
			y: 0
		},
	},
]

const IMAGE_SCALE = 1;
const AVATAR_IMAGE_WIDTH = 380;
const AVATAR_IMAGE_HEIGHT = 487;
const AVATAR_PLACEMENT_OFFSET = 40; 
const PLACEMENT_MASK_WIDTH = AVATAR_IMAGE_WIDTH - AVATAR_PLACEMENT_OFFSET;
const PLACEMENT_MASK_HEIGHT = AVATAR_IMAGE_HEIGHT - AVATAR_PLACEMENT_OFFSET;
const PLACEMENT_MARGIN = 600;

const PLACEMENT_CANVAS = document.createElement('canvas');

function createPlacementCanvas() {
	// create placement canvas
	var placementMap = new Image();
	
	placementMap.addEventListener('load', function() {
		PLACEMENT_CANVAS.width = placementMap.width;
		PLACEMENT_CANVAS.height = placementMap.height;
		PLACEMENT_CANVAS.getContext('2d').drawImage(placementMap, 0, 0, placementMap.width, placementMap.height);

		placeUsers();
	});
	placementMap.src = 'img/mask.png';
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function placeUsers() {
	let context = PLACEMENT_CANVAS.getContext('2d');
	users.forEach(user => {
		let x = 0;
		let y = 0;
		user.placed = false;
		for(let i = 0; i < 100; i++) {
			x = getRandomInt(PLACEMENT_CANVAS.width - PLACEMENT_MARGIN) + PLACEMENT_MARGIN / 2;
			y = getRandomInt(PLACEMENT_CANVAS.height - PLACEMENT_MARGIN) + PLACEMENT_MARGIN / 2;

			var pixelData = context.getImageData(user.location.x, user.location.y, 1, 1);

			if(pixelData.data[3] > 0) {
				user.placed = true;
				user.location.x = x;
				user.location.y = y;

				context.clearRect(x + AVATAR_PLACEMENT_OFFSET / 2, y, PLACEMENT_MASK_WIDTH * IMAGE_SCALE, PLACEMENT_MASK_HEIGHT * IMAGE_SCALE);
				break;
			} else {
				console.log("retrying");
			}
		}		
	});

	sortUsers();
}

function sortUsers() {
	users.sort(function(first, second) {
		return first.location.y - second.location.y;
	});

	draw();
}

function draw() {
	let canvas = document.getElementById('waldofier');
	if (canvas.getContext) {
		let ctx = canvas.getContext('2d');

		// draw background
		let background = new Image();
		background.addEventListener('load', function() {
			ctx.drawImage(background, 0, 0);	

			// draw users
			users.forEach(user => {
				if(user.placed) {
					var img = new Image();
					img.addEventListener('load', function() {
						ctx.drawImage(img, user.location.x, user.location.y, img.width * IMAGE_SCALE, img.height * IMAGE_SCALE);	
					}, false);
					img.src = user.url;
				}
			});
		}, false);
		background.src = 'img/beach.png';
    }
}

function waldofy() {
	createPlacementCanvas();
}