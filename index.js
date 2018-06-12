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
	console.log(employer);
	var code = '<h3'+(employer.employerTooltip !== undefined ? ' title="'+employer.employerTooltip+'"' : '')+ '>' + employer.employerName + renderDate(employer.date) + '</h3>';
	code += '<p>' + employer.title + '</p>';
	code += renderList(employer.responsibilities);
	return code;
}


function displayFromJson(json)
{
	var sections = json.sections;
	var body = $("body");
	for(i in sections)
	{
			var section = sections[i];
			switch(section.name){
				case "Contact":
					body.append(renderContact(section));
					break;
				case "Objective":
					body.append(renderObjective(section));
					break;
				case "Experience":
					body.append(renderExperience(section));
					break;
				case "Education":
					body.append(renderEducation(section));
					break;
				case "Skills":
					body.append(renderSkills(section));
					break;
			}
	}
}




function collapse(){
	$(this).toggleClass("collapse");
}


function setClickEvents()
{
	$(".section").click(collapse);
}

$(document).ready(function(){
	$.getJSON({
		url:'https://exclore.github.io/resume.json',
		success: function(json){
			displayFromJson(json);
			setClickEvents();
		},
		fail: function(){
			alert("something went wrong");
		}
	});
});
