FOLIO.items = {};

FOLIO.items.image_container = function(item){
	var d = item.data;
	
	var item_buttons = '';
	var image_height_offset = 0;
	var item_buttons_height = 0;
	var make_button = function(name, link){
		item_buttons += '<div class="col-xs-12 item-button-container"><a href="'+link+'"><div class="col-xs-12 item-button">'+name+'</div></a></div>';
		image_height_offset += 40;
		item_buttons_height += 10;
	};
	if(d.link)   make_button("LINK", d.link);
	if(d.github) make_button("GITHUB", d.github);
	image_height_offset += (image_height_offset ? 5 : 0);
	item_buttons_height = (item_buttons_height ? 'height:'+item_buttons_height+'%;' : 'display:none;');
	return '<div class="col-md-3 info-container hidden-sm hidden-xs">'+
				'<div class="col-xs-12 image-container" style="height:calc(100% - '+image_height_offset+'px);padding:10px 5px 10px 5px;" >'+
					'<div class="col-xs-12 image" style="background-image:url('+FOLIO.path(item)+'image.png);"></div>'+
				'</div>'+
				'<div class="col-xs-12 item-buttons" style="padding-top:0px;'+item_buttons_height+'">'+item_buttons+'</div>'+
			'</div>';
};

FOLIO.items.description = function(description){
	var result = (description.length ? description.map(function(d){return '&bull; '+d.toUpperCase()+'<br><br>';}).join('') : 'DESCRIPTION');
	return result;
};

FOLIO.items.project = function(item){
	var data = item.data;
	var item_buttons = '<div class="item-button-container" '+(data.github ? '' : 'style="height:100%;"')+' ><a href="'+data.link+'"><div class="col-xs-12 item-button">LINK</div></a></div>'+
		(data.github ? '<div class="item-button-container"><a href="'+data.github+'"><div class="col-xs-12 item-button">GITHUB</div></a></div>' : '');
	return this.image_container(item)+
			'<div class="col-xs-12 col-md-9 info-container">'+
				'<div class="col-xs-12 info title-container"><div class="col-xs-12 title">'+data.title.toUpperCase()+'</div></div>'+
				'<div class="col-xs-12 info"><div class="col-xs-12 description">'+data.location.toUpperCase()+'</div></div>'+
				'<div class="col-xs-12 col-md-6 info"><div class="col-xs-12 description">'+data.duration.start+' - '+data.duration.end+'</div></div>'+
				'<div class="col-xs-12 col-md-6 info"><div class="col-xs-12 description">'+data.main_skills.toUpperCase()+'</div></div>'+
				'<div class="col-xs-12 description-container"><div class="col-xs-12 description">'+this.description(data.description)+'</div></div>'+
			'</div>'+
			'<div class="col-xs-12 info-container hidden-md hidden-lg" style="height:auto;">'+
				'<div class="col-xs-12 item-buttons">'+item_buttons+'</div>'+
			'</div>';
};

FOLIO.items.work = function(item){
	var data = item.data;
	return this.image_container(item)+
	'<div class="col-xs-12 col-md-9 info-container">'+
		'<div class="col-xs-12 info title-container">'+
			'<div class="col-xs-12 title">'+data.title.toUpperCase()+
			(data.subtitle ? '<span class="work-sub-title">'+data.subtitle.toUpperCase()+'</span>' : '')+
			'</div>'+
		'</div>'+
		'<div class="col-xs-12 info"><div class="col-xs-12 description">'+data.position.toUpperCase()+'</div></div>'+
		'<div class="col-xs-12 col-md-6 info"><div class="col-xs-12 description">'+data.city.toUpperCase()+'</div></div>'+
		'<div class="col-xs-12 col-md-6 info"><div class="col-xs-12 description">'+data.duration.start+' - '+data.duration.end+'</div></div>'+
		'<div class="col-xs-12 description-container"><div class="col-xs-12 description">'+this.description(data.description)+'</div></div>'+
	'</div>';
};

FOLIO.items.education = function(item){
	var data = item.data;
	return this.image_container(item)+
	'<div class="col-xs-12 col-md-9 info-container">'+
		'<div class="col-xs-12 info title-container">'+
			'<div class="col-xs-12 title">'+data.title.toUpperCase()+
			(data.subtitle ? '<span class="work-sub-title">'+data.subtitle.toUpperCase()+'</span>' : '')+
			'</div>'+
		'</div>'+
		'<div class="col-xs-12 info"><div class="col-xs-12 description">'+
			(data.majors ? '<span class="sub-description">MAJORS</span> '+data.majors.toUpperCase() : data.city.toUpperCase() )+
		'</div></div>'+
		'<div class="col-xs-12 col-md-6 info"><div class="col-xs-12 description">'+
			(data.certificates ? 
				'<span class="sub-description">CERTIFICATES</span> '+data.certificates.toUpperCase() : 
				data.duration.start+' - '+data.duration.end
			)+	
		'</div></div>'+
		'<div class="col-xs-12 col-md-6 info"><div class="col-xs-12 description">'+
			(data.certificates ? 
				data.duration.start+' - '+data.duration.end :
				'<span class="sub-description">GPA</span> '+data.gpa.toUpperCase()+
				(data.act ? '<span class="sub-description" style="padding-left:15px;">ACT</span> '+data.act.toUpperCase() : '')
			)+
		'</div></div>'+
		'<div class="col-xs-12 description-container"><div class="col-xs-12 description">'+
			(!data.courses ? '' : data.courses.map(function(c){
					return '<div class="col-xs-12 event-container">'+
						'<div class="col-xs-12 event-name">'+c.name.toUpperCase()+
							(c.label ? '<span class="event-label hidden-sm hidden-xs">'+String(c.label).toUpperCase()+'</span>' : '')+
						'</div>'+
					'</div>'
			}).join(''))+
		'</div></div>'+
	'</div>';
};

FOLIO.items.skill = function(item){
	return '<div class="col-xs-12 info-container skills-container">'+
		'<div class="col-xs-12 info title-container">'+
			'<div class="col-xs-12 title">'+item.name.toUpperCase()+'</div>'+
		'</div>'+
		'<div class="col-xs-12 description-container"><div class="col-xs-12 description">'+
			item.events.map(function(c){
				return '<div class="col-xs-12 col-md-6 event-container">'+
					'<div class="col-xs-12 event-name" onclick="FOLIO.content('+c.id+');">'+c.name.toUpperCase()+'<span class="event-label">'+FOLIO.duration(c)+'</span>'+'</div>'+
				'</div>';
			}).join('')+
		'</div></div>'+
	'</div>';
};

FOLIO.items.background = function(item){
	return '<div class="col-xs-12 info-container skills-container">'+
		'<div class="col-xs-12 info title-container">'+
			'<div class="col-xs-12 title">'+item.name.toUpperCase()+'</div>'+
		'</div>'+
		'<div class="col-xs-12 description-container"><div class="col-xs-12 description">'+
			item.data.events.map(function(c){
				return '<div class="col-xs-12 event-container">'+
					(c.link ? '<a href="'+c.link+'">' : '')+
					'<div class="col-xs-12 event-name">'+
						c.name.toUpperCase()+
						(c.label ? '<span class="event-label hidden-sm hidden-xs">'+c.label.toUpperCase()+'</span>' : '')+
					'</div>'+
					(c.link ? '</a>' : '')+
				'</div>';
			}).join('')+
		'</div></div>'+
	'</div>';
};