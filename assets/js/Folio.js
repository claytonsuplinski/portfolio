FOLIO.init = function(){
	var curr_id = 0;
	this.CONTENT.forEach(function(category){
	    var queue = [], next = category;
		while(next){
			if(next.children){
				$.each(next.children, function(i, child) {
					child.parent_object = next;
					if(next.type){
						$.getJSON(FOLIO.path(child)+'item.json',{}, function(data){
							child.data = data;
							if(data.skills){
								curr_id = FOLIO.add_skills(data.skills, child, curr_id);
							}
						});
					}
					queue.push(child);
				});
			}
			next.id = curr_id;
			curr_id++;
			next = queue.shift();
		}
	});
};

FOLIO.get = function(path){
	var category = path.shift();
	var curr = this.CONTENT.filter(function(c){return c.name == category;});
	if(curr.length){
		curr = curr[0];
		path.forEach(function(step){
			if(curr){
					var next = curr.children.filter(function(c){ return c.name == step; });
					curr = (next.length ? next[0] : false);
			}
		});
		return curr;
	}
	return false;
};

FOLIO.add_skills = function(skills, event, id){
	var node = FOLIO.get(["Skills"]);
	if(!node.children) node.children = [];
	skills.forEach(function(skill){
		skill = skill.toUpperCase();
		var matches = node.children.filter(function(c){return c.name == skill});
		var image_name = (Math.random()<0.5 ? 'menu' : 'image')+'.png';
		if(!matches.length){
			var path = FOLIO.path(event);
			node.children.push({name: skill, id: id, events: [event], parent_object: node, image: path+image_name, background: path+'background.png'});
			id++;
		}
		else{
			matches[0].events.push(event);
			matches[0].image = FOLIO.path(matches[0].events[Math.floor(Math.random() * matches[0].events.length)])+image_name;
			matches[0].background = FOLIO.path(matches[0].events[Math.floor(Math.random() * matches[0].events.length)])+'background.png';
			node.children.sort(function(a, b){
				return b.events.length - a.events.length;
			});
		}
	});
	return id;
};

FOLIO.breadcrumbs = function (index){
	var self = this;
	$("#breadcrumbs-container").html("");
	self.CONTENT.forEach(function(c, i){
		$("#breadcrumbs-container").append(
			'<span class="item clickable" onclick="FOLIO.breadcrumbs('+i+');FOLIO.content('+c.id+');">' + 
				'<span '+(i == index ? 'class="active"' : '')+'>'+c.name.toUpperCase()+'</span>'+
			'</span>'
		);
	});
};

FOLIO.background = function(item){
	$('#background').css('background-image', 'url('+(item.background ? item.background : this.path(item)+'background.png')+')');
};

FOLIO.select = function (id){
	this.CONTENT.forEach(function(category){
		var queue = [];
		var next = category;
		while(next){
			if(next.children) $.each(next.children, function(i, child) { queue.push(child); });
			if(next.id == id){
				FOLIO.curr_node = next;
				FOLIO.curr_category = category;
				if(next.post_callback) next.post_callback();
				return;
			}
			next = queue.shift();
		}
	});
};

FOLIO.child = function (category){
	var onclick = 'onclick="FOLIO.content('+category.id+');"';
	var subname = (category.subname ? '<div class="sub-name">'+category.subname.toUpperCase()+'</div>' : '');
	var image = FOLIO.path(category)+'/menu.png';
	if(category.parent_object.type){
		if(category.data && category.data.duration){
			subname = '<div class="sub-name">'+category.data.duration.start.toUpperCase()+' - '+category.data.duration.end.toUpperCase()+'</div>';
		}
		if(category.parent_object.type == 'noclick') onclick = '';
	}
	if(category.image) image = category.image;
	
	return '<div class="shadow clickable" '+onclick+'>'+
		'<div class="col-xs-12 name no-highlight">'+category.name.toUpperCase()+subname+'</div>'+
		'<div class="col-xs-12 image" style="background-image:url('+image+');"></div>'+
	'</div>';
};

FOLIO.content = function (id){
	var self = this;
	$("#background").fadeOut(500);
	$("#content-container").fadeOut(500, function(){
		$("#content-container").html("");
		self.bottomline.active = false;
		self.select(id);
		
		FOLIO.background(self.curr_node);
		
		if(self.curr_node.children){
			$("#content-container")[(FOLIO.curr_node.width == 3 ? "addClass" : "removeClass")]("content-horizontal");
			
			if(self.curr_node.width == 2){
				var node_1 = self.curr_node.children[0];
				var node_2 = self.curr_node.children[1];
				
				$("#content-container").append(
					'<div class="clayton">'+
						'<hr>'+
						'<div class="name first">CLAYTON</div>'+
						'<div class="name last">S U P L I N S K I</div>'+
						'<hr>'+
						'<div class="majors-icons">'+
							'<span><i class="fa fa-2x fa-code"></i></span>'+
							'<span><i class="fa fa-2x fa-globe"></i></span>'+
							'<span><i class="fa fa-2x fa-bar-chart"></i></span>'+
						'</div>'+
						'<div class="location">'+
							'<div class="location-name">MADISON, WI</div>'+
							'<div class="map"></div>'+
						'</div>'+
					'</div>'
				);
			}
			else if(self.curr_node.width != 3){
				for(var i=0; i<self.curr_node.children.length; i++){
					var category = self.curr_node.children[i];
					var child_html = self.child(category);
					var div_class = "col-xs-12 col-md-6 item";
					switch(self.curr_node.width){
						case 1: div_class = 'col-xs-12 '+(i == 0 ? '' : 'col-md-6')+' item'; break;
						case 2: div_class = 'col-xs-12 col-md-6 item item-column'; break;
					}
					$("#content-container").append('<div class="'+div_class+'">'+child_html+'</div>');
				}
			}
			else if(self.curr_node.width == 3){
				self.bottomline.active = true;
				self.bottomline.draw();
			}
		}
		else if(self.curr_node.parent_object.type){
			$("#content-container").html(FOLIO.items[self.curr_node.parent_object.type](self.curr_node));	
		}
		
		$("#content-container").show(0, function(){$("#content-container").scrollTop(0)}).hide(0).delay(200).fadeIn(500);
		$("#background").delay(200).fadeIn(500);
	});
};

FOLIO.bottomline = {};
FOLIO.bottomline.active = false;
FOLIO.bottomline.max_index = 0;
FOLIO.bottomline.step = function(val){
	var start = this.horizontal_index;
	this.curr_node.horizontal_index += val;
	this.curr_node.horizontal_index = Math.max(this.curr_node.horizontal_index, 0);
	this.curr_node.horizontal_index = Math.min(this.curr_node.horizontal_index, this.max_index-1);
	if(start != this.curr_node.horizontal_index) this.draw();
};
FOLIO.bottomline.select = function(val){
	var start = this.curr_node.horizontal_index;
	if(val < this.max_index && val >= 0) this.curr_node.horizontal_index = val;
	if(start != this.curr_node.horizontal_index) this.draw();
};
FOLIO.bottomline.draw = function(){
	if(this.active){
		var self = this;
		$("#content-container").html('');
		
		this.curr_node = FOLIO.curr_node;
		if(!this.curr_node.horizontal_index) this.curr_node.horizontal_index = 0;
		var curr_index = this.curr_node.horizontal_index;
		
		var index = 2 * curr_index;
		for(var i=0; i<FOLIO.curr_node.children.length; i++){
			var category = FOLIO.curr_node.children[i];
			var child_html = FOLIO.child(category);
			var div_class = "col-xs-12 col-md-6 item item-horizontal " + (i == index || i == index+1 ? 'active' : 'hidden-md hidden-lg');
			$("#content-container").append('<div class="'+div_class+'">'+child_html+'</div>');
		}

		self.max_index = Math.ceil(FOLIO.curr_node.children.length/2);
		var bottomline = '<div class="col-xs-12 hidden-sm hidden-xs bottomline"><table><tr>';
		bottomline += '<td class="arrow"><i class="fa fa-angle-left" onclick="FOLIO.bottomline.step(-1);"></i></td>';
		for(var i=0; i<self.max_index; i++){ 
			bottomline += '<td>'+
				'<div class="dot '+(i == curr_index ? 'active' : '')+'" onclick="FOLIO.bottomline.select('+i+');"></div>'+
			'</td>';
		}
		bottomline += '<td class="arrow"><i class="fa fa-angle-right" onclick="FOLIO.bottomline.step(1);"></i></td>';
		bottomline += '</tr></table></div>';
		$("#content-container").append(bottomline);
	}
};

FOLIO.basename = function(name){
	return name.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/ /g,'');
};

FOLIO.path = function(item){
	var names = [];
	var curr = item;
	while(curr){
		names.unshift(this.basename(curr.name));
		curr = curr.parent_object;
	}
	return './content/' + (names.length ? names.join('/')+'/' : '');
};

FOLIO.exists = function(url){
	var http = new XMLHttpRequest();
	http.open('HEAD', url, false);
	http.send();
	return http.status!=404;
};

FOLIO.background_path = function(item){
	var names = [];
	var curr = item;
	while(curr){
		names.unshift(this.basename(curr.name));
		curr = curr.parent_object;
	}
	return './backgrounds/' + (names.length ? names.join('/')+'/' : '');
};

FOLIO.duration = function(event){
	var d = event.data.duration;
	if(d){
		if(d.start && d.end){
			var start = new Date(d.start);
			var end   = ( d.end == "PRESENT" ? new Date() : new Date(d.end) );
			var years = end.getFullYear() - start.getFullYear();
			var months = end.getMonth() - start.getMonth();
			if(years || months){
				months = Math.max( (years) * 12 - (start.getMonth() + 1) + end.getMonth() + 1, 0) % 12;
				var result = '';
				if(years)  result += years  + ' y<span class="hidden-sm hidden-xs">ear' + (years > 1 ? 's ' : ' ') + '</span> ';
				if(months) result += months + ' m<span class="hidden-sm hidden-xs">on</span>th' + (months > 1 ? 's' : '');
				return result;
			}
			else{
				var t = end.getTime() - start.getTime();
				var u = " ms";
				if(t >= 1000){
					t /= 1000, u = " second";
					if(t >= 60){
						t /= 60, u = " minute";
						if(t >= 60){
							t /= 60, u = " hour";
							if(t >= 24){
								t /= 24, u = " day";
							}
						}
					}
				}
				if(t > 1) u += "s";
				return t+u;
			}
		}
	}
	return '';
};

FOLIO.start = function(){
	FOLIO.init();
	FOLIO.breadcrumbs(0);
	FOLIO.content(0);
};
FOLIO.start();