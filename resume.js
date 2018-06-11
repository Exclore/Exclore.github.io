function renderContact(section)
{
	return '<p id="header"><span id="name">' + section.info.name + '</span><br><span>Phone: ' + section.info.phone + ' | Email: ' + section.info.email + '</span></p>';
}
function renderObjective(section)
{
	return renderSection(section, '<p>'+section.description+'</p>');
}
function renderExperience(section)
{
	var code = "";
	for(i in section.employers)
	{
		var employer = section.employers[i];
		code += renderEmployer(employer);
	}
	return renderSection(section, code);
}
function renderEducation(section)
{
	var code = "";
	for(i in section.schools)
	{
		var school = section.schools[i];
		code += renderSchool(school);
	}
	return renderSection(section, code);
}
function renderSkills(section)
{
	var code = "";
	for(i in section.skills)
	{
		var skill = section.skills[i];
		code += renderSkill(skill);
	}
	return renderSection(section, code);
}

function renderSchool(school)
{
	var code = '<h3>'+school.name+'</h3>';
	code += renderDegrees(school.degrees);
	return code;
}

function renderDegrees(degrees)
{
	var code = "";
	for(i in degrees)
	{
		degree = degrees[i];
		code += '<p>'+degree.name+'<b>'+renderDate(degree.date)+'</b></p>';
	}
	return code;
}

function renderSkill(skill)
{
	var code = '<p><b>'+skill.name+'</b></p>';
	code += renderList(skill.list);
	return code;
}
function renderSection(section, inner)
{
	return '<div class="section collapse" id="'+section.name+'">'+
			'<h2 class="title">'+section.name+'</h2>'+
			'<div class="content">'+inner+'</div></div>';
}
function renderList(list)
{
	var code = "";
	for(i in list)
	{
		var item = list[i];
		code += '<li>' + item + '</li>'
	}
	return '<ul>' + code + '</ul>';
}
function renderDate(date)
{
	return '<span class="dates"><b>'+date+'</b></span>';
}

function renderEmployer(employer)
{
	var code = '<h3>' + employer.employerName + renderDate(employer.date) + '</h3>';
	code += '<p>' + employer.title + '</p>';
	code += renderList(employer.responsibilities);
	return code;
}


function displayFromJson()
{
	/*fetch( 'resume.json', {
		method: 'get'
	}).then( function( response ) {//*/
		var code = "";
		//var sections = JSON.parse(response.messageBody).sections;
		var sections = JSON.parse(window.json).sections;
		for(i in sections)
		{
				var section = sections[i];
				switch(section.name){
					case "Contact":
						code += renderContact(section);
						break;
					case "Objective":
						code += renderObjective(section);
						break;
					case "Experience":
						code += renderExperience(section);
						break;
					case "Education":
						code += renderEducation(section);
						break;
					case "Skills":
						code += renderSkills(section);
						break;
				}
		}
		document.body.innerHTML = code;
		
	/*}).catch( function( err ) {
		alert(err.message);

	});//*/
	
}




function collapse(){
	this.classList.toggle("collapse");
}

document.addEventListener('DOMContentLoaded', function(){
	
	displayFromJson();
	
	var sections = document.getElementsByClassName("section");
	Array.from(sections).forEach(function(element){
		element.addEventListener("click", collapse, false);
	});
}, false);

var json = `
{
   "sections":[
		{
			"name": "Contact",
			"info":{
				"name": "Shawn Gallagher",
				"phone": "801-888-2249",
				"email": "Gshawn017@gmail.com"
			}
		},
		{
			"name": "Objective",
			"description": "To have a career in the field of software engineering by learning new and exciting skills."
		},
		{
			"name": "Experience",
			"employers":[
				{
					"employerName": "SirsiDynix",
					"title": "Software Support Analyst",
					"date": "Aug 2016-Aug 2017",
					"responsibilities":[
						"Provided tier 3 support for a large and complex software environment.",
						"Troubleshot HTML/CSS/JavaScript problems in web applications.",
						"Performed server maintenance and scripted scheduled tasks.",
						"Documented and reported bugs and possible solutions to development for resolution.",
						"Wrote technical articles for instructional and bug related issues.",
						"Worked on many projects and cases simultaneously."
					]
				},
				{
					"employerName":"WhiteCanyon Software",
					"title": "Enterprise Support Representative",
					"date": "Sept 2014-Aug 2016",
					"responsibilities":[
						"Handled high level technical support for data erasure software.",
						"Worked with a wide variety of technical and non-technical customers.",
						"Implemented standalone, PXE, Windows Deployment Server, and remote software deployment.",
						"Customized settings for customer using basic scripting.",
						"Designed custom backgrounds and logos for customers.",
						"Tested various hardware configurations to reproduce reported issues."
					]
				},
				{
					"employerName": "Teleperformance USA",
					"title": "Technical Support Agent - Verizon project",
					"date": "2013",
					"responsibilities":[
						"Took phone calls from customers concerning Internet/TV/Phone services.",
						"Managed ticketing system to track and resolve custom issues."
					]
				}
			]
	   },
	   {
			"name":"Education",
			"schools":[
				{
					"name": "Utah Valley University",
					"degrees":[
						{
							"name":"Bachelor of Software Engineering",
							"date": "2015-Aug 2019"
						},
						{
							"name": "Associate of Science",
							"date": "2011"
						}
					]
				}
			]
	   },
	   {
			"name":"Skills",
			"skills":[
				{
					"name": "Technical",
					"list":[
						"Excellent troubleshooting and problem-solving abilities.",
						"Experience with Windows XP, Vista, 7, 8, 10.",
						"Able to quickly pick up, learn, and implement new software.",
						"Basic knowledge of Linux bash.",
						"C#, C++, HTML, CSS, and JavaScript."
					]
				},
				{
					"name": "Interpersonal",
					"list":[
						"Excellent communication skills.",
						"Able to work on a team."
					]
				}
			]
	   }
	]
}`;
