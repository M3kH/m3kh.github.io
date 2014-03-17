define([],function(){

	var experiences = [
		{
			year: 2014,

			title: "My CV Update",

			description: "This website, my complete CV and professional work history was completed within a week. I made it with love and JS. Thanks to the power of the latest HTML5 standards, I was able to animate with simple lines of code.<br/><br/> This website can be found on GitHub <a href='https://github.com/M3kH/ideabile.com' target='_blank'>GitHub</a>, below you will find a list of the JS libraries I used to build the site: <ul><li><a href=\"http://www.backbonejs.org\" target=\"_blank\">Backbone.js</a></li><li><a href=\"http://www.http://paperjs.org/\" target=\"_blank\">Paper.js</a></li><li><a href=\"http://www.d3js.org/\" target=\"_blank\">D3.js</a></li></ul>",

			company: "me",

			details: [

				{
					name: "HTML",
					hours: 5,
					category: "programming_languages"
				},
				{
					name: "JS",
					hours: 10,
					category: "programming_languages"
				},
				{
					name: "CSS",
					hours: 8,
					category: "programming_languages"
				},

				{
					name: "Phantom.js",
					hours: 3,
					category: "software"
				},

				{
					name: "Node.js",
					hours: 12,
					category: "software"
				},

				{
					name: "Grunt.js",
					hours: 12,
					category: "software"
				},

				{
					name: "Backbone.js",
					hours: 12,
					category: "software"
				},

				{
					name: "D3.js",
					hours: 6,
					category: "software"
				},
				{
					name: "Paper.js",
					hours: 6,
					category: "software"
				},


				{
					name: "JSON Schemes",
					hours: 10,
					category: "skills"
				},
				{
					name: "Graphic",
					hours: 10,
					category: "skills"
				},
				{
					name: "Data visualization",
					hours: 10,
					category: "skills"
				},
			],

			images: [
				{
					url: "me/ispirations.jpg",
					name: "MailExpress Interface"
				}
			]
		},

		{
			date: "2013-01-01 - 2014-12-31",

			title: "Open Source projects",

			description: "I believe in open source, and I love to share my passion and work with the world whenever possible. This is why I have constructed several repositories with different projects. These can be found below: <ul><li><h2>Tire-Bouchon</h2>A PHP bootstrap framework with ORM integration and JS and View strategies. <br/><br/><a href='https://github.com/M3kH/tire-bouchon' target='_blank'>GitHub</a></li><li><h2>Socks Logger</h2>A node.js runtime sever that is an interface to allow logging of applications and manage logs. <br/><br/><a href='https://github.com/M3kH/socks-logger' target='_blank'>GitHub</a></li><li><h2>PHP Socks</h2>A PHP integration for the <b>Socks Logger</b>. <br/><br/><a href='https://github.com/M3kH/PHP-Socks' target='_blank'>GitHub</a></li></ul>",

			company: "me",

			details: [

				{
					name: "HTML",
					hours: 5,
					category: "programming_languages"
				},
				{
					name: "JS",
					hours: 10,
					category: "programming_languages"
				},
				{
					name: "CSS",
					hours: 8,
					category: "programming_languages"
				},

				{
					name: "Backbone.js",
					hours: 6,
					category: "software"
				},
				{
					name: "MySql",
					hours: 6,
					category: "software"
				},
				{
					name: "Epiphany PHP",
					hours: 6,
					category: "software"
				},
				{
					name: "dNode",
					hours: 6,
					category: "software"
				},
				{
					name: "Socket.io",
					hours: 6,
					category: "software"
				},
				{
					name: "React.js",
					hours: 6,
					category: "software"
				},

				{
					name: "PHP ReadBean",
					hours: 10,
					category: "software"
				},
				{
					name: "Node.js",
					hours: 20,
					category: "software"
				},

				{
					name: "Auto-Deploy env.",
					hours: 5,
					category: "skills"
				},
				{
					name: "Maintanibility",
					hours: 20,
					category: "skills"
				}
			]
		},

		{


			date: "2012-06-18 - 2014-02-18",

			title: "Software developer for Directness",


			description: "Software developer <br/> I joined the company as a Front-End expert, but this was just one of my assignments. <br/> A 'Full-Stack Developer' would be a better description for my work at <b>CustomerGauge</b>.<br/>I collected requirements and managed several projects fully compatible within the CustomerGauge software. These consisted of fully built UIs and functionalities that were rolled out to a global customer base, here some of them: <ul> <li> <h2>Testimonial Publisher</h2> UI and full functionalities to get collected feedback with comments and export them to embed them in your website. </li> <li> <h2>Mail Engine</h2> UI to manage Queue of Contacts records and send them HTML Emails through the MailExpress ( a Python-Enigne ). </li> <li> <h2>Survey Builder</h2> UI and some functionalities for build survey with different widgets and options.</li> </ul>",


			company: "directness",

			details: [

				{
					name: "English",
					hours: 8,
					category: "languages"
				},
				{
					name: "Italian",
					hours: 5,
					category: "languages"
				},
				{
					name: "Spanish",
					hours: 5,
					category: "languages"
				},


				{
					name: "HTML",
					hours: 10,
					category: "programming_languages"
				},
				{
					name: "JS",
					hours: 10,
					category: "programming_languages"
				},
				{
					name: "PHP",
					hours: 8,
					category: "programming_languages"
				},
				{
					name: "SQL",
					hours: 8,
					category: "programming_languages"
				},
				{
					name: "CSS",
					hours: 8,
					category: "programming_languages"
				},
				{
					name: "LESS",
					hours: 3,
					category: "programming_languages"
				},


				{
					name: "Illustrator",
					hours: 6,
					category: "software",
					related : {
						skill : ["graphic-design", "creativity"]
					}
				},
				{
					name: "Photoshop",
					hours: 7,
					category: "software",
					related : {
						skill : ["graphic-design", "creativity"]
					}
				},
				{
					name: "High Charts",
					hours: 9,
					category: "software",
					related : {
						language : "js"
					}
				},
				{
					name: "Apache",
					hours: 9,
					category: "software"
				},
				{
					name: "Zend Server",
					hours: 1,
					category: "software"
				},
				{
					name: "Node.js",
					hours: 6,
					category: "software"
				},
				{
					name: "PhantomJS",
					hours: 3,
					category: "software"
				},
				{
					name: "RequireJS",
					hours: 3,
					category: "software"
				},
				{
					name: "Vagrant",
					hours: 8,
					category: "software"
				},


				{
					name: "Json Schemes",
					hours: 10,
					category: "skills"
				},
				{
					name: "Creativity",
					hours: 6,
					category: "skills"
				},
				{
					name: "UI Practical Design",
					hours: 8,
					category: "skills"
				},
				{
					name: "Project Plan",
					hours: 3,
					category: "skills"
				},
				{
					name: "Data Mapping",
					hours: 6,
					category: "skills"
				},
				{
					name: "SQL Dinamics Query",
					hours: 8,
					category: "skills"
				},
				{
					name: "UX Design",
					hours: 2,
					category: "skills"
				},
				{
					name: "AMD JS",
					hours: 7,
					category: "skills"
				},
				{
					name: "OOP",
					hours: 10,
					category: "skills"
				},
				{
					name: "MVC",
					hours: 4,
					category: "skills"
				}
			],

			url: "http://www.customergauge.com",


			status: "published",

			screenshots: [
				{
					url: "images/whaterverfile.jpg",
					name: "Landing page",
					link: "",
					desc: ""
				}
			],

			images: [
				{
					url: "directness/001.jpg",
					name: "MailExpress Interface"
				},
				{
					url: "directness/002.jpg",
					name: "MailExpress Interface"
				},
				{
					url: "directness/004.png",
					name: "MailExpress Interface"
				},
				{
					url: "directness/006.jpg",
					name: "MailExpress Interface"
				},
				{
					url: "directness/007.png",
					name: "MailExpress Interface"
				},
				{
					url: "directness/008.png",
					name: "MailExpress Interface"
				},
				{
					url: "directness/009.png",
					name: "MailExpress Interface"
				},
				{
					url: "directness/010.png",
					name: "MailExpress Interface"
				},
				{
					url: "directness/011.png",
					name: "MailExpress Interface"
				},
				{
					url: "directness/012.png",
					name: "MailExpress png"
				},
				{
					url: "directness/013.png",
					name: "MailExpress Interface"
				},
				{
					url: "directness/014.png",
					name: "MailExpress Interface"
				}
			]
		},

		{


			date: "2012-01-01 - 2012-06-18",

			title: "Graphic Designer and Business Assistant at Impronte Digitali",


			description: "Project Design and Executive of Communication for Advertising and Decorations, with printing and digital technologies.<br/> I was responsible for understanding the customer needs and finding a graphic and doable solution.<br/> I was in charge of satisfying the customer from the sketch to the final product.",


			company: "improntedigitali",

			details: [


				{
					name: "HTML",
					hours: 2,
					category: "programming_languages"
				},
				{
					name: "JS",
					hours: 3,
					category: "programming_languages"
				},
				{
					name: "PHP",
					hours: 4,
					category: "programming_languages"
				},
				{
					name: "SQL",
					hours: 2,
					category: "programming_languages"
				},
				{
					name: "CSS",
					hours: 6,
					category: "programming_languages"
				},


				{
					name: "Illustrator",
					hours: 6,
					category: "software",
					related : {
						skill : ["graphic-design", "creativity"]
					}
				},
				{
					name: "Photoshop",
					hours: 7,
					category: "software",
					related : {
						skill : ["graphic-design", "creativity"]
					}
				},
				{
					name: "Corel Draw",
					hours: 9,
					category: "software",
					related : {
						skill : ["graphic-design", "creativity"]
					}
				},
				{
					name: "Blender",
					hours: 8,
					category: "software",
					related : {
						skill : ["graphic-design", "creativity"]
					}
				},


				{
					name: "Mimaky Plotter",
					hours: 5,
					category: "tools"
				},
				{
					name: "CNC vinil cutter",
					hours: 7,
					category: "tools"
				},
				{
					name: "Transfer Machine",
					hours: 2,
					category: "tools"
				},
				{
					name: "Cutter Machine",
					hours: 8,
					category: "tools"
				},



				{
					name: "Creativity",
					hours: 9,
					category: "skills"
				},
				{
					name: "Graphic Design",
					hours: 9,
					category: "skills"
				},
				{
					name: "Business Management",
					hours: 3,
					category: "skills"
				},
				{
					name: "Car Wrapping",
					hours: 3,
					category: "skills"
				},
				{
					name: "Small format",
					hours: 9,
					category: "skills"
				},
				{
					name: "Windows Stickers",
					hours: 3,
					category: "skills"
				},
				{
					name: "Poster Designing",
					hours: 6,
					category: "skills"
				},
				{
					name: "UX Design",
					hours: 1,
					category: "skills"
				},
				{
					name: "Project Plan",
					hours: 4,
					category: "skills"
				}
			],

			url: "http://www.improntedigitalionline.it/",


			status: "published",

			screenshots: [
				{
					url: "images/whaterverfile.jpg",
					name: "Landing page",
					link: "",
					desc: ""
				}
			],

			images: [
				{
					url: "impronte/01.png",
					name: "Landing page"
				},
				{
					url: "impronte/02.png",
					name: "Landing page"
				},
				{
					url: "impronte/03.png",
					name: "Landing page"
				},
				{
					url: "impronte/04.png",
					name: "Landing page"
				},
				{
					url: "impronte/05.png",
					name: "Landing page"
				},
				{
					url: "impronte/06.png",
					name: "Landing page"
				},
				{
					url: "impronte/07.png",
					name: "Landing page"
				},
				{
					url: "impronte/08.png",
					name: "Landing page"
				}
			]
		},

		{


			date: "2011-01-01 - 2011-12-31",

			title: "Software Developer and Customer Assistant at Centro Italiano D'Ergonomia",


			description: "In the beginning I joined the company to make a Software for Task and Bills Management, but in the year that I was employed there, we moved towards other strategies for business needs. I was then in charge of finding the best programming techniques to add value to the role. From the assistance of the customer till the communication strategies and products. In this year I was responsible for: <ul> <li>Task and Bill Basic Management System</li> <li>Booker for Educational Courses</li> <li>Software for autogeneration of PDF Certificates</li> </ul>",


			company: "cie",

			details: [




				{
					name: "HTML",
					hours: 10,
					category: "programming_languages"
				},
				{
					name: "JS",
					hours: 8,
					category: "programming_languages"
				},
				{
					name: "PHP",
					hours: 4,
					category: "programming_languages"
				},
				{
					name: "SQL",
					hours: 2,
					category: "programming_languages"
				},
				{
					name: "CSS",
					hours: 6,
					category: "programming_languages"
				},


				{
					name: "Blender",
					hours: 8,
					category: "software",
					related : {
						skill : ["graphic-design", "creativity"]
					}
				},


				{
					name: "Business Management",
					hours: 6,
					category: "skills"
				},
				{
					name: "Creativity",
					hours: 2,
					category: "skills"
				},
				{
					name: "Graphic Design",
					hours: 4,
					category: "skills"
				},
				{
					name: "Windows Stickers",
					hours: 3,
					category: "skills"
				},
				{
					name: "Small format",
					hours: 9,
					category: "skills"
				},
				{
					name: "Poster Designing",
					hours: 6,
					category: "skills"
				},
				{
					name: "UX Design",
					hours: 1,
					category: "skills"
				}
			],

			url: "http://www.centro-ergonomia.it/",


			status: "dismissed"
		},

		{


			year: "2010",

			title: "Web Portal, for Ordine Ingegneri delle Provincia di Pistoia",


			description: "Ordine degli ingegneri, is a registry of engineers for the province of Pistoia, after winning public competitions for the best quality and technical offers. We focused on improving the website for the engineers focusing on their needs and preferences.<br/> We used a <b>WordPress</b> base and we customized it to get a <b>CMS</b> style. Inside the platform, I built many features as plugins to the platform. These included: <ul> <li><h2>Members synchronization</h2> They have a database and they want to show their members in the website; I deliver them something more, the possibility to synchronize the database and live the power of the data to the user which would be able to get control of the profile if their email is in the registry.</li> <li><h2>Custom Profile Informations</h2> Each member has the possibility to add decide which information to show, and even add additional ones like: Picture Profile, Personal CV and tag himself to a keywords of their job.</li></ul>",


			company: "archita",

			details: [


				{
					name: "HTML",
					hours: 9,
					category: "programming_languages"
				},
				{
					name: "JS",
					hours: 5,
					category: "programming_languages"
				},
				{
					name: "PHP",
					hours: 10,
					category: "programming_languages"
				},
				{
					name: "SQL",
					hours: 8,
					category: "programming_languages"
				},
				{
					name: "CSS",
					hours: 5,
					category: "programming_languages"
				},


				{
					name: "WordPress",
					hours: 20,
					category: "software",
					related : {
						programming_languages : "PHP"
					}
				},
				{
					name: "MySQL",
					hours: 5,
					category: "software",
					related : {
						programming_languages : "SQL"
					}
				},
				{
					name: "Apache",
					hours: 7,
					category: "software",
					related : {
					}
				}
			],

			images:[
				{
					url: "archita/odi/01.png",
					name: "Landing page"
				},
				{
					url: "archita/odi/02.png",
					name: "Landing page"
				},
				{
					url: "archita/odi/03.png",
					name: "Landing page"
				},
				{
					url: "archita/odi/04.png",
					name: "Landing page"
				}
			]


		},


		{


			year: "2010",

			title: "EuroPackaging Italia Website",

			description: "Website creation EuroPackaging, an Italian company of packaging products.",

			url: "http://www.europackaging.it",

			company: "archita",

			details: [




				{
					name: "HTML",
					hours: 9,
					category: "programming_languages"
				},
				{
					name: "JS",
					hours: 5,
					category: "programming_languages"
				},
				{
					name: "PHP",
					hours: 10,
					category: "programming_languages"
				},
				{
					name: "SQL",
					hours: 8,
					category: "programming_languages"
				},
				{
					name: "CSS",
					hours: 5,
					category: "programming_languages"
				},


				{
					name: "Smarty PHP",
					hours: 8,
					category: "software",
					related : {
						programming_languages : "PHP"
					}
				},
				{
					name: "MySQL",
					hours: 5,
					category: "software",
					related : {
						programming_languages : "SQL"
					}
				},
				{
					name: "Apache",
					hours: 7,
					category: "software",
					related : {
					}
				}
			],

			images:[
				{
					url: "archita/europackaging/01.png",
					name: "Landing page"
				},
				{
					url: "archita/europackaging/02.png",
					name: "Landing page"
				},
				{
					url: "archita/europackaging/03.png",
					name: "Landing page"
				}
			]

		},


		{


			year: "2010",

			title: "Set of graphic icons for the industry SCA, at archita company.",


			description: "Simple set of icons for B2B communications in the paper industry world.",


			company: "archita",

			details: [




				{
					name: "Corel Draw",
					hours: 7,
					category: "software",
					related : {
						skill : ["graphic-design", "creativity"]
					}
				},


				{
					name: "Creativity",
					hours: 8,
					category: "skills"
				},
				{
					name: "Commmunication",
					hours: 5,
					category: "skills"
				},
				{
					name: "Graphic Design",
					hours: 9,
					category: "skills"
				}
			],


			status: "published"
		},

		{


			year: "2010",

			title: "Stock photos for products of industry SCA",


			description: "Stock photos of final products, clean and cut, for advertising materials.",


			company: "archita",

			details: [




				{
					name: "Canon D7",
					hours: 5,
					category: "tools",
					related : {
						skill : ["photography"]
					}
				},


				{
					name: "Photoshop",
					hours: 7,
					category: "software",
					related : {
						skill : ["graphic-design", "creativity"]
					}
				},


				{
					name: "Photography",
					hours: 8,
					category: "skills"
				},
				{
					name: "Photo Manipulation",
					hours: 5,
					category: "skills"
				}
			],


			status: "published"
		},

		{


			year: "2010",

			title: "Cameraman for Learn to Leed",


			description: "I manage the Video Recording of the Event \"Learn to Leed\" at the industry Fabio Pierini S.P.A ",


			company: "archita",

			details: [




				{
					name: "Sony Camera",
					hours: 5,
					category: "tools",
					related : {
						skill : ["photography"]
					}
				},


				{
					name: "Video Studio Pro",
					hours: 7,
					category: "software",
					related : {
						skill : ["video-editing", "creativity"]
					}
				},


				{
					name: "Video Editing",
					hours: 8,
					category: "skills"
				}
			],


			status: "published"
		},

		{


			year: "2010",

			title: "Logo paint for University of Pisa",


			description: "Logo paint, made with spray and stencil for the Pisa Univeristy, at the “Laboratorio di cultura digitale”.",


			company: "unipi",

			details: [




				{
					name: "Plotter",
					hours: 6,
					category: "tools",
					related : {
						skill : ["manuality"]
					}
				},
				{
					name: "Vinil sticker",
					hours: 6,
					category: "tools"
				},
				{
					name: "Spray Paint",
					hours: 2,
					category: "tools"
				},


				{
					name: "Vinil sticker",
					hours: 6,
					category: "materials"
				},


				{
					name: "PVC Sticker Application",
					hours: 4,
					category: "skills"
				}
			],


			status: "published"
		},

		{


			year: "2010",

			title: "Murales at \"Arte sui tubi\"",


			description: "Murales creation 3x2m for the “Arte sui tubi” event at the Leopolda station.",


			company: "leopolda",

			details: [




				{
					name: "Plotter",
					hours: 6,
					category: "tools",
					related : {
						skill : ["manuality"]
					}
				},
				{
					name: "Vinil sticker",
					hours: 6,
					category: "tools"
				},
				{
					name: "Spray Paint",
					hours: 2,
					category: "tools"
				},


				{
					name: "Vinil sticker",
					hours: 6,
					category: "materials"
				},


				{
					name: "PVC Sticker Application",
					hours: 4,
					category: "skills"
				}
			],


			status: "published"
		},

		{


			year: "2010",

			title: "Live Painting at Stazione Leopolda",


			description: "Murales creation 4x2m for the live painting event at the Stazione Leopolda.",


			company: "leopolda",

			details: [




				{
					name: "Plotter",
					hours: 6,
					category: "tools",
					related : {
						skill : ["manuality"]
					}
				},
				{
					name: "Vinil sticker",
					hours: 6,
					category: "tools"
				},
				{
					name: "Spray Paint",
					hours: 2,
					category: "tools"
				},


				{
					name: "Vinil sticker",
					hours: 6,
					category: "materials"
				},


				{
					name: "PVC Sticker Application",
					hours: 4,
					category: "skills"
				}
			],


			status: "published"
		},

		{


			year: "2010",

			title: "Video editing for the company SCA, at archita company.",


			description: "For internal presentation and then for the B2B patterns, videos editing and mastering for new products.",


			company: "archita",

			details: [




				{
					name: "Video Studio Pro",
					hours: 7,
					category: "software",
					related : {
						skill : ["video-editing", "creativity"]
					}
				},


				{
					name: "Video Editing",
					hours: 8,
					category: "skills"
				}
			],


			status: "published"
		},

		{


			year: "2010",

			title: "3D Stand for Paper Expo",


			description: "3D rendering for the industry Teknoweb, at archita company.",


			company: "archita",

			details: [




				{
					name: "Google Sketch-up",
					hours: 10,
					category: "software",
					related : {
						skill : ["3d-cad", "creativity"]
					}
				},


				{
					name: "3D CAD",
					hours: 8,
					category: "skills"
				}
			],


			status: "published"
		},

		{


			year: "2010",

			title: "3D Stand for Artigian Carta",


			description: "3D rendering for the Artigian Carta stand for Paper Industry Expo",


			company: "archita",


			details: [




				{
					name: "Video Studio Pro",
					hours: 7,
					category: "software",
					related : {
						skill : ["video-editing", "creativity"]
					}
				},


				{
					name: "Video Editing",
					hours: 8,
					category: "skills"
				}
			],


			status: "published"
		},

		{


			year: "2010",

			title: "Video editing for Artigian Carta",


			description: "Video editing for the Artigian Carta industry, at archita company",


			company: "archita",

			details: [


				{
					name: "Video Studio Pro",
					hours: 7,
					category: "software",
					related : {
						skill : ["video-editing", "creativity"]
					}
				},


				{
					name: "Video Editing",
					hours: 8,
					category: "skills"
				}
			],



			status: "published"
		},

		{


			year: "2010",

			title: "Creation of “Content Management System” for archita.",


			description: "Simple CMS for news and content management.",


			company: "archita",

			details: [




				{
					name: "HTML",
					hours: 9,
					category: "programming_languages"
				},
				{
					name: "JS",
					hours: 5,
					category: "programming_languages"
				},
				{
					name: "PHP",
					hours: 10,
					category: "programming_languages"
				},
				{
					name: "SQL",
					hours: 8,
					category: "programming_languages"
				},
				{
					name: "CSS",
					hours: 5,
					category: "programming_languages"
				},


				{
					name: "Smarty PHP",
					hours: 8,
					category: "software",
					related : {
						programming_languages : "PHP"
					}
				},
				{
					name: "MySQL",
					hours: 5,
					category: "software",
					related : {
						programming_languages : "SQL"
					}
				},
				{
					name: "Apache",
					hours: 7,
					category: "software",
					related : {
					}
				}
			],


			status: "dismissed"
		},

		{


			year: "2010",

			title: "Website for Passerini Recuperi",


			description: "Website creation Passerini Recuperi, recycling company.",

			url: "http://www.passerinirecuperi.com",


			company: "archita",

			details: [




				{
					name: "HTML",
					hours: 9,
					category: "programming_languages"
				},
				{
					name: "JS",
					hours: 5,
					category: "programming_languages"
				},
				{
					name: "PHP",
					hours: 10,
					category: "programming_languages"
				},
				{
					name: "SQL",
					hours: 8,
					category: "programming_languages"
				},
				{
					name: "CSS",
					hours: 5,
					category: "programming_languages"
				},


				{
					name: "Smarty PHP",
					hours: 8,
					category: "software",
					related : {
						programming_languages : "PHP"
					}
				},
				{
					name: "MySQL",
					hours: 5,
					category: "software",
					related : {
						programming_languages : "SQL"
					}
				},
				{
					name: "Apache",
					hours: 7,
					category: "software",
					related : {
					}
				}
			],

			images:[
				{
					url: "archita/passerini_recuperi/01.png",
					name: "Landing page"
				},
				{
					url: "archita/passerini_recuperi/02.png",
					name: "Landing page"
				},
				{
					url: "archita/passerini_recuperi/03.png",
					name: "Landing page"
				},
				{
					url: "archita/passerini_recuperi/04.png",
					name: "Landing page"
				}
			],

			status: "dismissed"
		},


		{


			year: "2010",

			title: "Website for Teknoweb s.r.l.",


			description: "Website creation for Teknoweb, industry of machinary dedicated to the creation of wet wipes",

			url: "http://www.teknoweb.com/",


			company: "archita",

			details: [


				{
					name: "HTML",
					hours: 9,
					category: "programming_languages"
				},
				{
					name: "JS",
					hours: 5,
					category: "programming_languages"
				},
				{
					name: "PHP",
					hours: 10,
					category: "programming_languages"
				},
				{
					name: "SQL",
					hours: 8,
					category: "programming_languages"
				},
				{
					name: "CSS",
					hours: 5,
					category: "programming_languages"
				},


				{
					name: "Smarty PHP",
					hours: 8,
					category: "software",
					related : {
						programming_languages : "PHP"
					}
				},
				{
					name: "MySQL",
					hours: 5,
					category: "software",
					related : {
						programming_languages : "SQL"
					}
				},
				{
					name: "Apache",
					hours: 7,
					category: "software",
					related : {
					}
				}
			],


			images:[
				{
					url: "archita/teknoweb/01.png",
					name: "Landing page"
				},
				{
					url: "archita/teknoweb/02.png",
					name: "Landing page"
				},
				{
					url: "archita/teknoweb/03.png",
					name: "Landing page"
				}
			]

		},


		{


			year: "2010",

			title: "Website creation for the café \"Note Amare\"",


			description: "Website creation for the café “Note Amare”, at archita company.",

			url: "http://www.noteamare.it/",


			company: "archita",

			details: [


				{
					name: "HTML",
					hours: 9,
					category: "programming_languages"
				},
				{
					name: "JS",
					hours: 5,
					category: "programming_languages"
				},
				{
					name: "PHP",
					hours: 10,
					category: "programming_languages"
				},
				{
					name: "SQL",
					hours: 8,
					category: "programming_languages"
				},
				{
					name: "CSS",
					hours: 5,
					category: "programming_languages"
				},


				{
					name: "Smarty PHP",
					hours: 8,
					category: "software",
					related : {
						programming_languages : "PHP"
					}
				},
				{
					name: "MySQL",
					hours: 5,
					category: "software",
					related : {
						programming_languages : "SQL"
					}
				},
				{
					name: "Apache",
					hours: 7,
					category: "software",
					related : {
					}
				}
			],


			status: "dismissed",
		},

		{


			year: "2010",

			title: "Wesite and CMS creation DixitPress.",


			description: "Wesite creation DixitPress and CMS system for manage the online publication of media.",

			url: "http://www.dixitpress.it/",


			company: "dixitpress",

			details: [


				{
					name: "HTML",
					hours: 9,
					category: "programming_languages"
				},
				{
					name: "JS",
					hours: 5,
					category: "programming_languages"
				},
				{
					name: "PHP",
					hours: 10,
					category: "programming_languages"
				},
				{
					name: "SQL",
					hours: 8,
					category: "programming_languages"
				},
				{
					name: "CSS",
					hours: 5,
					category: "programming_languages"
				},


				{
					name: "Smarty PHP",
					hours: 8,
					category: "software",
					related : {
						programming_languages : "PHP"
					}
				},
				{
					name: "MySQL",
					hours: 5,
					category: "software",
					related : {
						programming_languages : "SQL"
					}
				},
				{
					name: "Apache",
					hours: 7,
					category: "software",
					related : {
					}
				}
			],


			status: "dismissed",
		},


		{


			year: "2009",

			title: "Sulle note di Ale",


			description: "Official photographer for the event “Sulle note di Ale”",


			company: "me",

			details: [


				{
					name: "Nikon D60",
					hours: 5,
					category: "tools",
					related : {
						skill : ["photography"]
					}
				},


				{
					name: "Photoshop",
					hours: 7,
					category: "software",
					related : {
						skill : ["graphic-design", "creativity"]
					}
				},


				{
					name: "Photography",
					hours: 8,
					category: "skills"
				},
				{
					name: "Photo Manipulation",
					hours: 5,
					category: "skills"
				}
			],


			status: "published"
		},

		{


			year: "2009",

			title: "Official World Ju-Jitsu Federation Italy",


			description: "Website creation of the “Official World Ju-Jitsu Federation Italy”, working on graphics, format and server programming.",

			url: "http://www.wjjf.it/",


			company: "wjjf",

			details: [


				{
					name: "HTML",
					hours: 9,
					category: "programming_languages"
				},
				{
					name: "JS",
					hours: 5,
					category: "programming_languages"
				},
				{
					name: "PHP",
					hours: 10,
					category: "programming_languages"
				},
				{
					name: "SQL",
					hours: 8,
					category: "programming_languages"
				},
				{
					name: "CSS",
					hours: 5,
					category: "programming_languages"
				},


				{
					name: "Smarty PHP",
					hours: 8,
					category: "software",
					related : {
						programming_languages : "PHP"
					}
				},
				{
					name: "MySQL",
					hours: 5,
					category: "software",
					related : {
						programming_languages : "SQL"
					}
				},
				{
					name: "Apache",
					hours: 7,
					category: "software",
					related : {
					}
				}
			],


			status: "dismissed",
		},

		{


			year: "2009",

			title: "Photographer Teatro Lux Pisa",


			description: "Photographer for the theatrical season at Teatro lux in Pisa.",


			company: "teatro-lux",

			details: [


				{
					name: "Nikon D60",
					hours: 5,
					category: "tools",
					related : {
						skill : ["photography"]
					}
				},


				{
					name: "Photoshop",
					hours: 7,
					category: "software",
					related : {
						skill : ["graphic-design", "creativity"]
					}
				},


				{
					name: "Photography",
					hours: 8,
					category: "skills"
				},
				{
					name: "Photo Manipulation",
					hours: 5,
					category: "skills"
				}
			],


			status: "published"
		},

		{


			year: "2007",

			title: "Comune di Lampedusa",


			description: "Flyer for the “Notte bianca” event in Lampedusa (Ag).",


			company: "lampedusa",

			details: [


				{
					name: "Illustrator",
					hours: 6,
					category: "tools",
					related : {
						skill : ["graphic-design", "creativity"]
					}
				},
				{
					name: "Photoshop",
					hours: 7,
					category: "software",
					related : {
						skill : ["graphic-design", "creativity"]
					}
				},


				{
					name: "Creativity",
					hours: 10,
					category: "skills"
				},
				{
					name: "Graphic Design",
					hours: 10,
					category: "skills"
				}
			],


			status: "published",

			screenshots: [
				{
					url: "images/whaterverfile.jpg",
					name: "Landing page",
					link: "",
					desc: ""
				}
			],
		},


		{


			year: "2007",

			title: "Mr. Box Personal Projects",


			description: "Social multimedia project creation, Mr. Box.",

			url: "http://www.mrbox.org",


			company: "me",

			details: [


				{
					name: "Gimp",
					hours: 7,
					category: "software",
					related : {
						skill : ["graphic-design", "creativity"]
					}
				},


				{
					name: "Canon Powershot A640",
					hours: 5,
					category: "tools",
					related : {
						skill : ["photography"]
					}
				},


				{
					name: "Creativity",
					hours: 10,
					category: "skills"
				},
				{
					name: "Graphic Design",
					hours: 10,
					category: "skills"
				}
			],


			status: "published",

			screenshots: [
				{
					url: "images/whaterverfile.jpg",
					name: "Landing page",
					link: "",
					desc: ""
				}
			],
		},

		{


			year: "2006",

			title: "Samarcanda",


			description: "Designer for the t-shirt to Samdays event (Riva del Garda).",


			company: "me",

			details: [


				{
					name: "Illustrator",
					hours: 7,
					category: "software",
					related : {
						skill : ["graphic-design", "creativity"]
					}
				},


				{
					name: "Creativity",
					hours: 10,
					category: "skills"
				},
				{
					name: "Graphic Design",
					hours: 10,
					category: "skills"
				}
			],


			status: "published",

			screenshots: [
				{
					url: "images/whaterverfile.jpg",
					name: "Landing page",
					link: "",
					desc: ""
				}
			],
		},

		{


			year: "2006",

			title: "Graphic HorrorMovie.it",


			description: "Web design for the web site HorrorMovie.it",


			company: "me",

			details: [


				{
					name: "Gimp",
					hours: 7,
					category: "software",
					related : {
						skill : ["graphic-design", "creativity"]
					}
				},


				{
					name: "Creativity",
					hours: 10,
					category: "skills"
				},
				{
					name: "Graphic Design",
					hours: 10,
					category: "skills"
				}
			],


			status: "published",

			screenshots: [
				{
					url: "images/whaterverfile.jpg",
					name: "Landing page",
					link: "",
					desc: ""
				}
			],
		},

		{


			year: "2009",

			title: "B&B Atenea 191",


			description: "Website creation, for the B&B Atenea 191 on Agrigento.",

			url: "http://www.atenea191.com/",


			company: "atenea191",

			details: [


				{
					name: "HTML",
					hours: 9,
					category: "programming_languages"
				},
				{
					name: "JS",
					hours: 5,
					category: "programming_languages"
				},
				{
					name: "PHP",
					hours: 10,
					category: "programming_languages"
				},
				{
					name: "SQL",
					hours: 8,
					category: "programming_languages"
				},
				{
					name: "CSS",
					hours: 5,
					category: "programming_languages"
				},


				{
					name: "Smarty PHP",
					hours: 8,
					category: "software",
					related : {
						programming_languages : "PHP"
					}
				},
				{
					name: "MySQL",
					hours: 5,
					category: "software",
					related : {
						programming_languages : "SQL"
					}
				},
				{
					name: "Apache",
					hours: 7,
					category: "software",
					related : {
					}
				}
			],


			status: "dismissed",
		}
		];
		return experiences;
});
